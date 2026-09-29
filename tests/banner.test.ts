import assert from "node:assert/strict";
import { test } from "node:test";
import { edgeBands } from "../src/lib/banner.ts";

// Row-to-row brightness changes, shaped like a real 396-row banner: ~1 inside
// the artwork, with a seam where a strip starts.
const art = (n: number) => Array.from({ length: n }, (_, i) => (i === 0 ? 0 : 0.8 + (i % 5) * 0.3));

test("a strip along the bottom is cut just above its seam", () => {
  const d = art(396);
  d[385] = 5.8; // antialiased edge
  d[386] = 11.7; // the seam measured on a real generated banner
  assert.deepEqual(edgeBands(d), { top: 0, bottom: 396 - 386 + 2 });
});

test("a bar along the top is cut just below its seam", () => {
  const d = art(396);
  d[8] = 14;
  assert.deepEqual(edgeBands(d), { top: 10, bottom: 0 });
});

test("clean artwork is left alone", () => {
  assert.deepEqual(edgeBands(art(396)), { top: 0, bottom: 0 });
});

test("a sharp edge in the middle of the artwork is never cut", () => {
  const d = art(396);
  d[200] = 30;
  assert.deepEqual(edgeBands(d), { top: 0, bottom: 0 });
});

test("a busy image needs a bigger jump to count as a seam", () => {
  const d: number[] = Array.from({ length: 396 }, (_, i) => (i === 0 ? 0 : 3));
  d[390] = 9; // under 5x the typical change of 3
  assert.deepEqual(edgeBands(d), { top: 0, bottom: 0 });
});
