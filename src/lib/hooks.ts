"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

/** undefined = still loading, null = no profile saved. */
export function useProfile() {
  return useLiveQuery(async () => (await db.profiles.get("current")) ?? null, []);
}

export function useDrafts() {
  return useLiveQuery(() => db.drafts.orderBy("createdAt").reverse().toArray(), []);
}
