import assert from "node:assert/strict";
import { test } from "node:test";
import { toLinkedInText } from "../src/lib/linkedin-text.ts";

// LinkedIn's text boxes are plain text: whatever Copy produces is what the student sees.

test("bullets become ✔, nested bullets become –", () => {
  assert.equal(toLinkedInText("- One\n* Two\n  - Nested"), "✔ One\n✔ Two\n   – Nested");
});

test("a bullet that already starts with a tick isn't doubled", () => {
  assert.equal(toLinkedInText("- ✔️ Increased retention by 10%\n- ✓ Cut costs"), "✔ Increased retention by 10%\n✔ Cut costs");
});

test("strips headings, bold, italic, code, quotes and rules", () => {
  assert.equal(toLinkedInText("## Core Skills\n**Key** *points* and `Python`\n> quoted\n---\nend"), "Core Skills\nKey points and Python\nquoted\n\nend");
});

test("keeps underscores inside words and turns links into text (url)", () => {
  assert.equal(toLinkedInText("See product_solutions at [my site](https://example.com)."), "See product_solutions at my site (https://example.com).");
});

test("keeps [add number] placeholders and numbered steps as they are", () => {
  assert.equal(toLinkedInText("1. Cut time by [add number]%\n2. Publish"), "1. Cut time by [add number]%\n2. Publish");
});

test("collapses runs of blank lines and trims the ends", () => {
  assert.equal(toLinkedInText("\n\nA\n\n\n\nB\n\n"), "A\n\nB");
});

test("labelled keycap steps and ✅ results copy through unchanged", () => {
  const post = "The non-negotiable rules:\n1️⃣ Move only with tests\nEvery extracted file had to pass the existing tests.\n2️⃣ Extract incrementally\n\nThe outcome:\n✅ 4,500+ lines → 11 focused modules\n✅ Existing tests kept passing";
  assert.equal(toLinkedInText(post), post);
});
