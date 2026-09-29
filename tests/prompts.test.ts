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
