"use client";

import { useState } from "react";
import { LINKEDIN_LIMITS, SECTION_INFO, SERVICES_ABOUT_MAX, SKILL_MAX, charCount, parseFixes, parseServices, sectionHeading, splitSkills, type Makeover, type MakeoverSection, type Skill } from "@/lib/makeover";
import { toLinkedInText } from "@/lib/linkedin-text";
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
          s.updated.map((u, i) => <UpdatedBlock key={i} kind={s.kind} text={u} label={multi ? `Option ${i + 1}` : "Updated"} />)
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

function SkillChips({ skills, noun = "skill" }: { skills: Skill[]; noun?: "skill" | "service" }) {
  const [copied, setCopied] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted">
        {noun === "skill"
          ? "LinkedIn adds skills one at a time. Tap a skill to copy it, paste it into Add skill, then pick the matching suggestion from LinkedIn's list — that's what recruiters search. If nothing matches, choose the closest suggestion rather than saving a new one."
          : "Tap a service to copy it, paste it into Add services, then pick the matching suggestion — LinkedIn only accepts services from its own list."}
      </p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((k, i) => {
          const tooLong = k.name.length > SKILL_MAX;
          return (
            <li key={i}>
              <button
                type="button"
                aria-label={`Copy ${noun}: ${k.name}`}
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

/**
 * Most sections are one block of text to paste. "Everything else" and the
 * Services page are checklists, so they get their own layouts — and fall
 * back to the plain block if the model didn't follow the shape.
 */
function UpdatedBlock({ kind, text, label }: { kind: MakeoverSection["kind"]; text: string; label: string }) {
  if (kind === "other") {
    const { fixes, notes } = parseFixes(text);
    if (fixes.length) return <FixList fixes={fixes} notes={notes} />;
  }
  if (kind === "services") {
    const plan = parseServices(text);
    if (plan) return <ServicesForm plan={plan} />;
  }
  return (
    <div className="rounded-lg bg-accent-soft/60 p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">{label}</span>
        <CopyButton text={kind === "skills" ? splitSkills(text).map((k) => k.name).join("\n") : toLinkedInText(text)} />
      </div>
      {kind === "skills" ? <SkillChips skills={splitSkills(text)} /> : <Markdown>{text}</Markdown>}
      <CharCount text={toLinkedInText(text)} limit={LINKEDIN_LIMITS[kind]} />
    </div>
  );
}

/** Counted on the plain text that Copy puts on the clipboard — what LinkedIn will actually receive. */
function CharCount({ text, limit }: { text: string; limit?: number }) {
  if (!limit) return null;
  const n = charCount(text);
  const over = n > limit;
  return (
    <p className={`mt-2 text-xs ${over ? "font-medium text-danger" : "text-muted"}`}>
      {n.toLocaleString()} / {limit.toLocaleString()} characters{over ? " — LinkedIn won't take this much. Trim it before pasting." : ""}
    </p>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-2 space-y-1.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">{i + 1}</span>
          <span className="pt-px">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function FixList({ fixes, notes }: { fixes: { title: string; why: string; steps: string[] }[]; notes: string[] }) {
  return (
    <div className="space-y-3">
      <ol className="space-y-3">
        {fixes.map((f, i) => (
          <li key={i} className="rounded-lg border border-border p-3">
            <div className="flex gap-2">
              <span className="font-semibold text-accent">{i + 1}.</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{f.title}</div>
                {f.why && <p className="mt-0.5 text-sm text-muted">{f.why}</p>}
                {f.steps.length > 0 && (
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer text-accent">How to do it on LinkedIn</summary>
                    <Steps steps={f.steps} />
                  </details>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {notes.map((n, i) => (
        <p key={i} className="text-sm text-muted">
          {n}
        </p>
      ))}
      <p className="text-xs text-muted">Steps are for LinkedIn on a computer. Menu names can shift a little when LinkedIn updates its site.</p>
    </div>
  );
}

function Field({ label, children, copy }: { label: string; children: React.ReactNode; copy?: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">{label}</span>
        {copy && <CopyButton text={copy} />}
      </div>
      {children}
    </div>
  );
}

function ServicesForm({ plan }: { plan: { services: Skill[]; about: string; location: string; pricing: string; messages: string; steps: string[] } }) {
  const aboutLength = charCount(plan.about);
  const over = aboutLength > SERVICES_ABOUT_MAX;
  return (
    <div className="space-y-3">
      {plan.services.length > 0 && (
        <Field label={`Services provided · ${plan.services.length} of 10`}>
          <SkillChips skills={plan.services} noun="service" />
        </Field>
      )}
      {plan.about && (
        <Field label="About" copy={plan.about}>
          <p className="text-sm">{plan.about}</p>
          <p className={`mt-1 text-xs ${over ? "text-danger" : "text-muted"}`}>
            {aboutLength} / {SERVICES_ABOUT_MAX} characters{over ? " — trim it before pasting" : ""}
          </p>
        </Field>
      )}
      {plan.location && (
        <Field label="Work location">
          <p className="text-sm">{plan.location}</p>
        </Field>
      )}
      {plan.pricing && (
        <Field label="Pricing">
          <p className="text-sm">{plan.pricing}</p>
        </Field>
      )}
      {plan.messages && (
        <Field label="Messages">
          <p className="text-sm">{plan.messages}</p>
        </Field>
      )}
      {plan.steps.length > 0 && (
        <details className="rounded-lg border border-border p-3 text-sm">
          <summary className="cursor-pointer font-medium text-accent">How to set it up on LinkedIn</summary>
          <Steps steps={plan.steps} />
        </details>
      )}
    </div>
  );
}
