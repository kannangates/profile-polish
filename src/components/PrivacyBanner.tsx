"use client";

import { useState } from "react";
import { useIsClient } from "@/lib/useIsClient";

const KEY = "cl.banner.dismissed";

function isDismissed() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function PrivacyBanner() {
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);

  if (!isClient || dismissed || isDismissed()) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-warning-fg/30 bg-warning-bg px-3 py-2.5 text-xs text-warning-fg sm:gap-3 sm:px-4 sm:py-3 sm:text-sm">
      <span aria-hidden>🔒</span>
      <p className="flex-1">
        <strong>Everything stays in your browser.</strong> Your API key clears when you close this tab. Drafts and your profile auto-clear
        after 48 hours — export anything you want to keep.
      </p>
      <button
        className="text-xs font-medium underline-offset-2 hover:underline"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
          setDismissed(true);
        }}
      >
        Got it
      </button>
    </div>
  );
}
