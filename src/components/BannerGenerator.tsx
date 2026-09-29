"use client";

import { useEffect, useState } from "react";
import { BANNER_HEIGHT, BANNER_STYLES, BANNER_WIDTH, cropToLinkedInBanner, type BannerRequest, type BannerResponse, type BannerStyle } from "@/lib/banner";
import { getDeviceId } from "@/lib/keys";
import { Button, Card, Label, Spinner } from "./ui";

type Status = { enabled: boolean; remaining: number; limit: number };

function download(url: string) {
  // Detached anchor purely to trigger a download — never attached to the DOM.
  const a = document.createElement("a");
  a.href = url;
  a.download = `linkedin-banner-${BANNER_WIDTH}x${BANNER_HEIGHT}.png`;
  a.click();
}

/**
 * The one paid feature, so the server decides whether it exists here and how
 * many are left. If the deployment hasn't turned it on, render nothing.
 */
export function BannerGenerator({ role }: { role: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [tagline, setTagline] = useState("");
  const [style, setStyle] = useState<BannerStyle>("gradient");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/banner", { headers: { "x-device-id": getDeviceId() } })
      .then((r) => r.json())
      .then((d: Status) => !cancelled && setStatus(d))
      .catch(() => !cancelled && setStatus({ enabled: false, remaining: 0, limit: 0 }));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  if (!status?.enabled) return null;

  const generate = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/banner", {
        method: "POST",
        headers: { "content-type": "application/json", "x-device-id": getDeviceId() },
        body: JSON.stringify({ role: role.trim(), tagline: tagline.trim() || undefined, style } satisfies BannerRequest),
      });
      if (!res.ok) {
        setError((await res.text().catch(() => "")) || "Something went wrong. Try again.");
        if (res.status === 429) setStatus((s) => s && { ...s, remaining: 0 });
        return;
      }
      const data = (await res.json()) as BannerResponse;
      const blob = await cropToLinkedInBanner(data.base64, data.mimeType);
      setUrl(URL.createObjectURL(blob));
      setStatus((s) => s && { ...s, remaining: data.remaining });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const noRole = !role.trim();

  return (
    <Card className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="font-medium">LinkedIn banner</div>
          <p className="text-xs text-muted">
            The wide image behind your photo, made for your target role at LinkedIn&apos;s size ({BANNER_WIDTH} × {BANNER_HEIGHT}).
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted">{status.remaining} of {status.limit} left today</span>
      </div>

      <div>
        <Label hint="optional, 60 characters">Text on the banner</Label>
        <input className="field" maxLength={60} placeholder="e.g. Turning operations data into product decisions" value={tagline} onChange={(e) => setTagline(e.target.value)} />
        <p className="mt-1 text-xs text-muted">Leave blank for no text. AI images sometimes misspell words, so check it before you use it.</p>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Style</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(BANNER_STYLES) as BannerStyle[]).map((s) => (
            <label
              key={s}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition ${style === s ? "border-accent bg-accent-soft" : "border-border hover:border-accent/50"}`}
            >
              <input type="radio" name="banner-style" className="sr-only" checked={style === s} onChange={() => setStyle(s)} />
              {BANNER_STYLES[s].label}
            </label>
          ))}
        </div>
      </fieldset>

      <Button onClick={generate} disabled={busy || noRole || status.remaining <= 0} className="w-full">
        {busy ? (
          <>
            <Spinner /> Making your banner…
          </>
        ) : status.remaining <= 0 ? (
          "No banners left today"
        ) : (
          "Make my banner"
        )}
      </Button>
      {noRole && <p className="text-xs text-muted">Add your target role above first — the banner is designed around it.</p>}
      {error && <p className="text-sm text-danger">{error}</p>}

      {url && (
        <div className="space-y-3">
          {/* The circle shows where LinkedIn puts your photo, so you can judge the crop. */}
          <div className="relative mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- a local object URL, not a remote image */}
            <img src={url} alt="Your generated LinkedIn banner" className="w-full rounded-lg border border-border" />
            <div aria-hidden className="absolute -bottom-6 left-[4%] h-[45%] w-auto aspect-square rounded-full border-4 border-surface bg-border" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => download(url)}>Download PNG</Button>
          </div>
          <p className="text-xs text-muted">
            On LinkedIn: your profile → the camera icon on the banner → Upload photo. It isn&apos;t saved here, so download it before you leave this page.
          </p>
        </div>
      )}
    </Card>
  );
}
