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
