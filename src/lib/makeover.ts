/**
 * Parser for the profile review format defined in `profileOptimizePrompt`.
 * It runs on every streamed token, so it must accept a half-written answer,
 * and it must shrug off the small liberties models take — bold markers,
 * a stray code fence, "## @@SECTION".
 */

export type SectionKind = "headline" | "about" | "experience" | "skills" | "photo" | "banner" | "other";

export interface MakeoverSection {
  kind: SectionKind;
  /** Role title, company and dates — experience only. */
  role?: { title: string; company: string; dates: string };
  original: string;
  /** One entry per option; headlines usually have three. */
  updated: string[];
  before: string;
  after: string;
  next: string;
}

export interface Makeover {
  score: number | null;
  scoreReason: string;
  quickWins: string;
  sections: MakeoverSection[];
}

const KINDS: SectionKind[] = ["headline", "about", "experience", "skills", "photo", "banner", "other"];

type Field = "quickWins" | "original" | "updated" | "before" | "after" | "next" | null;

const MARKER = /^[\s>#*_`]*@@([A-Z]+)\b[*_`]*\s*(.*)$/;

function toKind(s: string): SectionKind {
  const k = s.trim().toLowerCase().replace(/[^a-z]/g, "");
  return (KINDS as string[]).includes(k) ? (k as SectionKind) : "other";
}

export function parseMakeover(text: string): Makeover {
  const out: Makeover = { score: null, scoreReason: "", quickWins: "", sections: [] };
  let section: MakeoverSection | null = null;
  let field: Field = null;
  const buf: Record<Exclude<Field, null>, string[]> = { quickWins: [], original: [], updated: [], before: [], after: [], next: [] };

  const flush = () => {
    if (!field) return;
    const value = buf[field].join("\n").trim();
    buf[field] = [];
    if (field === "quickWins") out.quickWins = value;
    else if (section) {
      if (field === "updated") {
        if (value) section.updated.push(value);
      } else if (!section[field]) section[field] = value;
    }
  };

  const lines = text.split("\n");
  // Mid-stream, "@@SECTION skil" would briefly render as the wrong section.
  if (!text.endsWith("\n") && MARKER.test(lines[lines.length - 1])) lines.pop();

  for (const line of lines) {
    if (/^\s*```/.test(line)) continue;
    const m = line.match(MARKER);
    if (!m) {
      if (field) buf[field].push(line);
      continue;
    }
    flush();
    const tag = m[1];
    const rest = m[2].replace(/[*_`]+$/, "").trim();
    switch (tag) {
      case "SCORE": {
        const [num, ...reason] = rest.split("|");
        const n = parseInt(num, 10);
        out.score = Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
        out.scoreReason = reason.join("|").trim();
        field = null;
        break;
      }
      case "QUICKWINS":
        field = "quickWins";
        break;
      case "SECTION": {
        const [kind, title = "", company = "", dates = ""] = rest.split("|").map((s) => s.trim());
        const k = toKind(kind);
        // Models often send each headline option as its own block. Every kind
        // except experience appears once, so fold repeats into the first card.
        const existing = k === "experience" ? undefined : out.sections.find((s) => s.kind === k);
        if (existing) section = existing;
        else {
          section = { kind: k, original: "", updated: [], before: "", after: "", next: "" };
          if (k === "experience") section.role = { title, company, dates };
          out.sections.push(section);
        }
        field = null;
        break;
      }
      case "ORIGINAL":
      case "UPDATED":
      case "BEFORE":
      case "AFTER":
      case "NEXT":
        field = tag.toLowerCase() as Field;
        // Some models put the first line of content on the marker line.
        if (rest) buf[field as Exclude<Field, null>].push(rest);
        break;
      default:
        if (field) buf[field].push(line);
    }
  }
  flush();
  return out;
}

/** True once the model has clearly followed the format. */
export function isMakeover(m: Makeover) {
  return m.sections.length > 0 || m.score !== null;
}

export const SECTION_INFO: Record<SectionKind, { title: string; about: string }> = {
  headline: { title: "Headline", about: "The one-liner under your name. It shows up in search results, comments and connection requests." },
  about: { title: "About", about: "Your professional summary — what you do, what you've achieved and what you want next." },
  experience: { title: "Experience", about: "Each role, with what you did and what changed because of it." },
  skills: { title: "Skills", about: "The keywords recruiters filter on. Pin the three that matter most for your target role." },
  photo: { title: "Profile photo", about: "What to upload and why. We give advice only — we never generate or edit photos of you." },
  banner: { title: "Background banner", about: "The wide image behind your photo. What it should show for your target role." },
  other: { title: "Everything else", about: "Education, certifications, featured and your custom URL." },
};

export function sectionHeading(s: MakeoverSection) {
  if (s.kind === "experience" && s.role?.title) return [s.role.title, s.role.company].filter(Boolean).join(" · ");
  return SECTION_INFO[s.kind].title;
}

/** LinkedIn rejects a skill longer than this. */
export const SKILL_MAX = 100;

export interface Skill {
  name: string;
  onlyIfTrue: boolean;
}

/**
 * LinkedIn adds skills one at a time, so a comma-separated list pasted into
 * the box fails its 100-character limit. Accept one-per-line (what the prompt
 * asks for) and older comma-separated answers alike.
 */
export function splitSkills(text: string): Skill[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = lines.length === 1 ? lines[0].split(",") : lines;
  return items
    .map((raw) => {
      const cleaned = raw.replace(/^([-*•]|\d+[.)])\s*/, "").trim();
      const onlyIfTrue = /\(only if true\)\s*$/i.test(cleaned);
      return { name: cleaned.replace(/\s*\(only if true\)\s*$/i, "").trim(), onlyIfTrue };
    })
    .filter((s) => s.name);
}

/** Plain Markdown for Copy all and saved drafts, where the markers would be noise. */
export function makeoverToMarkdown(m: Makeover) {
  const parts: string[] = [];
  if (m.score !== null) parts.push(`## Profile score: ${m.score}/100\n${m.scoreReason}`);
  if (m.quickWins) parts.push(`## Quick wins\n${m.quickWins}`);
  for (const s of m.sections) {
    const lines = [`## ${sectionHeading(s)}`];
    if (s.role?.dates) lines.push(`_${s.role.dates}_`);
    if (s.original) lines.push(`**Original**\n\n${s.original}`);
    s.updated.forEach((u, i) => {
      const body = s.kind === "skills" ? splitSkills(u).map((k) => `- ${k.name}${k.onlyIfTrue ? " _(only if true)_" : ""}`).join("\n") : u;
      lines.push(`**${s.updated.length > 1 ? `Option ${i + 1}` : "Updated"}**\n\n${body}`);
    });
    if (s.before) lines.push(`**Before:** ${s.before}`);
    if (s.after) lines.push(`**After:** ${s.after}`);
    if (s.next) lines.push(`**Next steps**\n\n${s.next}`);
    parts.push(lines.join("\n\n"));
  }
  return parts.join("\n\n");
}
