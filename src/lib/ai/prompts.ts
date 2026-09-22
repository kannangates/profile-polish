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

export function profileOptimizePrompt(profile: Profile, focus: string) {
  return {
    system: SYSTEM_BASE,
    prompt: `${profileBlock(profile)}

Review this LinkedIn profile for a student / early-career candidate${focus ? ` who is targeting: ${focus}` : ""}.

Produce:
## Profile score
A score out of 100 with a one-line reason.

## Quick wins (do today)
3–5 bullets, highest impact first.

## Headline
- What's weak about the current one (1 line)
- 3 rewritten options (each ≤ 220 characters, include target role + key skills + a hook)

## About section
- What's missing
- A full rewritten About (120–200 words, first person, ends with a call to action)

## Experience & projects
For each role/project you can identify: rewrite the bullets using action verb + what you did + measurable result. Mark unknown numbers as [add number].
If there is no experience, suggest 3 project/volunteering ideas that fit their degree and skills.

## Skills
- Skills to add (based on their target role) and which 3 to pin as Top Skills.

## Other sections
Education, certifications, featured, banner, profile photo, custom URL — only mention what needs fixing.`,
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
