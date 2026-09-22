/**
 * Rule-based ATS checks — run entirely in the browser, cost zero AI calls.
 */

export interface AtsCheck {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
  weight: number;
}

export interface AtsReport {
  score: number;
  checks: AtsCheck[];
  matchedKeywords: string[];
  missingKeywords: string[];
  wordCount: number;
}

const STOP = new Set(
  "a an and are as at be by for from has have in is it its of on or that the to was were will with you your we our this these those they their them not but if then than can may into over under about after before between during through per via each all any more most other some such only own same so too very just also who what which when where why how required preferred experience skills ability strong good excellent work working team teams role roles job candidate candidates must should would could include including etc year years month months".split(" "),
);

const ACTION_VERBS = /^(built|developed|designed|led|created|implemented|improved|reduced|increased|launched|managed|automated|analyzed|analysed|organized|organised|delivered|optimized|optimised|coordinated|researched|presented|taught|mentored|wrote|tested|deployed|migrated|architected|engineered|founded|initiated|streamlined|achieved|won|published|collaborated|contributed|maintained|integrated|configured|resolved|trained|drove|owned)\b/i;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w));
}

export function extractJdKeywords(jd: string, limit = 25): string[] {
  const counts = new Map<string, number>();
  for (const w of tokenize(jd)) counts.set(w, (counts.get(w) ?? 0) + 1);
  // Bigrams catch things like "machine learning", "data structures".
  const words = jd.toLowerCase().replace(/[^a-z0-9+#\s]/g, " ").split(/\s+/).filter(Boolean);
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i], b = words[i + 1];
    if (STOP.has(a) || STOP.has(b) || a.length < 3 || b.length < 3) continue;
    const bg = `${a} ${b}`;
    counts.set(bg, (counts.get(bg) ?? 0) + 1.5);
  }
  const ranked = [...counts.entries()]
    .filter(([, c]) => c >= 2)
    .sort((x, y) => y[1] - x[1])
    .map(([w]) => w);
  const bigrams = ranked.filter((w) => w.includes(" "));
  // "machine learning" already covers "machine" and "learning".
  return ranked.filter((w) => w.includes(" ") || !bigrams.some((b) => b.split(" ").includes(w))).slice(0, limit);
}

export function runAtsChecks(resume: string, jd: string): AtsReport {
  const text = resume.replace(/\r/g, "");
  const lower = text.toLowerCase();
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const has = (re: RegExp) => re.test(lower);
  const checks: AtsCheck[] = [];
  const add = (id: string, label: string, pass: boolean, detail: string, weight: number) => checks.push({ id, label, pass, detail, weight });

  add("email", "Email address present", /[\w.+-]+@[\w-]+\.[\w.]+/.test(text), "ATS pulls contact details from the text — keep them as plain text, not in an image or header box.", 8);
  const phoneCandidates = text.match(/\+?\d[\d\s().-]{8,16}\d/g) ?? [];
  const hasPhone = phoneCandidates.some((c) => {
    const digits = c.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13 && !/^(19|20)\d{2}\D+(19|20)\d{2}$/.test(c.trim());
  });
  add("phone", "Phone number present", hasPhone, "Add a phone number with country code.", 5);
  add("linkedin", "LinkedIn URL present", has(/linkedin\.com\//), "Add your custom LinkedIn URL (linkedin.com/in/your-name).", 4);
  add("education", "Education section found", has(/\beducation\b/), "Use the standard heading \"Education\".", 8);
  add("experience", "Experience / Internships / Projects section found", has(/\b(experience|internship|internships|projects|work history)\b/), "Use standard headings — ATS looks for \"Experience\", \"Projects\", \"Internships\".", 10);
  add("skills", "Skills section found", has(/\b(skills|technical skills|technologies)\b/), "Add a \"Skills\" section with a plain comma-separated list.", 10);
  add("summary", "Summary / Objective found", has(/\b(summary|objective|profile)\b/), "A 2-line summary at the top helps both ATS and recruiters.", 4);
  add("length", "Length fits one page (250–700 words)", wordCount >= 250 && wordCount <= 700, `Your resume has ~${wordCount} words. Freshers should stay on one page.`, 6);

  const marked = lines.filter((l) => /^[•\-*▪●◦‣]/.test(l));
  // Resumes without bullet characters: treat descriptive prose lines as bullets.
  const bullets = marked.length >= 3 ? marked : lines.filter((l) => l.split(/\s+/).length >= 6 && !/[:]$/.test(l));
  const verbBullets = bullets.filter((l) => ACTION_VERBS.test(l.replace(/^[•\-*▪●◦‣]\s*/, "")));
  add("verbs", "Bullets start with action verbs", bullets.length > 0 && verbBullets.length / bullets.length >= 0.6, `${verbBullets.length}/${bullets.length || 0} bullets start with a strong verb.`, 8);

  const numbers = (text.match(/\b\d+(\.\d+)?\s*(%|percent|\+|x\b|k\b|lakh|crore|users|students|people|hours|days|weeks|projects|members|teams|marks|cgpa|gpa|rank|clients|customers|orders|requests|ms\b|sec\b)/gi) ?? []).length
    + (text.match(/\b(cgpa|gpa|rank|top)\s*[:#]?\s*\d+(\.\d+)?/gi) ?? []).length;
  add("metrics", "Uses measurable results", numbers >= 4, `Found ${numbers} numbers. Aim for a metric in most bullets (users, %, time saved, rank, CGPA).`, 8);

  add("tables", "No table / column artefacts", !/\t{2,}|\|\s*\|/.test(text) && !(lines.filter((l) => l.length < 4).length > lines.length * 0.25), "Multi-column layouts and tables scramble ATS parsing. Use a single column.", 8);
  add("dates", "Dates are readable", /\b(20\d{2}|19\d{2})\b/.test(text), "Add month/year for education and roles (e.g. Jun 2024 – Aug 2024).", 4);
  add("fluff", "Avoids clichés", !/\b(hardworking|hard-working|passionate|team player|go-getter|synergy|results-driven)\b/i.test(text), "Cut buzzwords like \"passionate\", \"team player\" — show it with evidence instead.", 3);

  let matched: string[] = [];
  let missing: string[] = [];
  if (jd.trim()) {
    const kws = extractJdKeywords(jd);
    matched = kws.filter((k) => lower.includes(k));
    missing = kws.filter((k) => !lower.includes(k));
    const ratio = kws.length ? matched.length / kws.length : 1;
    add("keywords", "Keyword match with job description", ratio >= 0.5, `${matched.length}/${kws.length} JD keywords found (${Math.round(ratio * 100)}%).`, 14);
  }

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.filter((c) => c.pass).reduce((s, c) => s + c.weight, 0);
  const score = Math.round((earned / totalWeight) * 100);

  return { score, checks, matchedKeywords: matched, missingKeywords: missing, wordCount };
}

export function atsReportToText(r: AtsReport): string {
  const lines = r.checks.map((c) => `- ${c.pass ? "PASS" : "FAIL"}: ${c.label} — ${c.detail}`);
  if (r.missingKeywords.length) lines.push(`- Missing JD keywords: ${r.missingKeywords.join(", ")}`);
  if (r.matchedKeywords.length) lines.push(`- Matched JD keywords: ${r.matchedKeywords.join(", ")}`);
  return `Rule-based ATS score: ${r.score}/100\n${lines.join("\n")}`;
}
