import type { Profile } from "../types";

export const SYSTEM_BASE = `You are a friendly, sharp career coach who helps college students and fresh graduates in India stand out on LinkedIn and in job applications.
Rules:
- Be specific and practical. Prefer concrete rewrites over generic advice.
- Write in clear, natural English. No corporate jargon, no clichés like "passionate", "hardworking", "team player".
- Never invent achievements, companies, numbers or skills the student did not mention. If something is missing, say what to add and ask for it in a [bracketed placeholder].
- Format the answer in Markdown with short headings and bullet points. Keep it scannable.`;

function profileBlock(profile?: Profile | null) {
  if (!profile) return "The student has not shared a profile. Use only what they typed.";
  return `STUDENT'S CURRENT LINKEDIN PROFILE (extracted from their PDF export):\n"""\n${profile.raw.slice(0, 12000)}\n"""`;
}

/**
 * The review comes back as marker lines rather than JSON: every provider can
 * follow it, it parses while it streams, and a half-finished answer still
 * renders. `src/lib/makeover.ts` owns the parser — change both together.
 */
export function profileOptimizePrompt(profile: Profile, targetRole: string, gapFindings?: string, hasScreenshot = false) {
  const target = targetRole
    ? `The candidate is targeting: ${targetRole}. Tailor every rewrite, keyword and skill to this role.`
    : "The candidate did not name a target role. Infer the most likely one from the profile, and say which role you assumed in the score line.";
  return {
    system: SYSTEM_BASE,
    prompt: `${profileBlock(profile)}

Review this LinkedIn profile section by section. Match the seniority you see in the profile — a student and a manager with ten years' experience need different advice. Never raise their title or seniority: no "Senior", "Lead" or "Head of" unless the profile already uses it.
${target}
${gapFindings ? `\nAUTOMATED COMPLETENESS CHECKS ALREADY SHOWN TO THEM (do not just repeat these — write the actual content that fills each gap):\n${gapFindings}\n` : ""}
OUTPUT FORMAT — follow it exactly. Each marker sits alone at the start of its own line. Write no text before the first marker, and no code fences.

@@SCORE <number 0-100> | <one-line reason>
@@QUICKWINS
<3–5 bullets, highest impact first>

Then one block per section, in this order: headline, about, one "experience" block per role (most recent first, at most 6 roles), skills, photo, banner, other.

@@SECTION <kind>[ | <role title> | <company> | <dates>]
@@ORIGINAL
<the current text, copied word for word from the profile. Write "(empty)" if the section is missing.>
@@UPDATED
<your rewrite>
@@BEFORE
<2–4 sentences: what is weak about the original for the target role>
@@AFTER
<2–4 sentences: why the rewrite works better for the target role>
@@NEXT
<2–3 bullets the candidate should do next>

Section rules:
- headline: exactly ONE "@@SECTION headline" block containing exactly THREE @@UPDATED markers — one per option. Each option ≤ 220 characters, built from target role + key skills + a hook.
- about: one @@UPDATED with a full first-person About (150–250 words): opening line, what they do, 3–5 achievement bullets using only facts from the profile, a core skills line, and a closing call to action.
- experience: put the role title, company and dates in the @@SECTION line, separated by " | ". One @@UPDATED holding a 1–2 sentence description, then "Achievements:" with bullets (action verb + what they did + result), then "Skills:" with 5 comma-separated skills. Keep EVERY number from the original bullets; mark missing ones as [add number].
- skills: @@ORIGINAL is their current skills, comma-separated. One @@UPDATED with 15–30 comma-separated skills for the target role, most important first — only skills the profile shows evidence of, plus ones marked "(only if true)".
- photo: advice only — never describe generating or editing a photo. ${hasScreenshot ? "@@ORIGINAL is a one-line description of the photo in the screenshot; @@BEFORE and @@AFTER compare it with what you recommend." : "The PDF has no images: skip @@ORIGINAL, @@BEFORE and @@AFTER."} One @@UPDATED with 4–6 bullets on what photo to upload for the target role: framing (head and shoulders, face about 60% of the frame), attire for that field, background, lighting, expression, and why each matters to a recruiter in that field.
- banner: ${hasScreenshot ? "@@ORIGINAL is a one-line description of the banner in the screenshot." : "skip @@ORIGINAL, @@BEFORE and @@AFTER."} One @@UPDATED with 3–5 bullets on what the banner should show for the target role (theme, colours, optional short text line) and why. Keep it concrete enough to brief a designer or an image tool. Its size is 1584 × 396 and the profile photo covers the lower left.
- other: skip @@ORIGINAL, @@BEFORE and @@AFTER. One @@UPDATED with bullets covering only what needs fixing in education, certifications, featured, custom URL.`,
  };
}

export type MessageKind = "connection" | "referral" | "alumni" | "followup" | "thankyou" | "coldemail";

export const MESSAGE_KINDS: { id: MessageKind; label: string; hint: string }[] = [
  { id: "connection", label: "Connection request", hint: "≤ 300 characters. Why you, why them, no ask yet." },
  { id: "referral", label: "Ask for a referral", hint: "To someone at a company you're applying to." },
  { id: "alumni", label: "Reach out to alumni", hint: "Same college, ask for advice or a chat." },
  { id: "followup", label: "Follow-up after interview / event", hint: "Polite, short, keeps the door open." },
  { id: "thankyou", label: "Thank a speaker / mentor", hint: "After a talk, workshop or help received." },
  { id: "coldemail", label: "Cold message to a recruiter", hint: "Direct, respectful of their time." },
];

export function messagePrompt(profile: Profile | null | undefined, kind: MessageKind, recipient: string, context: string, tone: string) {
  const kindLabel = MESSAGE_KINDS.find((k) => k.id === kind)?.label ?? kind;
  return {
    system: SYSTEM_BASE,
    prompt: `${profileBlock(profile)}

Write a LinkedIn message.
Type: ${kindLabel}
Recipient: ${recipient || "[not specified]"}
Context / goal: ${context || "[not specified]"}
Tone: ${tone}

Produce 3 variants under headings "### Option 1", "### Option 2", "### Option 3": one short, one warm, one direct. Connection requests must be ≤ 300 characters. Others ≤ 120 words. No subject lines unless it is an email. Use the student's real background from the profile where relevant. End with one line of advice on when to send it.`,
  };
}

export function postPrompt(profile: Profile | null | undefined, topic: string, angle: string, style: string) {
  return {
    system: SYSTEM_BASE,
    prompt: `${profileBlock(profile)}

Write a LinkedIn post for this student.
Topic: ${topic}
Their angle / opinion / experience: ${angle || "[none given — pick an authentic student angle: learning, curiosity, a question to the network]"}
Style: ${style}

Produce:
## 3 hook options
Three different first lines (each ≤ 12 words) that stop the scroll.

## Post
A complete post (120–220 words). Short paragraphs, one idea per line, no hashtags inside the body, end with a question or CTA. Use hook option 1.

## Hashtags
5 relevant hashtags, mix of broad and niche.

## Best time to post
One line.`,
  };
}

export function atsPrompt(resume: string, jobDescription: string, ruleFindings: string) {
  return {
    system: SYSTEM_BASE,
    prompt: `RESUME TEXT (extracted from the student's file):
"""
${resume.slice(0, 12000)}
"""

${jobDescription ? `TARGET JOB DESCRIPTION:\n"""\n${jobDescription.slice(0, 6000)}\n"""` : "No job description provided — evaluate for a general early-career/internship application in the student's field."}

AUTOMATED CHECKS ALREADY RUN (do not repeat them, build on them):
${ruleFindings}

Produce:
## ATS verdict
One paragraph: will this resume pass an ATS filter for this job, and why.

## Missing keywords to add
List the most important ones from the JD that are missing, and where in the resume each should go (only if the student genuinely has that skill — say "only if true").

## Bullet rewrites
Pick the 5 weakest bullets, show "Before →" and "After →" using action verb + task + measurable result. Use [add number] where a metric is missing.

## Structure & formatting fixes
Section order, length, headings, anything that will break ATS parsers.

## Final checklist
5 items the student should tick before applying.`,
  };
}

export function resumeFixPrompt(resume: string, target: string) {
  return {
    system: SYSTEM_BASE,
    prompt: `RESUME TEXT:
"""
${resume.slice(0, 12000)}
"""

Rewrite this resume for a student / fresher${target ? ` targeting: ${target}` : ""}.

Produce a complete, improved one-page resume in Markdown with these sections in order: Contact line, Summary (2 lines), Education, Skills (grouped), Projects, Experience / Internships (if any), Achievements & Certifications. Keep every fact true to the original; mark missing metrics as [add number]. Every bullet: action verb, what you did, tech used, result. Then add a short "## What I changed and why" section (5 bullets).`,
  };
}
