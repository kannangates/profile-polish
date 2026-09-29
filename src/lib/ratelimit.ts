/**
 * Fair-use limits for the shared free-tier key.
 * Limits are per device-id + IP (campus WiFi shares one IP, so IP alone would
 * let one student block the whole college) plus a global daily cap that tracks
 * the provider's free quota.
 *
 * Uses Upstash Redis when configured (free tier). Otherwise falls back to an
 * in-memory counter — best-effort only on serverless, fine for local dev.
 */

import { Redis } from "@upstash/redis";

const PER_DEVICE = Number(process.env.SHARED_DAILY_LIMIT_PER_DEVICE ?? 10);
const GLOBAL = Number(process.env.SHARED_DAILY_LIMIT_GLOBAL ?? 200);

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null;

const memory = new Map<string, { count: number; day: string }>();

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function peek(key: string): Promise<number> {
  const k = `cl:${today()}:${key}`;
  if (redis) return Number((await redis.get<number>(k)) ?? 0);
  const e = memory.get(k);
  return e && e.day === today() ? e.count : 0;
}

async function unbump(key: string) {
  const k = `cl:${today()}:${key}`;
  if (redis) {
    await redis.decr(k);
    return;
  }
  const e = memory.get(k);
  if (e && e.day === today() && e.count > 0) memory.set(k, { count: e.count - 1, day: e.day });
}

async function bump(key: string): Promise<number> {
  const k = `cl:${today()}:${key}`;
  if (redis) {
    const n = await redis.incr(k);
    if (n === 1) await redis.expire(k, 60 * 60 * 26);
    return n;
  }
  const e = memory.get(k);
  const count = e && e.day === today() ? e.count + 1 : 1;
  memory.set(k, { count, day: today() });
  return count;
}

export interface LimitResult {
  ok: boolean;
  reason?: string;
  remaining?: number;
}

export async function checkSharedLimit(deviceId: string, ip: string): Promise<LimitResult> {
  const global = await bump("global");
  if (global > GLOBAL) {
    return { ok: false, reason: "The shared free quota is used up for today. Add your own free API key in Settings (takes about a minute) to keep going." };
  }
  const device = await bump(`d:${deviceId}`);
  if (device > PER_DEVICE) {
    return { ok: false, reason: `You've used today's ${PER_DEVICE} free shared requests. Add your own free API key in Settings to continue without limits.` };
  }
  // Loose per-IP ceiling so a script without device ids can't drain the pool.
  const ipCount = await bump(`ip:${ip}`);
  if (ipCount > PER_DEVICE * 30) {
    return { ok: false, reason: "Too many requests from this network today. Add your own API key in Settings to continue." };
  }
  return { ok: true, remaining: PER_DEVICE - device };
}

/**
 * Banners are the one paid feature (see CLAUDE.md, "The paid exception"), so
 * their counters are separate from the text limits and much tighter.
 */
export const BANNER_PER_DEVICE = Number(process.env.BANNER_DAILY_LIMIT_PER_DEVICE ?? 2);
const BANNER_GLOBAL = Number(process.env.BANNER_DAILY_LIMIT_GLOBAL ?? 50);

export async function bannerRemaining(deviceId: string): Promise<number> {
  return Math.max(0, BANNER_PER_DEVICE - (await peek(`banner:d:${deviceId}`)));
}

export async function checkBannerLimit(deviceId: string, ip: string): Promise<LimitResult> {
  const global = await bump("banner:global");
  if (global > BANNER_GLOBAL) {
    await unbump("banner:global");
    return { ok: false, reason: "Today's banners are used up for everyone. Try again tomorrow." };
  }
  const device = await bump(`banner:d:${deviceId}`);
  if (device > BANNER_PER_DEVICE) {
    await Promise.all([unbump("banner:global"), unbump(`banner:d:${deviceId}`)]);
    return { ok: false, reason: `You've made today's ${BANNER_PER_DEVICE} banners. You can make more tomorrow.` };
  }
  const ipCount = await bump(`banner:ip:${ip}`);
  if (ipCount > BANNER_PER_DEVICE * 15) {
    await Promise.all([unbump("banner:global"), unbump(`banner:d:${deviceId}`), unbump(`banner:ip:${ip}`)]);
    return { ok: false, reason: "Too many banners from this network today. Try again tomorrow." };
  }
  return { ok: true, remaining: BANNER_PER_DEVICE - device };
}

/** A failed generation shouldn't cost the student one of their two. */
export async function refundBanner(deviceId: string, ip: string) {
  await Promise.all([unbump("banner:global"), unbump(`banner:d:${deviceId}`), unbump(`banner:ip:${ip}`)]);
}
