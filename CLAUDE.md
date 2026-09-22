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
| 3 | **No server-side database, no accounts, no auth.** | Holding resumes and keys server-side without real auth is a liability; adding auth breaks constraint 3. |
| 4 | **Everything in the browser has a TTL.** Drafts and the parsed profile expire after `DRAFT_TTL_MS` (48 h) and are purged on app load. | Shared computers. |
| 5 | **Keys default to `sessionStorage`.** `localStorage` is opt-in behind the "Remember on this device" toggle, with a shared-computer warning. | Lab machines. |
| 6 | **No direct DOM manipulation.** Drive UI through React state. The single allowed exception is a detached `<a>` element for file downloads (see `drafts/page.tsx`). | React owns the DOM; mutating it underneath causes bugs that only appear in production builds. |
| 7 | **Prompts must forbid invention.** Every prompt tells the model not to invent achievements, numbers, companies or skills, and to mark gaps as `[add number]`. | Students paste this into real applications. |
| 8 | **No secret may be added to client code or committed.** Server secrets live in Vercel env vars only; `.env*` is git-ignored. | Obvious, but easy to slip. |
| 9 | **No analytics that capture page content or user input.** | See `docs/PRIVACY.md`. |
| 10 | **Don't oversell.** Copy describes what the app does (polish, draft, check) — never promises replies, interviews or jobs. | The app was renamed from "CareerLift" for exactly this reason. |

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

## Conventions

- **TypeScript strict.** No `any`, no custom types duplicating SDK types.
- **Server Components by default**; add `"use client"` only where browser APIs or state are needed.
- **Browser-only reads happen after hydration.** Use `useIsClient()` before reading `localStorage` / `sessionStorage` during render, and never call `setState` synchronously inside `useEffect` (the lint rule will reject it).
- **Provider SDKs are lazy-loaded** in `client.ts` so a Gemini user never downloads the other three bundles. Keep it that way when adding a provider.
- **Comments explain why, not what.** Most code should not need one.
- **Copy is written for a 19-year-old in a hurry.** Short sentences, no jargon, no exclamation marks.
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

**4. It works in a browser, not just in CI.** Start the dev server and exercise the changed path end to end. A page that compiles is not a page that works — several bugs in this repo's history (a stuck loading spinner, a mis-parsed PDF section, an error only visible after clicking Generate) passed both `tsc` and `eslint`.

**5. The no-key path still behaves.** With no API key saved and no shared key configured, the app must say so up front (`SetupBanner`) rather than failing at the moment of generation.

**6. Privacy claims still true.** If the change adds a network call, confirm the README's privacy table and `docs/PRIVACY.md` are still accurate. Update them in the same PR if not.

**7. Docs updated.** New feature → README feature table. New file → README folder tree. New env var → `.env.example` *and* the README deploy table.

## When reviewing someone else's PR

Be direct about real problems and quiet about style preferences. Priority order:

1. Does it break an invariant? → request changes, cite the number.
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
