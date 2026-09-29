import assert from "node:assert/strict";
import { test } from "node:test";
import { sharedKeyState } from "../src/lib/shared-key.ts";

// The demo switch: the host's key serves students only while SHARED_KEY_ENABLED isn't "false".

test("with a key and no switch set, the demo is on — existing deployments are unchanged", () => {
  assert.equal(sharedKeyState({ GEMINI_API_KEY: "k" }), "on");
  assert.equal(sharedKeyState({ GEMINI_API_KEY: "k", SHARED_KEY_ENABLED: "true" }), "on");
});

test("SHARED_KEY_ENABLED=false ends the demo but keeps the key for banners", () => {
  assert.equal(sharedKeyState({ GEMINI_API_KEY: "k", SHARED_KEY_ENABLED: "false" }), "off");
  assert.equal(sharedKeyState({ GEMINI_API_KEY: "k", SHARED_KEY_ENABLED: " FALSE " }), "off");
});

test("without a key there is no demo, whatever the switch says", () => {
  assert.equal(sharedKeyState({}), "missing");
  assert.equal(sharedKeyState({ SHARED_KEY_ENABLED: "true" }), "missing");
});

test("anything other than false leaves the demo on, so a typo never silently ends it", () => {
  assert.equal(sharedKeyState({ GEMINI_API_KEY: "k", SHARED_KEY_ENABLED: "flase" }), "on");
});
