import Dexie, { type EntityTable } from "dexie";
import { DRAFT_TTL_MS } from "./config";
import type { Draft, DraftType, Profile } from "./types";

/**
 * All student data lives in IndexedDB in their own browser. Nothing is
 * ever sent to our server. Rows carry an expiresAt and are purged on load.
 */
class CareerLiftDB extends Dexie {
  profiles!: EntityTable<Profile, "id">;
  drafts!: EntityTable<Draft, "id">;

  constructor() {
    super("careerlift");
    this.version(1).stores({
      profiles: "id, expiresAt",
      drafts: "++id, type, createdAt, expiresAt",
    });
  }
}

export const db = new CareerLiftDB();

export async function purgeExpired() {
  const now = Date.now();
  await db.drafts.where("expiresAt").below(now).delete();
  await db.profiles.where("expiresAt").below(now).delete();
}

export async function saveProfile(p: Omit<Profile, "id" | "createdAt" | "expiresAt">) {
  const now = Date.now();
  await db.profiles.put({ ...p, id: "current", createdAt: now, expiresAt: now + DRAFT_TTL_MS });
}

export async function clearProfile() {
  await db.profiles.delete("current");
}

export async function saveDraft(type: DraftType, title: string, content: string) {
  const now = Date.now();
  return db.drafts.add({ type, title, content, createdAt: now, expiresAt: now + DRAFT_TTL_MS });
}

export async function clearEverything() {
  await db.drafts.clear();
  await db.profiles.clear();
}
