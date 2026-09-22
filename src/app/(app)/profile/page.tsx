"use client";

import { useState } from "react";
import { FileDrop } from "@/components/FileDrop";
import { OutputPanel } from "@/components/OutputPanel";
import { Button, Card, Label, LinkButton, PageHeader } from "@/components/ui";
import { useGenerate } from "@/components/useGenerate";
import { profileOptimizePrompt } from "@/lib/ai/prompts";
import { useProfile } from "@/lib/hooks";
import { fileToBase64 } from "@/lib/pdf";
import type { ImageInput, Profile } from "@/lib/types";

export default function ProfilePage() {
  const profile = useProfile();
  const [focus, setFocus] = useState("");
  const [screenshot, setScreenshot] = useState<{ img: ImageInput; name: string } | null>(null);
  const gen = useGenerate();

  if (profile === undefined) return null;

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

  const run = () => {
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
    const { system, prompt } = profileOptimizePrompt(p, focus.trim());
    gen.run({ system, prompt, images: screenshot ? [screenshot.img] : undefined });
  };

  return (
    <>
      <PageHeader title="Profile Optimizer" description="Section-by-section review of your LinkedIn profile with rewrites you can paste straight in." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
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
            <Label hint="optional">What are you aiming for?</Label>
            <input
              className="field"
              placeholder="e.g. SDE intern at a product company, data analyst roles, MBA admissions"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted">Suggestions are tailored to this target. Leave blank for a general review.</p>
          </div>

          <Button onClick={run} disabled={gen.loading} className="w-full">
            {gen.loading ? "Reviewing…" : "Review my profile"}
          </Button>

          {profile && !screenshot && (
            <details className="text-sm">
              <summary className="cursor-pointer text-muted">Also attach a screenshot (for photo/banner feedback)</summary>
              <div className="mt-2">
                <ScreenshotDrop onImage={setScreenshot} compact />
              </div>
            </details>
          )}
        </Card>

        <OutputPanel
          output={gen.output}
          loading={gen.loading}
          error={gen.error}
          meta={gen.meta}
          onStop={gen.stop}
          draftType="profile"
          draftTitle={`Profile review${focus ? ` — ${focus}` : ""}`}
          emptyHint="Click “Review my profile” to get a score, quick wins, and rewritten headline, About and experience bullets."
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
        <p className={compact ? "text-sm" : "font-medium"}>Drop a screenshot of your LinkedIn profile</p>
        <p className="mt-1 text-xs text-muted">PNG or JPG. Works with Gemini, OpenAI and Claude; some Groq models don&apos;t support images.</p>
      </FileDrop>
      {err && <p className="mt-1 text-xs text-danger">{err}</p>}
    </div>
  );
}
