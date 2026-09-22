import { PROVIDER_BY_ID, PROVIDERS, type ProviderId } from "./config";

/**
 * API keys never leave the student's browser. By default they live in
 * sessionStorage (gone when the tab closes). "Remember on this device"
 * moves them to localStorage — only sensible on a personal machine.
 */

const KEY_PREFIX = "cl.key.";
const MODEL_PREFIX = "cl.model.";
const REMEMBER = "cl.remember";
const ACTIVE = "cl.provider";
const DEVICE_ID = "cl.device";

export type ActiveProvider = ProviderId | "shared";

function safeGet(store: Storage, k: string): string | null {
  try {
    return store.getItem(k);
  } catch {
    return null;
  }
}
function safeSet(store: Storage, k: string, v: string) {
  try {
    store.setItem(k, v);
  } catch {
    /* private mode / blocked storage — degrade silently */
  }
}
function safeRemove(store: Storage, k: string) {
  try {
    store.removeItem(k);
  } catch {
    /* ignore */
  }
}

const isBrowser = () => typeof window !== "undefined";

export function getRemember(): boolean {
  return isBrowser() && safeGet(localStorage, REMEMBER) === "1";
}

export function getKey(provider: ProviderId): string {
  if (!isBrowser()) return "";
  return (
    safeGet(sessionStorage, KEY_PREFIX + provider) ??
    safeGet(localStorage, KEY_PREFIX + provider) ??
    ""
  );
}

export function setKey(provider: ProviderId, key: string) {
  if (!isBrowser()) return;
  const trimmed = key.trim();
  const remember = getRemember();
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  safeRemove(other, KEY_PREFIX + provider);
  if (trimmed) safeSet(target, KEY_PREFIX + provider, trimmed);
  else safeRemove(target, KEY_PREFIX + provider);
}

export function setRemember(remember: boolean) {
  if (!isBrowser()) return;
  safeSet(localStorage, REMEMBER, remember ? "1" : "0");
  // Move existing keys to the right store.
  for (const p of PROVIDERS) {
    const k = getKey(p.id);
    safeRemove(localStorage, KEY_PREFIX + p.id);
    safeRemove(sessionStorage, KEY_PREFIX + p.id);
    if (k) safeSet(remember ? localStorage : sessionStorage, KEY_PREFIX + p.id, k);
  }
}

export function getModel(provider: ProviderId): string {
  if (!isBrowser()) return PROVIDER_BY_ID[provider].defaultModel;
  return safeGet(localStorage, MODEL_PREFIX + provider) || PROVIDER_BY_ID[provider].defaultModel;
}

export function setModel(provider: ProviderId, model: string) {
  if (!isBrowser()) return;
  const m = model.trim();
  if (m && m !== PROVIDER_BY_ID[provider].defaultModel) safeSet(localStorage, MODEL_PREFIX + provider, m);
  else safeRemove(localStorage, MODEL_PREFIX + provider);
}

export function getActiveProvider(): ActiveProvider {
  if (!isBrowser()) return "shared";
  const v = safeGet(localStorage, ACTIVE) as ActiveProvider | null;
  if (v === "shared" || (v && v in PROVIDER_BY_ID)) return v;
  // Auto-pick: first provider that has a key, else shared.
  for (const p of PROVIDERS) if (getKey(p.id)) return p.id;
  return "shared";
}

export function setActiveProvider(p: ActiveProvider) {
  if (!isBrowser()) return;
  safeSet(localStorage, ACTIVE, p);
}

export function hasAnyKey(): boolean {
  return PROVIDERS.some((p) => !!getKey(p.id));
}

export function maskKey(key: string): string {
  if (!key) return "";
  if (key.length <= 8) return "••••";
  return `${key.slice(0, 4)}…${key.slice(-4)}`;
}

/** Anonymous per-browser id used only to rate-limit the shared key fairly. */
export function getDeviceId(): string {
  if (!isBrowser()) return "server";
  let id = safeGet(localStorage, DEVICE_ID);
  if (!id) {
    id = crypto.randomUUID();
    safeSet(localStorage, DEVICE_ID, id);
  }
  return id;
}

export function clearAllKeys() {
  if (!isBrowser()) return;
  for (const p of PROVIDERS) {
    safeRemove(localStorage, KEY_PREFIX + p.id);
    safeRemove(sessionStorage, KEY_PREFIX + p.id);
    safeRemove(localStorage, MODEL_PREFIX + p.id);
  }
  safeRemove(localStorage, REMEMBER);
  safeRemove(localStorage, ACTIVE);
}
