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

/**
 * Between the name and the first main-column heading sit the headline (which
 * wraps over several lines) and, usually last, the location. Real exports
 * write places like "Greater Chennai Area" with no comma, so match on shape
 * rather than on punctuation.
 */
function headlineAndLocation(texts: string[], nameIdx: number): { headline: string; location: string } {
  if (nameIdx < 0) return { headline: "", location: "" };
  const block: string[] = [];
  for (let i = nameIdx + 1; i < texts.length && block.length < 8; i++) {
    const t = texts[i];
    if (ALL_HEADINGS.includes(t)) break;
    if (/^Page \d+ of \d+$/.test(t)) continue;
    block.push(t);
  }
  const last = block[block.length - 1] ?? "";
  const looksLikePlace = block.length > 1 && last.length < 60 && !last.includes("|") && last.trim().split(/\s+/).length <= 6;
  return looksLikePlace
    ? { headline: block.slice(0, -1).join(" "), location: last }
    : { headline: block.join(" "), location: "" };
}

/**
 * Pasted text has no font sizes, so the name can't be found by size. The
 * Contact block almost always carries the profile URL, whose slug matches the
 * name closely enough to locate it.
 */
function findNameByProfileUrl(texts: string[]): number {
  const urlLine = texts.find((t) => /linkedin\.com\/in\//i.test(t));
  const slug = urlLine?.match(/linkedin\.com\/in\/([a-z0-9-]+)/i)?.[1]?.replace(/-/g, "").toLowerCase();
  if (!slug) return -1;
  return texts.findIndex((t) => {
    if (ALL_HEADINGS.includes(t) || t.length > 60) return false;
    const letters = t.toLowerCase().replace(/[^a-z]/g, "");
    return letters.length > 2 && (letters.startsWith(slug) || slug.startsWith(letters));
  });
}

export function parseLinkedInPdf(lines: ExtractedLine[]): ParsedProfile {
  const texts = lines.map((l) => l.text);
  const raw = texts.join("\n");

  // Name = tallest text on page 1 (LinkedIn renders it in the biggest font).
  const page1 = lines.filter((l) => l.page === 1 && !ALL_HEADINGS.includes(l.text));
  const tallest = page1.reduce<ExtractedLine | null>((best, l) => (!best || l.height > best.height ? l : best), null);
  const name = tallest?.text ?? "";
  const nameIdx = tallest ? lines.indexOf(tallest) : -1;
  const sections = splitSections(texts, nameIdx);
  const { headline, location } = headlineAndLocation(texts, nameIdx);

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

/**
 * Pasted text is usually copied out of the same PDF, so run the same section
 * logic when the LinkedIn headings are present. Otherwise fall back to
 * treating the first two lines as name and headline.
 */
export function parsePlainText(text: string): ParsedProfile {
  const texts = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const looksLikeExport = ALL_HEADINGS.filter((h) => texts.includes(h)).length >= 2;

  if (looksLikeExport) {
    const nameIdx = findNameByProfileUrl(texts);
    const sections = splitSections(texts, nameIdx);
    const { headline, location } = headlineAndLocation(texts, nameIdx);
    return {
      name: nameIdx >= 0 ? texts[nameIdx] : "",
      headline,
      location,
      summary: (sections["Summary"] ?? []).join(" "),
      experience: (sections["Experience"] ?? []).join("\n"),
      education: (sections["Education"] ?? []).join("\n"),
      skills: (sections["Top Skills"] ?? []).filter((x) => x.length < 60),
      certifications: sections["Certifications"] ?? [],
      raw: text,
    };
  }

  return {
    name: texts[0] && texts[0].length < 60 ? texts[0] : "",
    headline: texts[1] ?? "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: [],
    certifications: [],
    raw: text,
  };
}

/**
 * Each role in a LinkedIn export carries a date range of its own, e.g.
 * "August 2024 - Present (2 years 2 months)". Counting those is accurate,
 * where counting lines is not.
 */
export const ROLE_DATE_LINE = /^[A-Za-z]+ \d{4}\s*[-\u2013\u2014]\s*(Present|[A-Za-z]+ \d{4})/;

export function countRoles(experience: string): number {
  return experience.split("\n").filter((l) => ROLE_DATE_LINE.test(l.trim())).length;
}

export function profileSummaryLine(p: ParsedProfile): string {
  const parts: string[] = [];
  const roles = countRoles(p.experience);
  if (roles) parts.push(`${roles} role${roles === 1 ? "" : "s"}`);
  else if (p.experience) parts.push("experience");
  if (p.education) parts.push("education");
  if (p.skills.length) parts.push(`${p.skills.length} skills`);
  if (p.certifications.length) parts.push(`${p.certifications.length} certification${p.certifications.length === 1 ? "" : "s"}`);
  return parts.length ? `We found: ${parts.join(", ")}.` : "We extracted your profile text.";
}
