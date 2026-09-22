import type { ExtractedLine } from "./pdf";
import type { Profile } from "./types";

/**
 * Heuristic parser for LinkedIn's "Save to PDF" export.
 * Layout: a sidebar (Contact, Top Skills, Languages, Certifications, Honors)
 * and a main column (Name, Headline, Location, Summary, Experience, Education).
 * The AI always gets the full raw text; this parser only powers the preview
 * card and light personalization, so it degrades gracefully.
 */

const SIDEBAR_HEADINGS = ["Contact", "Top Skills", "Languages", "Certifications", "Honors-Awards", "Publications", "Patents", "Courses", "Projects"];
const MAIN_HEADINGS = ["Summary", "Experience", "Education"];
const ALL_HEADINGS = [...SIDEBAR_HEADINGS, ...MAIN_HEADINGS];

type Sections = Record<string, string[]>;

/**
 * @param nameIdx index of the name line — the main column starts there, so
 * whatever sidebar section was open (usually Certifications) must end.
 */
function splitSections(lines: string[], nameIdx: number): Sections {
  const sections: Sections = {};
  let current = "_top";
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (/^Page \d+ of \d+$/.test(line)) return;
    if (i === nameIdx) {
      current = "_main";
      sections[current] ??= [];
      return;
    }
    if (ALL_HEADINGS.includes(line)) {
      current = line;
      sections[current] ??= [];
      return;
    }
    (sections[current] ??= []).push(line);
  });
  return sections;
}

export type ParsedProfile = Omit<Profile, "id" | "createdAt" | "expiresAt" | "source">;

export function parseLinkedInPdf(lines: ExtractedLine[]): ParsedProfile {
  const texts = lines.map((l) => l.text);
  const raw = texts.join("\n");

  // Name = tallest text on page 1 (LinkedIn renders it in the biggest font).
  const page1 = lines.filter((l) => l.page === 1 && !ALL_HEADINGS.includes(l.text));
  const tallest = page1.reduce<ExtractedLine | null>((best, l) => (!best || l.height > best.height ? l : best), null);
  const name = tallest?.text ?? "";
  const sections = splitSections(texts, tallest ? lines.indexOf(tallest) : -1);

  // Headline + location follow the name in the main column.
  let headline = "";
  let location = "";
  if (tallest) {
    const idx = lines.indexOf(tallest);
    const after = lines.slice(idx + 1, idx + 6).map((l) => l.text).filter((t) => !ALL_HEADINGS.includes(t));
    // Location line usually looks like "City, State, Country" and is short.
    const locIdx = after.findIndex((t) => /^[^,]{2,40},\s*[^,]{2,40}(,\s*[^,]{2,40})?$/.test(t) && t.length < 80);
    if (locIdx >= 0) {
      location = after[locIdx];
      headline = after.slice(0, locIdx).join(" ");
    } else {
      headline = after[0] ?? "";
    }
  }

  const skills = (sections["Top Skills"] ?? []).filter((s) => s.length < 60);
  const certifications = sections["Certifications"] ?? [];

  return {
    name,
    headline,
    location,
    summary: (sections["Summary"] ?? []).join(" "),
    experience: (sections["Experience"] ?? []).join("\n"),
    education: (sections["Education"] ?? []).join("\n"),
    skills,
    certifications,
    raw,
  };
}

/** For pasted text we can't detect structure — keep it raw and guess a name from line 1. */
export function parsePlainText(text: string): ParsedProfile {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return {
    name: lines[0]?.length < 60 ? lines[0] : "",
    headline: lines[1] ?? "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: [],
    certifications: [],
    raw: text,
  };
}

export function profileSummaryLine(p: ParsedProfile): string {
  const parts: string[] = [];
  const roles = (p.experience.match(/\n/g)?.length ?? 0) > 0 ? Math.max(1, Math.round(p.experience.split("\n").length / 4)) : 0;
  if (roles) parts.push(`~${roles} experience entr${roles === 1 ? "y" : "ies"}`);
  if (p.education) parts.push("education");
  if (p.skills.length) parts.push(`${p.skills.length} skills`);
  if (p.certifications.length) parts.push(`${p.certifications.length} certification${p.certifications.length === 1 ? "" : "s"}`);
  return parts.length ? `We found: ${parts.join(", ")}.` : "We extracted your profile text.";
}
