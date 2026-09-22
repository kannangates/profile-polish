"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after hydration — lets us read browser storage during render without SSR mismatches. */
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
