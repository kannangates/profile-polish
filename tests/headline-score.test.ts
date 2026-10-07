import assert from "node:assert/strict";
import { test } from "node:test";
import { bestOption, rateHeadline } from "../src/lib/headline-score.ts";

const skills = ["Python", "SQL", "Tableau", "Data Analysis"];

test("a focused headline beats a generic one", () => {
  const strong = rateHeadline("Data Analyst | SQL, Python, Tableau | Final-year BTech CSE", { targetRole: "Data Analyst", skills });
  const weak = rateHeadline("Passionate student at XYZ College", { targetRole: "Data Analyst", skills });
  assert.equal(strong.score, 100);
  assert.ok(weak.score < 50, `weak scored ${weak.score}`);
});

test("matches a role written in a different form", () => {
  const r = rateHeadline("Product Management Intern at Acme | Roadmaps, user research, SQL", { targetRole: "Product Manager" });
  assert.ok(r.checks.find((c) => c.label.startsWith("Names your target role"))?.ok);
});

test("the role must sit near the start to earn the visible-start check", () => {
  const late = rateHeadline("BTech CSE 2027 | Python, SQL, Tableau, Power BI, Excel, statistics | Looking for Data Analyst roles", { targetRole: "Data Analyst", skills });
  const named = late.checks.find((c) => c.label.startsWith("Names"));
  const early = late.checks.find((c) => c.label.startsWith("Puts the role"));
  assert.equal(named?.ok, true);
  assert.equal(early?.ok, false);
});

test("does not match a skill inside another word", () => {
  const r = rateHeadline("Data Analyst | Rust and Go developer in the making", { targetRole: "Data Analyst", skills: ["R", "Go"] });
  assert.equal(r.checks.find((c) => c.label.includes("skill"))?.label, "Mentions 1 skill from your profile");
});

test("flags placeholders and the 220-character limit", () => {
  const r = rateHeadline(`Data Analyst | Cut report time by [add number]% | ${"x".repeat(220)}`, { targetRole: "Data Analyst" });
  assert.equal(r.checks.find((c) => c.label.startsWith("Fits"))?.ok, false);
  assert.equal(r.checks.find((c) => c.label.startsWith("Nothing left"))?.ok, false);
});

test("skips role and skill checks it cannot make, instead of failing them", () => {
  const r = rateHeadline("BTech CSE 2027 | Python, SQL | Looking for analyst internships");
  assert.equal(r.checks.length, 4);
  assert.equal(r.score, 100);
});

test("names a best option only when one clearly leads", () => {
  assert.equal(bestOption([{ score: 70, checks: [] }, { score: 90, checks: [] }, { score: 80, checks: [] }]), 1);
  assert.equal(bestOption([{ score: 90, checks: [] }, { score: 90, checks: [] }]), -1);
  assert.equal(bestOption([{ score: 90, checks: [] }]), -1);
});
