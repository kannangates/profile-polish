import assert from "node:assert/strict";
import { test } from "node:test";
import { charCount, isMakeover, makeoverToMarkdown, parseFixes, parseMakeover, parseServices, splitSkills } from "../src/lib/makeover.ts";

// Each case below is a shape a real model answer has taken.

test("parses score, quick wins and sections", () => {
  const m = parseMakeover(`@@SCORE 72 | Strong numbers, weak headline
@@QUICKWINS
- Fix the headline
@@SECTION headline
@@ORIGINAL
Old headline
@@UPDATED
New headline
@@BEFORE
Too broad.
@@AFTER
Focused.
@@NEXT
- Paste it
`);
  assert.equal(m.score, 72);
  assert.equal(m.scoreReason, "Strong numbers, weak headline");
  assert.equal(m.quickWins, "- Fix the headline");
  assert.equal(m.sections.length, 1);
  assert.deepEqual(m.sections[0], { kind: "headline", original: "Old headline", updated: ["New headline"], before: "Too broad.", after: "Focused.", next: "- Paste it" });
});

test("reads role title, company and dates for experience", () => {
  const m = parseMakeover("@@SECTION experience | Hub Manager | Grofers | July 2015 - November 2016\n@@UPDATED\nx\n");
  assert.deepEqual(m.sections[0].role, { title: "Hub Manager", company: "Grofers", dates: "July 2015 - November 2016" });
});

test("tolerates bold markers, code fences and content on the marker line", () => {
  const m = parseMakeover("```\n**@@SCORE 58 | ok**\n## @@SECTION about\n@@UPDATED First line\nsecond line\n```\n");
  assert.equal(m.score, 58);
  assert.equal(m.sections[0].kind, "about");
  assert.equal(m.sections[0].updated[0], "First line\nsecond line");
});

test("ignores a half-streamed marker so the wrong section never flashes", () => {
  const m = parseMakeover("@@SECTION headline\n@@UPDATED\nA\n@@SECTION skil");
  assert.deepEqual(m.sections.map((s) => s.kind), ["headline"]);
});

test("folds repeated headline blocks into one card, but keeps every role", () => {
  const m = parseMakeover(`@@SECTION headline
@@UPDATED
A
@@BEFORE
weak
@@SECTION headline
@@UPDATED
B
@@BEFORE
ignored
@@SECTION experience | PM | Printo | 2024
@@UPDATED
x
@@SECTION experience | Ops | Printo | 2021
@@UPDATED
y
`);
  assert.deepEqual(m.sections.map((s) => s.kind), ["headline", "experience", "experience"]);
  assert.deepEqual(m.sections[0].updated, ["A", "B"]);
  assert.equal(m.sections[0].before, "weak");
});

test("a model that ignored the format is not mistaken for a makeover", () => {
  assert.equal(isMakeover(parseMakeover("## Profile score\n80/100\n")), false);
});

test("Copy all / Save draft export has no markers and lists skills as bullets", () => {
  const md = makeoverToMarkdown(parseMakeover("@@SCORE 60 | x\n@@SECTION skills\n@@UPDATED\nProduct Management\nSQL (only if true)\n"));
  assert.doesNotMatch(md, /@@/);
  assert.match(md, /- Product Management\n- SQL _\(only if true\)_/);
});

test("skills: one per line, old comma lists, bullets and numbering all split cleanly", () => {
  assert.deepEqual(splitSkills("Product Management\n- AI Agents\n3. Tableau (only if true)"), [
    { name: "Product Management", onlyIfTrue: false },
    { name: "AI Agents", onlyIfTrue: false },
    { name: "Tableau", onlyIfTrue: true },
  ]);
  assert.deepEqual(splitSkills("Product Management, HTML").map((s) => s.name), ["Product Management", "HTML"]);
});

test("Everything else: Fix / Why / numbered steps, with bold labels and 1) numbering", () => {
  const { fixes, notes } = parseFixes(`**Fix:** Add your email to Contact info
Why: Recruiters can reach you without connecting.
1. Go to your profile.
2. Click "Contact info".

Fix: Correct "Begineers" in your Tableau certificate:
Why: Typos look careless.
1) Open Licenses & certifications

Menu names may vary.`);
  assert.equal(fixes.length, 2);
  assert.deepEqual(fixes[0], { title: "Add your email to Contact info", why: "Recruiters can reach you without connecting.", steps: ["Go to your profile.", 'Click "Contact info".'] });
  assert.equal(fixes[1].title, 'Correct "Begineers" in your Tableau certificate');
  assert.deepEqual(fixes[1].steps, ["Open Licenses & certifications"]);
  assert.deepEqual(notes, ["Menu names may vary."]);
});

test("Everything else in free text yields no fixes, so the plain block renders instead", () => {
  assert.equal(parseFixes("- Add an email\n- Fix a typo").fixes.length, 0);
});

test("Services: splits the labelled answer into LinkedIn's form fields", () => {
  const plan = parseServices(`Services:
Management Consulting
Business Consulting (only if true)
About: I help print teams cut costs.
Work location:
Tick remote.
Pricing: Contact for pricing.
Messages: Turn on Open Profile.
Steps:
1. Click "Open to", then "Providing services".
2) Publish.`);
  assert.ok(plan);
  assert.deepEqual(plan.services.map((s) => s.name), ["Management Consulting", "Business Consulting"]);
  assert.equal(plan.services[1].onlyIfTrue, true);
  assert.equal(plan.about, "I help print teams cut costs.");
  assert.equal(plan.location, "Tick remote.");
  assert.equal(plan.pricing, "Contact for pricing.");
  assert.equal(plan.messages, "Turn on Open Profile.");
  assert.deepEqual(plan.steps, ['Click "Open to", then "Providing services".', "Publish."]);
});

test("Services: never more than LinkedIn's 10, and null when the model ignored the labels", () => {
  const many = parseServices(`Services:\n${Array.from({ length: 14 }, (_, i) => `Service ${i}`).join("\n")}`);
  assert.equal(many?.services.length, 10);
  assert.equal(parseServices("Just some advice about services."), null);
});

test("character count treats ✔ and emoji as one character each", () => {
  assert.equal(charCount("✔ Done"), 6);
  assert.equal(charCount("🚀"), 1);
});
