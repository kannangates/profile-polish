"use client";

import { useState } from "react";
import { SECTION_INFO, SKILL_MAX, sectionHeading, splitSkills, type Makeover, type MakeoverSection } from "@/lib/makeover";
import type { Profile } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { Markdown } from "./Markdown";
import { Spinner } from "./ui";

/**
 * For headline, About and skills we already hold the student's own text from
 * the parser, so show that as "Original" rather than the model's retelling.
 */
function originalFor(s: MakeoverSection, profile: Profile | null) {
  if (profile) {
    if (s.kind === "headline" && profile.headline) return profile.headline;
    if (s.kind === "about" && profile.summary) return profile.summary;
    if (s.kind === "skills" && profile.skills.length) return profile.skills.join(", ");
  }
  return s.original;
}

export function MakeoverReport({ makeover, profile, loading }: { makeover: Makeover; profile: Profile | null; loading: boolean }) {
  const { score, scoreReason, quickWins, sections } = makeover;
  const tone = score === null ? "" : score >= 75 ? "text-success" : score >= 50 ? "text-warning-fg" : "text-danger";

  return (
    <div className="space-y-4">
      {(score !== null || quickWins) && (
        <div className="rounded-lg border border-border p-4">
          {score !== null && (
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-semibold ${tone}`}>{score}</span>
                <span className="text-sm text-muted">/100</span>
              </div>
              {scoreReason && <p className="mt-1 text-sm text-muted">{scoreReason}</p>}
            </div>
          )}
          {quickWins && (
            <div className="mt-3">
              <div className="text-sm font-medium">Quick wins — do these today</div>
              <Markdown>{quickWins}</Markdown>
            </div>
          )}
        </div>
      )}

      {sections.map((s, i) => (
        <SectionCard key={i} section={s} original={originalFor(s, profile)} writing={loading && i === sections.length - 1} />
      ))}


      {!loading && sections.length > 0 && (
        <p className="text-xs text-muted">
          These are suggestions, not facts about you. Check every line is true before you paste it, fill in each [add number], and change the wording until it sounds like you.
        </p>
      )}
    </div>
  );
}

function SectionCard({ section: s, original, writing }: { section: MakeoverSection; original: string; writing: boolean }) {
  const [view, setView] = useState<"updated" | "original">("updated");
  const [why, setWhy] = useState(false);
  const info = SECTION_INFO[s.kind];
  const hasOriginal = Boolean(original) && original !== "(empty)";
  const multi = s.updated.length > 1;

  return (
    <section className="rounded-lg border border-border">
      <header className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{sectionHeading(s)}</h3>
          {writing && <Spinner className="text-accent" />}
        </div>
        <p className="mt-0.5 text-xs text-muted">{s.kind === "experience" && s.role?.dates ? s.role.dates : info.about}</p>
      </header>

      <div className="space-y-3 p-4">
        {hasOriginal && (
          <div className="inline-flex rounded-lg border border-border p-0.5 text-xs font-medium">
            {(["updated", "original"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1 capitalize transition ${view === v ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {view === "original" && hasOriginal ? (
          <div className="whitespace-pre-wrap rounded-lg bg-accent-soft/60 p-3 text-sm text-muted">{original}</div>
        ) : s.updated.length === 0 ? (
          <p className="text-sm text-muted">{writing ? "Writing…" : "No rewrite suggested for this section."}</p>
        ) : (
          s.updated.map((u, i) => (
            <div key={i} className="rounded-lg bg-accent-soft/60 p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-accent">{multi ? `Option ${i + 1}` : "Updated"}</span>
                <CopyButton text={s.kind === "skills" ? splitSkills(u).map((k) => k.name).join("\n") : u} />
              </div>
              {s.kind === "skills" ? <SkillChips text={u} /> : <Markdown>{u}</Markdown>}
            </div>
          ))
        )}

        {(s.before || s.after) && (
          <div>
            <button className="text-sm text-accent hover:underline" onClick={() => setWhy((v) => !v)} aria-expanded={why}>
              {why ? "Hide why" : "Why this is better"}
            </button>
            {why && (
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {s.before && (
                  <div className="rounded-lg border border-danger/25 bg-danger/5 p-3 text-sm">
                    <div className="mb-1 font-medium">Before</div>
                    <p className="text-muted">{s.before}</p>
                  </div>
                )}
                {s.after && (
                  <div className="rounded-lg border border-success/30 bg-success/5 p-3 text-sm">
                    <div className="mb-1 font-medium">After</div>
                    <p className="text-muted">{s.after}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {s.next && (
          <div className="text-sm">
            <div className="font-medium">Next steps</div>
            <Markdown>{s.next}</Markdown>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillChips({ text }: { text: string }) {
  const [copied, setCopied] = useState<number | null>(null);
  const skills = splitSkills(text);
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted">LinkedIn adds skills one at a time. Tap a skill to copy it, then paste it into Add skill.</p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((k, i) => {
          const tooLong = k.name.length > SKILL_MAX;
          return (
            <li key={i}>
              <button
                type="button"
                aria-label={`Copy skill: ${k.name}`}
                title={tooLong ? `Over LinkedIn's ${SKILL_MAX}-character limit — shorten it before adding` : "Tap to copy"}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(k.name);
                    setCopied(i);
                    setTimeout(() => setCopied((c) => (c === i ? null : c)), 1500);
                  } catch {
                    /* clipboard blocked — the text is still visible to copy by hand */
                  }
                }}
                className={`rounded-full border px-3 py-1 text-sm transition ${tooLong ? "border-danger/40 text-danger" : "border-border bg-surface hover:border-accent"}`}
              >
                {copied === i ? "Copied ✓" : k.name}
                {k.onlyIfTrue && copied !== i && <span className="ml-1 text-xs text-muted">· only if true</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
