"use client";

import { useState } from "react";
import { BannerGenerator } from "@/components/BannerGenerator";
import { FileDrop } from "@/components/FileDrop";
import { Markdown } from "@/components/Markdown";
import { MakeoverReport } from "@/components/MakeoverReport";
import { ProfileGaps } from "@/components/ProfileGaps";
import { OutputPanel } from "@/components/OutputPanel";
import { Button, Card, Label, LinkButton, PageHeader } from "@/components/ui";
import { useGenerate } from "@/components/useGenerate";
import { profileOptimizePrompt } from "@/lib/ai/prompts";
import { saveOffersServices, saveTargetRole } from "@/lib/db";
import { useProfile } from "@/lib/hooks";
import { isMakeover, makeoverToMarkdown, parseMakeover } from "@/lib/makeover";
import { fileToBase64 } from "@/lib/pdf";
import { analyseProfile, gapsToText } from "@/lib/profile-gaps";
import type { ImageInput, Profile } from "@/lib/types";

export default function ProfilePage() {
  const profile = useProfile();
  // null = not edited yet, so the field shows the role saved at upload.
  const [draftRole, setDraftRole] = useState<string | null>(null);
  const [draftServices, setDraftServices] = useState<boolean | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);
  // Scores follow the role this review was written for, not later edits to the box.
  const [reviewedRole, setReviewedRole] = useState("");
  const [screenshot, setScreenshot] = useState<{ img: ImageInput; name: string } | null>(null);
  const gen = useGenerate();

  if (profile === undefined) return null;
  const focus = draftRole ?? profile?.targetRole ?? "";
  const offersServices = draftServices ?? profile?.offersServices ?? false;

  if (!profile && !screenshot) {
    return (
      <>
        <PageHeader title="Profile Optimizer" description="Section-by-section review of your LinkedIn profile with rewrites you can paste straight in." />
        <Card className="space-y-4">
          <p className="text-sm">To review your profile we need to see it. Upload LinkedIn&apos;s PDF export, or drop a screenshot of your profile page.</p>
          <div className="flex flex-wrap gap-2">
            <LinkButton href="/">Upload LinkedIn PDF</LinkButton>
          </div>
          <div className="text-sm text-muted">or</div>
          <ScreenshotDrop onImage={setScreenshot} />
        </Card>
      </>
    );
  }

  const run = async () => {
    const role = focus.trim();
    setReviewedRole(role);
    if (profile && role !== (profile.targetRole ?? "")) {
      const ok = await saveTargetRole(role).catch(() => false);
      setRoleError(ok ? null : "Couldn't save your target role in this browser. This review still uses it.");
    }
    if (profile && offersServices !== (profile.offersServices ?? false)) {
      const ok = await saveOffersServices(offersServices).catch(() => false);
      setServicesError(ok ? null : "Couldn't save this choice in this browser. This review still uses it.");
    }
    const p: Profile =
      profile ??
      ({
        id: "current",
        name: "",
        headline: "",
        location: "",
        summary: "",
        experience: "",
        education: "",
        skills: [],
        certifications: [],
        raw: "(See the attached screenshot of the LinkedIn profile.)",
        source: "image",
        createdAt: 0,
        expiresAt: 0,
      } satisfies Profile);
    const { system, prompt } = profileOptimizePrompt(p, role, profile ? gapsToText(analyseProfile(profile)) : undefined, Boolean(screenshot), offersServices);
    gen.run({ system, prompt, images: screenshot ? [screenshot.img] : undefined });
  };

  return (
    <>
      <PageHeader title="Profile Optimizer" description="Section-by-section review of your LinkedIn profile with rewrites you can paste straight in." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
        <Card className="space-y-4">
          {profile ? (
            <div className="rounded-lg bg-accent-soft p-3 text-sm">
              <div className="font-medium">{profile.name || "Your profile"}</div>
              <div className="text-muted">{profile.headline || "Headline not detected"}</div>
              {profile.skills.length > 0 && <div className="mt-1 text-xs text-muted">Top skills: {profile.skills.slice(0, 5).join(", ")}</div>}
            </div>
          ) : (
            <div className="rounded-lg bg-accent-soft p-3 text-sm">
              Screenshot: <span className="font-medium">{screenshot?.name}</span>{" "}
              <button className="text-accent hover:underline" onClick={() => setScreenshot(null)}>
                remove
              </button>
            </div>
          )}

          <div>
            <Label hint="recommended">Target role</Label>
            <input
              className="field"
              placeholder="e.g. SDE intern, data analyst, product manager"
              value={focus}
              onChange={(e) => setDraftRole(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted">Every rewrite is tailored to this role. Leave blank and we&apos;ll guess from your profile.</p>
            {roleError && <p className="mt-1 text-xs text-danger">{roleError}</p>}
            <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={offersServices} onChange={(e) => setDraftServices(e.target.checked)} />
              <span>
                I offer freelance or consulting services
                <span className="block text-xs text-muted">Adds a card for LinkedIn&apos;s Services page: what to put in each field.</span>
              </span>
            </label>
            {servicesError && <p className="mt-1 text-xs text-danger">{servicesError}</p>}
          </div>

          <Button onClick={run} disabled={gen.loading} className="w-full">
            {gen.loading ? "Reviewing…" : "Review my profile"}
          </Button>

          {profile && !screenshot && (
            <details className="text-sm">
              <summary className="cursor-pointer text-muted">Also attach a screenshot (to get feedback on your current photo and banner)</summary>
              <div className="mt-2">
                <ScreenshotDrop onImage={setScreenshot} compact />
              </div>
            </details>
          )}
        </Card>

        {profile && <ProfileGaps report={analyseProfile(profile)} />}
        <BannerGenerator role={focus} />
        </div>

        <OutputPanel
          output={gen.output}
          loading={gen.loading}
          error={gen.error}
          meta={gen.meta}
          onStop={gen.stop}
          draftType="profile"
          draftTitle={`Profile review${focus ? ` — ${focus}` : ""}`}
          emptyHint="Click “Review my profile” for a section-by-section makeover: your original, a rewrite for your target role, and why it's better."
          render={(out) => {
            const m = parseMakeover(out);
            // A model that ignored the format still gets its answer shown.
            return isMakeover(m) ? <MakeoverReport makeover={m} profile={profile} targetRole={reviewedRole} loading={gen.loading} /> : <Markdown>{out}</Markdown>;
          }}
          exportText={(out) => {
            const m = parseMakeover(out);
            return isMakeover(m) ? makeoverToMarkdown(m) : out;
          }}
        />
      </div>
    </>
  );
}

function ScreenshotDrop({ onImage, compact }: { onImage: (v: { img: ImageInput; name: string }) => void; compact?: boolean }) {
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      <FileDrop
        accept="image/png,image/jpeg,image/webp"
        onFile={async (f) => {
          if (f.size > 4 * 1024 * 1024) {
            setErr("Please use an image under 4 MB.");
            return;
          }
          setErr(null);
          onImage({ img: { mimeType: f.type, base64: await fileToBase64(f) }, name: f.name });
        }}
      >
        <p className={compact ? "text-sm" : "font-medium"}>
          <span className="sm:hidden">Tap to add a screenshot of your LinkedIn profile</span>
          <span className="hidden sm:inline">Drop a screenshot of your LinkedIn profile</span>
        </p>
        <p className="mt-1 text-xs text-muted">PNG or JPG. Works with Gemini, OpenAI and Claude; some Groq models don&apos;t support images.</p>
      </FileDrop>
      {err && <p className="mt-1 text-xs text-danger">{err}</p>}
    </div>
  );
}
