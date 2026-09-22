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
  { href: "/profile", label: "Profile Optimizer", short: "Profile", icon: "✨" },
  { href: "/messages", label: "Message Writer", short: "Messages", icon: "✉️" },
  { href: "/posts", label: "Post Generator", short: "Posts", icon: "📝" },
  { href: "/resume", label: "Resume ATS", short: "Resume", icon: "📄" },
  { href: "/drafts", label: "My Drafts", short: "Drafts", icon: "🗂️" },
  { href: "/settings", label: "Settings", short: "Settings", icon: "⚙️" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const profile = useProfile();

  useEffect(() => {
    purgeExpired().catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Phone: a compact top bar; navigation lives in the bottom tab bar. */}
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
        <Link href="/" className="text-base font-semibold tracking-tight">
          <span className="text-accent">●</span> {APP_NAME}
        </Link>
        {profile?.name && <Badge tone="success">{profile.name.split(" ")[0]}</Badge>}
      </header>

      <aside className="hidden border-border bg-surface md:block md:w-60 md:shrink-0 md:border-r">
        <div className="px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-accent">●</span> {APP_NAME}
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-2 pb-4">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  active ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-accent-soft/60 hover:text-foreground"
                }`}
              >
                <span aria-hidden>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-4">
          <ProfileChip name={profile?.name} loaded={profile !== undefined} />
        </div>
      </aside>

      <main className="flex-1">
        {/* pb-24 keeps content clear of the fixed mobile tab bar */}
        <div className="mx-auto max-w-5xl space-y-4 px-4 pb-24 pt-4 md:px-8 md:pb-8 md:pt-8">
          <div className="md:hidden">
            <ProfileChip name={profile?.name} loaded={profile !== undefined} />
          </div>
          <SetupBanner />
          <PrivacyBanner />
          {children}
        </div>
      </main>

      {/* Phone: thumb-reachable tab bar instead of a sideways-scrolling strip. */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-6 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
        {NAV.map((n) => {
          const active = pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-label={n.label}
              className={`flex flex-col items-center gap-0.5 py-2 text-[10px] leading-tight ${
                active ? "font-semibold text-accent" : "text-muted"
              }`}
            >
              <span className="text-base" aria-hidden>
                {n.icon}
              </span>
              {n.short}
            </Link>
          );
        })}
      </nav>
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
