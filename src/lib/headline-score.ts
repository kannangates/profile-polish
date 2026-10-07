import { LINKEDIN_LIMITS, charCount } from "./makeover.ts";

/**
 * Rates headline options against rules that need no AI, so a student can see
 * at a glance which of the three to paste. It checks what a recruiter's search
 * and a truncated headline reward — the role, real skills, the first few
 * words — not whether the wording is good, which only the student can judge.
 */

export interface HeadlineCheck {
  label: string;
  ok: boolean;
  points: number;
}

export interface HeadlineRating {
  /** 0–100, over the checks that apply to this student. */
  score: number;
  checks: HeadlineCheck[];
}

const LIMIT = LINKEDIN_LIMITS.headline ?? 220;
/** LinkedIn cuts the headline short in comments, search results and on phones. */
const VISIBLE_START = 60;
const STOPWORDS = new Set(["a", "an", "and", "at", "for", "in", "of", "on", "or", "the", "to", "with"]);
const BUZZWORDS = /\b(hard-?working|passionate|team player|go-getter|synergy|results-driven|guru|ninja|rockstar)\b/i;

function words(s: string) {
  return s.toLowerCase().match(/[a-z0-9+#.]+/g) ?? [];
}

/** "Manager" should match "Management", so compare the start of longer words. */
const stem = (w: string) => (w.length > 5 ? w.slice(0, 5) : w);

function roleFound(role: string, text: string) {
  const want = words(role).filter((w) => !STOPWORDS.has(w)).map(stem);
  if (!want.length) return false;
  const have = new Set(words(text).map(stem));
  return want.every((w) => have.has(w));
}

function skillsFound(skills: string[], text: string) {
  const lower = ` ${text.toLowerCase()} `;
  return skills.filter((s) => {
    const k = s.trim().toLowerCase();
    return k.length > 1 && new RegExp(`[^a-z0-9]${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^a-z0-9]`).test(lower);
  }).length;
}

export function rateHeadline(text: string, opts: { targetRole?: string; skills?: string[] } = {}): HeadlineRating {
  const headline = text.replace(/\s+/g, " ").trim();
  const role = opts.targetRole?.trim() ?? "";
  const skills = opts.skills ?? [];
  const checks: HeadlineCheck[] = [];

  if (role) {
    checks.push({ label: `Names your target role (${role})`, ok: roleFound(role, headline), points: 25 });
    checks.push({ label: "Puts the role in the first few words, which stay visible when LinkedIn shortens it", ok: roleFound(role, headline.slice(0, VISIBLE_START)), points: 15 });
  }
  if (skills.length) {
    const n = skillsFound(skills, headline);
    checks.push({ label: n ? `Mentions ${n} skill${n === 1 ? "" : "s"} from your profile` : "Mentions skills from your profile", ok: n >= 2, points: 20 });
  }
  checks.push({ label: `Fits LinkedIn's ${LIMIT} characters`, ok: charCount(headline) <= LIMIT, points: 15 });
  checks.push({ label: "Says enough to stand out (6 words or more)", ok: words(headline).length >= 6, points: 10 });
  checks.push({ label: "No buzzwords like \"passionate\" or \"team player\"", ok: !BUZZWORDS.test(headline), points: 10 });
  checks.push({ label: "Nothing left to fill in, like [add number]", ok: !/\[[^\]]*\]/.test(headline), points: 5 });

  const total = checks.reduce((sum, c) => sum + c.points, 0);
  const earned = checks.reduce((sum, c) => sum + (c.ok ? c.points : 0), 0);
  return { score: Math.round((earned / total) * 100), checks };
}

/** Index of the single highest-scoring option, or -1 when there is no clear winner. */
export function bestOption(ratings: HeadlineRating[]) {
  if (ratings.length < 2) return -1;
  const top = Math.max(...ratings.map((r) => r.score));
  const winners = ratings.filter((r) => r.score === top).length;
  return winners === 1 ? ratings.findIndex((r) => r.score === top) : -1;
}
