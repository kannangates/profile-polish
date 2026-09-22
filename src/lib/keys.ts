import { PROVIDER_BY_ID, PROVIDERS, type ProviderId } from "./config";

/**
 * API keys never leave the student's browser. By default they live in
 * sessionStorage (gone when the tab closes). "Remember on this device"
 * moves them to localStorage — only sensible on a personal machine.
 *
 * Browser storage is not always available: private windows, blocked site
 * data, locked-down lab machines and embedded frames can all make a write
 * throw or be discarded. Every value is therefore also held in memory for
 * the lifetime of the page, so the app keeps working, and the setters report
 * whether the value actually persisted so the UI can say so honestly instead
 * of claiming "Saved" and failing later.
 */

const KEY_PREFIX = "cl.key.";
const MODEL_PREFIX = "cl.model.";
const REMEMBER = "cl.remember";
const ACTIVE = "cl.provider";
const DEVICE_ID = "cl.device";

export type ActiveProvider = ProviderId | "shared";

const memory = new Map<string, string>();

const isBrowser = () => typeof window !== "undefined";

function safeGet(store: Storage, k: string): string | null {
  try {
    return store.getItem(k);
  } catch {
    return null;
  }
}

function safeSet(store: Storage, k: string, v: string): boolean {
  try {
    store.setItem(k, v);
    // A quota-less or partitioned store can accept the write and drop it.
    return store.getItem(k) === v;
  } catch {
    return false;
  }
}

function safeRemove(store: Storage, k: string) {
  try {
    store.removeItem(k);
  } catch {
    /* ignore */
  }
}

/** Memory first (most recent), then this tab's session, then the device. */
function readValue(k: string): string | null {
  const inMemory = memory.get(k);
  if (inMemory !== undefined) return inMemory;
  if (!isBrowser()) return null;
  return safeGet(sessionStorage, k) ?? safeGet(localStorage, k);
}

/** Returns true when the value survived in real browser storage. */
function writeValue(k: string, v: string, toDevice: boolean): boolean {
  memory.set(k, v);
  if (!isBrowser()) return false;
  const target = toDevice ? localStorage : sessionStorage;
  const other = toDevice ? sessionStorage : localStorage;
  safeRemove(other, k);
  return safeSet(target, k, v);
}

function removeValue(k: string) {
  memory.delete(k);
  if (!isBrowser()) return;
  safeRemove(sessionStorage, k);
  safeRemove(localStorage, k);
}

export function getRemember(): boolean {
  return readValue(REMEMBER) === "1";
}

export function setRemember(remember: boolean) {
  writeValue(REMEMBER, remember ? "1" : "0", true);
  // Move existing keys to the store the new setting calls for.
  for (const p of PROVIDERS) {
    const k = getKey(p.id);
    if (k) writeValue(KEY_PREFIX + p.id, k, remember);
  }
}

export function getKey(provider: ProviderId): string {
  return readValue(KEY_PREFIX + provider) ?? "";
}

/**
 * @returns true if the key was written to browser storage; false means it is
 * held in memory only and will be gone on reload.
 */
export function setKey(provider: ProviderId, key: string): boolean {
  const trimmed = key.trim();
  if (!trimmed) {
    removeValue(KEY_PREFIX + provider);
    return true;
  }
  return writeValue(KEY_PREFIX + provider, trimmed, getRemember());
}

export function getModel(provider: ProviderId): string {
  return readValue(MODEL_PREFIX + provider) || PROVIDER_BY_ID[provider].defaultModel;
}

export function setModel(provider: ProviderId, model: string) {
  const m = model.trim();
  if (m && m !== PROVIDER_BY_ID[provider].defaultModel) writeValue(MODEL_PREFIX + provider, m, true);
  else removeValue(MODEL_PREFIX + provider);
}

export function getActiveProvider(): ActiveProvider {
  const v = readValue(ACTIVE) as ActiveProvider | null;
  if (v === "shared" || (v && v in PROVIDER_BY_ID)) return v;
  // Auto-pick: first provider that has a key, else shared.
  for (const p of PROVIDERS) if (getKey(p.id)) return p.id;
  return "shared";
}

export function setActiveProvider(p: ActiveProvider) {
  writeValue(ACTIVE, p, true);
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
  const existing = readValue(DEVICE_ID);
  if (existing) return existing;
  const id = isBrowser() && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()).slice(2);
  writeValue(DEVICE_ID, id, true);
  return id;
}

export function clearAllKeys() {
  for (const p of PROVIDERS) {
    removeValue(KEY_PREFIX + p.id);
    removeValue(MODEL_PREFIX + p.id);
  }
  removeValue(REMEMBER);
  removeValue(ACTIVE);
}
