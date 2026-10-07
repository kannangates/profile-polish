import assert from "node:assert/strict";
import { test } from "node:test";
import { atsPrompt, messagePrompt, postPrompt, profileOptimizePrompt, resumeFixPrompt } from "../src/lib/ai/prompts.ts";
import type { Profile } from "../src/lib/types.ts";

const profile = { raw: "Kanna Perumal C\nProduct Manager" } as Profile;

// Invariant 7: every prompt forbids invention and asks for placeholders.
test("every prompt forbids inventing facts", () => {
  const all = [
    profileOptimizePrompt(profile, "Product Manager"),
    messagePrompt(profile, "connection", "", "", "friendly"),
    postPrompt(profile, "AI", "", "story"),
    atsPrompt("resume", "", "none"),
    resumeFixPrompt("resume", ""),
  ];
  for (const p of all) {
    assert.match(p.system, /Never invent achievements, companies, numbers or skills/);
    assert.match(p.system, /\[bracketed placeholder\]/);
  }
});

test("the Services section is only requested when the student ticks the box", () => {
  const off = profileOptimizePrompt(profile, "PM", undefined, false, false).prompt;
  const on = profileOptimizePrompt(profile, "PM", undefined, false, true).prompt;
  assert.doesNotMatch(off, /- services:/);
  assert.match(on, /- services:/);
  assert.match(on, /banner, services, other\./);
});

test("the review never raises a title and asks for exactly three headlines", () => {
  const p = profileOptimizePrompt(profile, "PM").prompt;
  assert.match(p, /Never raise their title or seniority/);
  assert.match(p, /exactly THREE @@UPDATED markers/);
});

test("skills must be standard LinkedIn names, one per line", () => {
  const p = profileOptimizePrompt(profile, "PM").prompt;
  assert.match(p, /ONE SKILL PER LINE/);
  assert.match(p, /LinkedIn's own skills list/);
});

test("photo advice is text only (invariant 13)", () => {
  assert.match(profileOptimizePrompt(profile, "PM").prompt, /never describe generating or editing a photo/);
});

// A real answer invented a quoted prompt, swapped the student's numbers for
// [X,000] and wrote as an engineer for a Product Manager.
test("posts keep the student's facts, write in their role and stay plain text", () => {
  const p = postPrompt({ ...profile, targetRole: "Product Manager" }, "AI refactoring", "4,500 lines into 11 files", "story").prompt;
  assert.match(p, /Their role: Product Manager/);
  assert.match(p, /Use every number, name, tool and result from their angle exactly as given/);
  assert.match(p, /Put nothing in quotation marks unless they wrote those words/);
  assert.match(p, /no Markdown inside the post/);
  assert.match(p, /1️⃣ 2️⃣ 3️⃣ for steps and ✅ for results/);
});

test("posts come with an image prompt that shows no people (invariant 13)", () => {
  const p = postPrompt(profile, "AI", "", "story").prompt;
  assert.match(p, /## Image prompt/);
  assert.match(p, /No people, faces or hands/);
  assert.match(p, /4:5 portrait image \(1080 × 1350\)/);
});
