"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { APP_NAME } from "@/lib/config";
import { purgeExpired } from "@/lib/db";
import { useProfile } from "@/lib/hooks";
import { PrivacyBanner } from "./PrivacyBanner";
import { SetupBanner } from "./SetupBanner";
import { Badge } from "./ui";

const NAV = [
  { href: "/profile", label: "Profile Optimizer", icon: "✨" },
  { href: "/messages", label: "Message Writer", icon: "✉️" },
  { href: "/posts", label: "Post Generator", icon: "📝" },
  { href: "/resume", label: "Resume ATS", icon: "📄" },
  { href: "/drafts", label: "My Drafts", icon: "🗂️" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const profile = useProfile();

  useEffect(() => {
    purgeExpired().catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-border bg-surface md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-4 py-4 md:block">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-accent">●</span> {APP_NAME}
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-4">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  active ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-accent-soft/60 hover:text-foreground"
                }`}
              >
                <span aria-hidden>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-4 pb-4 md:block">
          <ProfileChip name={profile?.name} loaded={profile !== undefined} />
        </div>
      </aside>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-5 md:px-8 md:py-8">
          <div className="md:hidden">
            <ProfileChip name={profile?.name} loaded={profile !== undefined} />
          </div>
          <SetupBanner />
          <PrivacyBanner />
          {children}
        </div>
      </main>
    </div>
  );
}

function ProfileChip({ name, loaded }: { name?: string; loaded: boolean }) {
  if (!loaded) return null;
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm">
      {name ? (
        <>
          <div className="min-w-0">
            <div className="truncate font-medium">{name}</div>
            <Badge tone="success">Profile loaded</Badge>
          </div>
          <Link href="/" className="shrink-0 text-xs text-accent hover:underline">
            Re-upload
          </Link>
        </>
      ) : (
        <>
          <span className="text-muted">No profile yet</span>
          <Link href="/" className="shrink-0 text-xs text-accent hover:underline">
            Upload
          </Link>
        </>
      )}
    </div>
  );
}
