import { ROLE_DATE_LINE } from "./profile-parser";
import type { Profile } from "./types";

/**
 * What's missing from a student's LinkedIn profile, worked out from the text
 * alone — no AI call, so it costs nothing and appears the moment a profile is
 * loaded. Recruiters filter on these before they ever read a word.
 */

export interface Gap {
  id: string;
  /** Short statement of what is missing. */
  label: string;
  /** What to do about it, in one sentence a student can act on. */
  fix: string;
  ok: boolean;
  weight: number;
  priority: "must" | "nice";
}

export interface GapReport {
  score: number;
  gaps: Gap[];
  missing: Gap[];
  strengths: Gap[];
}

function words(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** LinkedIn's default URL ends in a random suffix; a custom one does not. */
function hasCustomUrl(raw: string) {
  const slug = raw.match(/linkedin\.com\/in\/([a-z0-9-]+)/i)?.[1];
  if (!slug) return false;
  return !/-?[0-9a-f]{6,}$/i.test(slug) && !/-\d{3,}$/.test(slug);
}

/**
 * A role with dates but no prose underneath reads as an empty entry — the
 * single most common gap on a student profile, and the most damaging.
 */
function rolesWithoutDescription(experience: string): number {
  const lines = experience.split("\n").map((l) => l.trim()).filter(Boolean);
  const roleStarts = lines.map((l, i) => (ROLE_DATE_LINE.test(l) ? i : -1)).filter((i) => i >= 0);
  let empty = 0;
  roleStarts.forEach((start, n) => {
    const end = n + 1 < roleStarts.length ? roleStarts[n + 1] : lines.length;
    const body = lines.slice(start + 1, end);
    if (!body.some((l) => l.length > 60)) empty++;
  });
  return empty;
}

export function analyseProfile(p: Profile): GapReport {
  const raw = p.raw;
  const has = (heading: string) => raw.split("\n").some((l) => l.trim() === heading);
  const gaps: Gap[] = [];
  const add = (g: Gap) => gaps.push(g);

  // --- Must fix: recruiters filter on these ---
  const headlineWords = words(p.headline);
  add({
    id: "headline",
    label: "A headline that says what you do",
    fix: headlineWords === 0
      ? "Your headline is empty. Write one with your course, your strongest skills and what you're looking for."
      : "Your headline is very short or generic. \"BTech CSE '27 | Python, SQL | Looking for data analyst internships\" beats \"Student at XYZ College\".",
    ok: headlineWords >= 6 && !/^student at\b/i.test(p.headline.trim()),
    weight: 12,
    priority: "must",
  });

  const aboutWords = words(p.summary);
  add({
    id: "about",
    label: "An About section of 80+ words",
    fix: aboutWords === 0
      ? "You have no About section. Write 4–6 lines: what you study, what you're good at, what you've built, and what you want next."
      : `Your About section is only ~${aboutWords} words. Aim for 80–200 so recruiters get the full picture.`,
    ok: aboutWords >= 80,
    weight: 12,
    priority: "must",
  });

  const roleCount = raw.split("\n").filter((l) => ROLE_DATE_LINE.test(l.trim())).length;
  add({
    id: "experience",
    label: "At least one experience entry",
    fix: "No internships yet? College projects, freelance work, club roles and volunteering all belong here. Add them as experience with dates.",
    ok: roleCount > 0,
    weight: 12,
    priority: "must",
  });

  const emptyRoles = rolesWithoutDescription(p.experience);
  add({
    id: "role-detail",
    label: "Every role explained, not just listed",
    fix: `${emptyRoles} of your ${roleCount} ${roleCount === 1 ? "entry" : "entries"} ${emptyRoles === 1 ? "has" : "have"} dates but no description. Add 3–4 lines each: what you did, the tools you used, and what changed because of it.`,
    ok: roleCount > 0 && emptyRoles === 0,
    weight: 12,
    priority: "must",
  });

  add({
    id: "education",
    label: "Education with course and years",
    fix: "Add your college, degree, branch and expected year of graduation. Recruiters filter by graduation year.",
    ok: !!p.education.trim(),
    weight: 8,
    priority: "must",
  });

  add({
    id: "skills",
    label: "Skills pinned to the top",
    fix: p.skills.length === 0
      ? "No skills found. Add the tools and languages you actually use, then pin your best three."
      : `Only ${p.skills.length} pinned. Pin three that match the roles you want — these show under your name in search.`,
    ok: p.skills.length >= 3,
    weight: 10,
    priority: "must",
  });

  const numbers = (p.experience.match(/\b\d+(\.\d+)?\s*(%|percent|\+|x\b|k\b|lakh|crore|users|students|people|hours|days|weeks|members|teams|orders|clients|customers|marks|cgpa|rank)/gi) ?? []).length;
  add({
    id: "metrics",
    label: "Numbers in your achievements",
    fix: "Add a number wherever you can: users reached, hours saved, marks improved, team size, events organised. \"Built a bus tracker used by 300 students\" beats \"Built a bus tracker\".",
    ok: numbers >= 2,
    weight: 8,
    priority: "must",
  });

  // --- Nice to add: these are what separate two similar students ---
  add({
    id: "custom-url",
    label: "A custom profile URL",
    fix: "Your URL still has LinkedIn's random numbers. Change it to linkedin.com/in/yourname — it goes on your resume.",
    ok: hasCustomUrl(raw),
    weight: 5,
    priority: "nice",
  });

  add({
    id: "certifications",
    label: "Certifications or courses",
    fix: "Add any certificate you've earned — free ones from Google, HubSpot or NPTEL count and show you keep learning.",
    ok: p.certifications.length > 0 || has("Courses"),
    weight: 6,
    priority: "nice",
  });

  add({
    id: "projects",
    label: "A Projects section",
    fix: "Add your college and side projects with a link to the code or a demo. For a student this often matters more than experience.",
    ok: has("Projects"),
    weight: 6,
    priority: "nice",
  });

  add({
    id: "contact",
    label: "An email recruiters can reach",
    fix: "Add an email in your contact info so people can reach you without connecting first.",
    ok: /[\w.+-]+@[\w-]+\.[\w.]+/.test(raw),
    weight: 4,
    priority: "nice",
  });

  add({
    id: "languages",
    label: "Languages you speak",
    fix: "Add the languages you speak. It takes a minute and matters for India-based and customer-facing roles.",
    ok: has("Languages"),
    weight: 3,
    priority: "nice",
  });

  add({
    id: "recognition",
    label: "Awards, publications or volunteering",
    fix: "Add anything you've won, published, or volunteered for — hackathon placings, fest organising, NSS/NCC, a paper.",
    ok: has("Honors-Awards") || has("Publications") || has("Patents"),
    weight: 2,
    priority: "nice",
  });

  const total = gaps.reduce((s, g) => s + g.weight, 0);
  const earned = gaps.filter((g) => g.ok).reduce((s, g) => s + g.weight, 0);

  return {
    score: Math.round((earned / total) * 100),
    gaps,
    missing: gaps.filter((g) => !g.ok),
    strengths: gaps.filter((g) => g.ok),
  };
}

/** Compact form for the AI prompt, so it builds on these instead of repeating them. */
export function gapsToText(r: GapReport): string {
  const lines = r.gaps.map((g) => `- ${g.ok ? "PRESENT" : "MISSING"}: ${g.label}${g.ok ? "" : ` (${g.fix})`}`);
  return `Rule-based completeness: ${r.score}/100\n${lines.join("\n")}`;
}
