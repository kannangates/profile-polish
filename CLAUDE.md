# CLAUDE.md — instructions for Claude Code in this repo

This file tells Claude Code (and any AI assistant) how to work on ProfilePolish, and
what to check before a change is merged. Humans should read it too — it is the
short version of how this project stays free, private and easy to fork.

## What this project is

ProfilePolish is a free LinkedIn and resume coach for college students. It runs
almost entirely in the student's browser. The whole design follows from three
constraints:

1. **It must cost the host ₹0.** Vercel Hobby, free-tier AI keys, no database, no paid add-ons.
2. **Student data must never reach the server.** Profiles, resumes, drafts and API keys live in the browser.
3. **A student must be able to use it in under two minutes**, on a shared lab computer, without an account.

If a change breaks one of these, it is the wrong change — however good the feature is.

## Hard invariants (never break these)


| # | Invariant | Why |
|---|---|---|
| 1 | **BYOK calls go browser → provider directly.** A student's API key must never be sent to our server, logged, or put in a URL. | If the server never holds it, it cannot leak it. |
| 2 | **Student content stays client-side.** Profile text, resume text and drafts live in IndexedDB / component state. The only exception is the shared-key proxy, which forwards one prompt to Gemini and stores nothing. | This is the product's promise, stated in the README and in-app. |
| 3 | **No server-side database, no accounts, no auth.** | Holding resumes and keys server-side without real auth is a liability, and an account gate breaks the two-minute constraint above. Changing this is a decision about what the project is, not a feature — see *Changing an invariant* below. |
| 4 | **Everything in the browser has a TTL.** Drafts and the parsed profile expire after `DRAFT_TTL_MS` (48 h) and are purged on app load. | Shared computers. |
| 5 | **Keys default to `sessionStorage`.** `localStorage` is opt-in behind the "Remember on this device" toggle, with a shared-computer warning. | Lab machines. |
| 6 | **No direct DOM manipulation.** Drive UI through React state. The single allowed exception is a detached `<a>` element for file downloads (see `drafts/page.tsx`). | React owns the DOM; mutating it underneath causes bugs that only appear in production builds. |
| 7 | **Prompts must forbid invention.** Every prompt tells the model not to invent achievements, numbers, companies or skills, and to mark gaps as `[add number]`. | Students paste this into real applications. |
| 8 | **No secret may be added to client code or committed.** Server secrets live in Vercel env vars only; `.env*` is git-ignored. | Obvious, but easy to slip. |
| 9 | **No analytics that capture page content or user input.** | See `docs/PRIVACY.md`. |
| 10 | **Don't oversell.** Copy describes what the app does (polish, draft, check) — never promises replies, interviews or jobs. | The app was renamed from "CareerLift" for exactly this reason. |
| 11 | **Never claim something was saved unless storage confirms it.** Decide UI state from what is stored, never from the value being typed, and surface a failed write instead of swallowing it. | A card that read `hasKey` from the input buffer unmounted the Save button on the first keystroke, so pasting a key looked successful and stored nothing. Every later request then failed with an error about the deployment. |
| 12 | **Anything checkable without a model is checked without one.** Rule-based results appear instantly, cost nothing, and work before a student has a key. | The ATS checks and the profile gap panel both run in the browser; the AI builds on their findings instead of repeating them. |

### Changing an invariant

These are hard, not permanent. One may be revisited when the project's goals
genuinely change — but that is a deliberate decision, made in its own PR, not
something a feature quietly assumes.

If a change needs an invariant relaxed: say so plainly, amend the table with the
new reasoning, and only then build on it. Do not ship a feature that contradicts
a row while the row still stands.

One known candidate, recorded so it stops looking like an accident: the README
roadmap floats **optional accounts with cross-device sync**, which invariant 3
forbids today. It is a real possibility if students ask for it, and it would mean
accepting server-side storage of student data, real authentication, and a
host-side cost. That moves four things at once: the zero-cost constraint, the
two-minute no-account constraint, "student content stays client-side", and "no
server-side database". Treat it as a fork in the road, not a backlog item.

Refer to a constraint or an invariant by what it says, not only by its number.
Both lists are numbered, so "constraint 3" and "invariant 3" are different rules
that read alike — and a number shifts the moment a row is inserted above it.

## Project layout

Full tree is in the README. The short version:

| Task | File |
|---|---|
| Change what the AI is asked | `src/lib/ai/prompts.ts` |
| Add/remove a model or provider | `src/lib/config.ts` + `src/lib/ai/providers/` |
| Routing between BYOK and the shared key | `src/lib/ai/client.ts` |
| Rule-based ATS checks | `src/lib/ats.ts` |
| Rule-based profile gap checks | `src/lib/profile-gaps.ts` |
| Trending sources | `src/lib/trending.ts` |
| LinkedIn PDF parsing | `src/lib/profile-parser.ts` |
| Browser storage & TTL | `src/lib/db.ts`, `src/lib/keys.ts` |
| Shared-key limits | `src/lib/ratelimit.ts` |
| Shared UI primitives | `src/components/ui.tsx` |

## Commands

```bash
nvm use            # Node 22 (.nvmrc)
npm install        # postinstall copies the pdf.js worker into public/
npm run dev        # http://localhost:3000
npx tsc --noEmit   # types
npm run lint       # eslint
npm run build      # production build — must pass before merge
```

## The codebase map

`graphify-out/` holds a generated knowledge graph of this repo — an interactive `graph.html`, a plain-language `GRAPH_REPORT.md`, and `graph.json` for tooling. It exists so a newcomer, human or AI, can see the shape of the project without reading every file. Regenerate it with the `graphify` skill.

It is a **snapshot committed to git**, which means it can lie. Two rules keep it honest:

- **Regenerate after a docs change, not alongside one.** This has already gone wrong once: a graph merged in the same PR as a CLAUDE.md edit was extracted before that edit landed, so the committed map described ten invariants while the file beside it had twelve — and named "Ten Hard Invariants" as the most connected node in the repo.
- **Check one fact before committing it.** Open `GRAPH_REPORT.md`, read the top god node, and confirm it matches the code you are shipping. A map whose most prominent claim is wrong is worse than no map.

A stale graph is documentation drift, not a build artefact that will fix itself.

## Conventions

- **TypeScript strict.** No `any`, no custom types duplicating SDK types.
- **Server Components by default**; add `"use client"` only where browser APIs or state are needed.
- **Browser-only reads happen after hydration.** Use `useIsClient()` before reading `localStorage` / `sessionStorage` during render, and never call `setState` synchronously inside `useEffect` (the lint rule will reject it).
- **Provider SDKs are lazy-loaded** in `client.ts` so a Gemini user never downloads the other three bundles. Keep it that way when adding a provider.
- **Comments explain why, not what.** Most code should not need one.
- **Copy is written for a 19-year-old in a hurry.** Short sentences, no jargon, no exclamation marks.
- **Phones are the default.** Most students open this on a phone. Check every change at 375px: navigation stays reachable, banners stay small, upload zones say "tap" rather than "drop", and nothing scrolls sideways.
- **Model ids go stale.** `src/lib/config.ts` holds a curated list per provider, but Settings can also fetch the live list with the student's key. When a default stops working, check the provider's docs rather than guessing an id.
- **Branch and PR for every change** (`feat/…`, `fix/…`, `docs/…`, `chore/…`). Never commit to `main`; `main` auto-deploys to production.
- **Never delete a branch without the owner asking.**

## Pre-merge verification checklist

Run this before merging any PR, including your own. Report results honestly —
if something fails, say so rather than merging.

**1. It builds and passes checks**
```bash
npx tsc --noEmit && npm run lint && npm run build
```

**2. The invariants above still hold.** For any diff touching `src/lib/ai/`, `src/lib/keys.ts`, `src/lib/db.ts` or the API routes, check explicitly:
```bash
# A student's key must never leave the browser except to the provider
grep -rn "apiKey\|api_key" src/app/api/          # should only reference process.env
grep -rn "console.log" src/app/api/              # request bodies must never be logged
grep -rn "dangerouslyAllowBrowser" src/lib/ai/   # only inside providers/, never server-side
```

**3. No secrets are committed**
```bash
git diff origin/main --stat
git diff origin/main | grep -nE "AIza|gsk_|sk-ant-|sk-[A-Za-z0-9]{20}"   # must return nothing
```

**4. It works in a browser, not just in CI.** Start the dev server and *use* the changed path end to end — type into the fields, click the buttons, read what renders. Reading the page's markup is not using it. Every user-visible bug in this repo's history passed `tsc`, `eslint` and `build`: a stuck loading spinner, a mis-parsed PDF section, an error only visible after clicking Generate, a Save button that unmounted as you typed, and an ATS rule that scored a well-written profile at zero.

**4a. Check the rendered result, not the edit.** A find-and-replace that matches nothing reports success and changes nothing. After editing, confirm the new behaviour in the running app — and if a change does not appear, suspect a stale build before suspecting the logic.

**4b. Test on real data, not only on a fixture you wrote.** The synthetic profile in this repo's history was clean, comma-separated and short. A real LinkedIn export broke the location regex, truncated multi-line headlines, reported 24 roles for six, and used `✔️` as a bullet glyph. Fixtures confirm what you expected; real files find what you did not.

**5. The no-key path still behaves.** With no API key saved and no shared key configured, the app must say so up front (`SetupBanner`) rather than failing at the moment of generation.

**6. Privacy claims still true.** If the change adds a network call, confirm the README's privacy table and `docs/PRIVACY.md` are still accurate. Update them in the same PR if not.

**7. Docs updated.** New feature → README feature table. New file → README folder tree. New env var → `.env.example` *and* the README deploy table.

**8. The codebase map is not stale.** If this PR changed `CLAUDE.md`, the README, or the shape of `src/`, regenerate `graphify-out/` — **after** those edits are final, in a separate commit or PR, never in the same pass that writes them. Extraction reads the files as they were when it started, so a graph built alongside a docs change describes the version before it.

## When reviewing someone else's PR

Be direct about real problems and quiet about style preferences. Priority order:

1. Does it break an invariant? → request changes, and name the invariant in the words the table uses.
2. Does it leak a secret or student data? → request changes immediately.
3. Does it break the free-to-host constraint (new paid service, new always-on server)? → request changes.
4. Does it build and work? → run the checklist.
5. Is the copy honest and student-readable? → suggest wording.
6. Everything else is a suggestion, not a blocker.

Do not merge a PR you have not verified. Do not approve on the basis that CI is green — CI only checks types, lint and build.

## Enabling automated Claude review (optional)

`.github/workflows/claude-review.yml` runs Claude Code on every PR, but only if an
`ANTHROPIC_API_KEY` repository secret exists. Without the secret the job skips
cleanly, so forks are unaffected. Note this consumes paid API credit from
whoever owns the key — it is off by default for that reason.
