"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasAnyKey } from "@/lib/keys";
import { useIsClient } from "@/lib/useIsClient";

/**
 * Without a key of their own AND without a shared key on the deployment,
 * nothing a student does will generate anything. Say so before they type a
 * whole prompt and hit an error at the end.
 */
export function SetupBanner() {
  const isClient = useIsClient();
  const pathname = usePathname();
  const [sharedKey, setSharedKey] = useState<boolean | null>(null);
  // Read synchronously during render (client-only) so there is no extra pass.
  const ownKey = isClient ? hasAnyKey() : false;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((r) => r.json())
      .then((d: { sharedKey: boolean }) => !cancelled && setSharedKey(d.sharedKey))
      .catch(() => !cancelled && setSharedKey(false));
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // Stay quiet until we know, on the Settings page itself, and when set up.
  if (!isClient || sharedKey === null || pathname.startsWith("/settings")) return null;
  if (ownKey || sharedKey) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm">
      <span aria-hidden>🔑</span>
      <p className="flex-1">
        <strong>One step before you start:</strong> add a free AI key. It takes about a minute, needs no credit card, and stays in your browser.
      </p>
      <Link
        href="/settings"
        className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent-hover"
      >
        Get a free key →
      </Link>
    </div>
  );
}
