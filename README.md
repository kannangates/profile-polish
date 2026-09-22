<div align="center">

# ● ProfilePolish

**Free, private LinkedIn & resume coach for college students.**

Polish your profile · draft messages and posts · check your resume against ATS rules

Runs in your browser · Bring your own free API key · No sign-up · No database · MIT licensed

### 👉 [**Use it now — profilepolish-app.vercel.app**](https://profilepolish-app.vercel.app)

[![CI](https://github.com/kannangates/profile-polish/actions/workflows/ci.yml/badge.svg)](https://github.com/kannangates/profile-polish/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Getting started](#getting-started-students) · [Deploy your own](#deploy-your-own-free) · [How it works](#how-it-works) · [Privacy](#privacy-model) · [Contributing](CONTRIBUTING.md)

</div>

---

## Why this exists

Most "AI LinkedIn tools" cost ₹500–2,000 a month and keep your profile on their servers. Students don't need that. ProfilePolish is a static-ish Next.js app that:

- reads the **PDF export LinkedIn already gives you** (no scraping, no LinkedIn login),
- talks to the AI provider **directly from your browser with your own free key** (Gemini and Groq have free tiers, no card),
- keeps everything — profile, resume, drafts, keys — **in your browser only**, auto-clearing after 48 hours,
- costs the person hosting it **₹0** (Vercel Hobby + optional free-tier shared key).

> **The name is the promise.** ProfilePolish polishes what you write — your profile, messages, posts and resume. It doesn't apply for jobs, contact recruiters for you, or guarantee interviews. Everything it produces is a draft for you to read, edit and use.

## Features

| Page | What you get |
|---|---|
| **Onboarding** | Drag-drop LinkedIn's *Save to PDF* export. Parsed in the browser into name / headline / about / experience / education / skills. Or paste text. Or skip and continue without a profile. |
| **Profile Optimizer** | Score out of 100, quick wins, 3 headline rewrites, a full About rewrite, bullet-by-bullet experience rewrites, skills to add, photo/banner/URL tips. Accepts a screenshot for vision models. |
| **Message Writer** | Connection request, referral ask, alumni outreach, post-interview follow-up, thank-you, cold message to a recruiter. Three variants each (short / warm / direct) with a "when to send" tip. |
| **Post Generator** | Live trending topics from Google Trends (India), Hacker News and Dev.to, plus evergreen student topics. Pick a topic, add your angle, choose a style → 3 hooks, a full post, hashtags, best time to post. |
| **Resume ATS Check** | Instant rule-based score (13 checks, zero AI calls): contact info, standard headings, length, action verbs, metrics, clichés, table/column artefacts, and keyword match against a pasted job description. Then an AI review with keyword gaps and before/after bullet rewrites, or a full one-page rewrite. PDF, DOCX and TXT. |
| **My Drafts** | Everything you save, with a 48-hour countdown. Export all to Markdown. |
| **Settings** | Step-by-step instructions for getting a free key from each provider, plus bring-your-own-key for **Google Gemini, Groq, OpenAI, Anthropic Claude**. Model dropdown per provider (curated list + "Load models from provider" for the live list + custom id). Session-only keys by default; opt-in "remember on this device"; one-click "clear all my data". |

## Getting started (students)

1. Open **[profilepolish-app.vercel.app](https://profilepolish-app.vercel.app)**.
2. On LinkedIn (web, not the mobile app): your profile → **More** (or **Resources**) → **Save to PDF**.
3. Drop that PDF on the first screen. Check the preview, click **Looks good**.
4. Go to **Settings** → open **"How do I get this key?"** under Google Gemini. It walks you through it step by step (free, no credit card, about a minute). Paste the key, click **Save**.
   - Or use the app's shared free key if the host set one up — it's limited to a few requests per day per person. Settings tells you whether this deployment has one.
5. Use any page. Copy the result straight into LinkedIn or your resume.

> **On a college lab computer?** Leave "Remember my keys" off (the default) and click **Clear all my data** in Settings before you leave.

## Deploy your own (free)

You need a GitHub account and a Vercel account (free, sign in with GitHub). No card anywhere.

1. **Fork** this repo (or push a copy to your own GitHub).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Next.js is auto-detected; the defaults are correct.
3. *(Optional but recommended)* Add environment variables so students without their own key still get a few free requests a day:

   | Variable | What it is |
   |---|---|
   | `GEMINI_API_KEY` | A free key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Only used server-side, only for students who haven't added their own key. |
   | `SHARED_MODEL` | Default `gemini-3.5-flash-lite` (most generous free quota). |
   | `SHARED_DAILY_LIMIT_PER_DEVICE` | Default `10`. Requests per student per day on the shared key. |
   | `SHARED_DAILY_LIMIT_GLOBAL` | Default `200`. Keep this under your Gemini free-tier daily quota. |
   | `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Optional. A free [Upstash](https://upstash.com) Redis makes the limits reliable across serverless instances. Without it, limits are in-memory per instance (fine for a small pilot). |

4. Click **Deploy**. You get a `https://<name>.vercel.app` URL to share. Every merge to `main` redeploys automatically.

> The official instance runs at [profilepolish-app.vercel.app](https://profilepolish-app.vercel.app) on Vercel's free Hobby plan — no card, no paid add-ons.

<details>
<summary>Other hosts</summary>

The app needs two small server routes (`/api/generate` for the shared key and `/api/trending` for the cached feed), so it can't be a purely static site. Netlify and Cloudflare Pages (via the OpenNext adapter) both work on their free tiers. If you don't want a shared key at all, you can delete `src/app/api/generate` and the app becomes BYOK-only.
</details>

## Run locally

Requires Node 20+ (`.nvmrc` pins 22).

```bash
git clone https://github.com/kannangates/profile-polish.git
cd profile-polish
npm install
cp .env.example .env.local     # optional: add a shared GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000.

```bash
npx tsc --noEmit   # types
npm run lint       # eslint
npm run build      # production build
```

## How it works

```
┌────────────── Browser (student's device) ──────────────┐
│  LinkedIn PDF ─► pdf.js ─► profile-parser ─► IndexedDB  │
│  Resume ─► pdf.js / mammoth ─► ats.ts (rule checks)     │
│  Prompt builder (prompts.ts)                            │
│        │                                                │
│        ├─ has own key? ──► provider SDK ──► Gemini/Groq/│
│        │                   (direct, streamed)  OpenAI/  │
│        │                                       Claude   │
│        └─ no key ────────► POST /api/generate ─┐        │
└────────────────────────────────────────────────┼────────┘
                                                 ▼
                               ┌─── Vercel serverless (yours) ───┐
                               │ /api/generate: shared GEMINI key │
                               │   + per-device/IP/global limits  │
                               │ /api/trending: Google Trends RSS │
                               │   + HN + Dev.to, cached hourly   │
                               └──────────────────────────────────┘
```

**Tech:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Dexie (IndexedDB) · pdf.js · mammoth · official SDKs for `@google/genai`, `groq-sdk`, `openai`, `@anthropic-ai/sdk` (each lazy-loaded only when chosen) · `react-markdown` · Upstash Redis (optional).

### Folder structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx                 Onboarding (PDF upload → preview → save)
│   │   ├── layout.tsx               Root layout, fonts, metadata
│   │   ├── globals.css              Theme tokens (light/dark), markdown + form styles
│   │   ├── (app)/                   Authenticated-feeling shell (no auth — just layout)
│   │   │   ├── layout.tsx           Sidebar nav, profile chip, privacy banner
│   │   │   ├── profile/page.tsx     Profile Optimizer
│   │   │   ├── messages/page.tsx    Message Writer
│   │   │   ├── posts/page.tsx       Post Generator + trending feed
│   │   │   ├── resume/page.tsx      Resume ATS check & rewrite
│   │   │   ├── drafts/page.tsx      My Drafts (+ Markdown export)
│   │   │   └── settings/page.tsx    BYOK keys, model selection, data clearing
│   │   └── api/
│   │       ├── generate/route.ts    Shared-key proxy (streams text, no-store)
│   │       └── trending/route.ts    Trend feed endpoint
│   ├── components/
│   │   ├── AppShell.tsx             Layout + nav
│   │   ├── OutputPanel.tsx          Streaming result, copy, save draft, quota CTA
│   │   ├── useGenerate.ts           Hook: run/stop/stream state
│   │   ├── FileDrop.tsx             Drag-and-drop file input
│   │   ├── Markdown.tsx             react-markdown wrapper
│   │   ├── PrivacyBanner.tsx        "Everything stays in your browser" notice
│   │   ├── SetupBanner.tsx          "Add a free key" prompt when none is set
│   │   ├── SetupSteps.tsx           Per-provider key instructions
│   │   ├── CopyButton.tsx
│   │   └── ui.tsx                   Button, Card, Label, Badge, Spinner, PageHeader
│   └── lib/
│       ├── config.ts                App name, providers, model catalog, defaults
│       ├── types.ts                 Profile, Draft, GenerateRequest
│       ├── keys.ts                  Key storage (session/local), active provider, device id
│       ├── db.ts                    Dexie schema, TTL purge, save helpers
│       ├── hooks.ts                 useProfile / useDrafts (live queries)
│       ├── useIsClient.ts           Hydration-safe "am I in the browser" hook
│       ├── pdf.ts                   pdf.js + mammoth text extraction
│       ├── profile-parser.ts        Heuristics for LinkedIn's PDF layout
│       ├── ats.ts                   Rule-based ATS checks + JD keyword extraction
│       ├── trending.ts              Google Trends / HN / Dev.to fetchers
│       ├── ratelimit.ts             Upstash or in-memory daily counters
│       └── ai/
│           ├── prompts.ts           One prompt builder per feature
│           ├── client.ts            generate() + listModels(): BYOK direct or shared proxy
│           └── providers/           gemini.ts · groq.ts · openai.ts · anthropic.ts · types.ts
├── public/                          Static assets (pdf.js worker is copied here on install)
├── scripts/copy-pdf-worker.mjs      postinstall: copies pdf.worker.min.mjs into public/
├── docs/                            Extra documentation
├── .github/                         CI (typecheck + lint + build), optional Claude PR review, issue & PR templates
├── CLAUDE.md                        Invariants + pre-merge checklist for AI/human reviewers
├── .env.example                     All server env vars, documented
└── .nvmrc                           Node 22
```

## Fork it and make it your own

This is MIT licensed and built to be forked. Run it for your own college, rename it,
or add the feature you wish it had — you don't need permission, and you don't need
to contribute anything back.

**Make it yours in 5 minutes**

1. Fork the repo on GitHub, then `git clone` your fork and `npm install`.
2. Change the name and tagline in [`src/lib/config.ts`](src/lib/config.ts) (`APP_NAME`, `APP_TAGLINE`).
3. Change the colours in [`src/app/globals.css`](src/app/globals.css) — every colour is a CSS variable on `:root`, with a dark-mode block below it.
4. Import your fork at [vercel.com/new](https://vercel.com/new) and deploy. You now have your own free instance.

**Add your own feature**

Most features are one new page plus one new prompt. To add, say, a cover-letter writer:

1. Write the prompt builder in [`src/lib/ai/prompts.ts`](src/lib/ai/prompts.ts) — copy the shape of `messagePrompt`.
2. Create `src/app/(app)/cover-letter/page.tsx` — copy [`messages/page.tsx`](<src/app/(app)/messages/page.tsx>), which is the simplest full example: form on the left, `<OutputPanel>` on the right, `useGenerate()` in between.
3. Add it to the `NAV` array in [`src/components/AppShell.tsx`](src/components/AppShell.tsx).

That's it — streaming, copy, "save draft", error handling and the BYOK/shared-key routing all come from `useGenerate()` and `<OutputPanel>`. You don't touch the AI plumbing.

Other common changes: a new AI provider (`src/lib/ai/providers/` — see [CONTRIBUTING.md](CONTRIBUTING.md)), new ATS rules ([`src/lib/ats.ts`](src/lib/ats.ts)), new trending sources ([`src/lib/trending.ts`](src/lib/trending.ts)).

**Sending it back (optional)**

PRs are welcome. Read [CLAUDE.md](CLAUDE.md) first — it lists the ten invariants that keep the app free and private, and the checklist every PR is verified against before merge. Anything that respects those has a good chance of being merged.

## Privacy model

| Data | Where it lives | How long | Ever sent to our server? |
|---|---|---|---|
| Parsed LinkedIn profile | IndexedDB in your browser | 48 h | No |
| Resume text | React state (page memory) | Until you leave the page | No |
| Drafts | IndexedDB | 48 h (export to keep) | No |
| Your API keys | `sessionStorage` (default) or `localStorage` (opt-in) | Tab close / until removed | **Never** — BYOK requests go browser → provider |
| Prompts (your profile/resume text) | — | — | Only to the AI provider you chose. With the shared key, to our `/api/generate` which forwards to Gemini with `Cache-Control: no-store` and no logging. |
| Anonymous device id | `localStorage` | Until cleared | Yes, header only — used to rate-limit the shared key fairly |

Why direct-from-browser BYOK? Because then there is nothing on the server that *can* leak. The only secret the server holds is the host's own shared key.

## Models

Defaults (change in **Settings**, or in `src/lib/config.ts`):

| Provider | Default | Free? |
|---|---|---|
| Google Gemini | `gemini-3.8-flash` (switch to `gemini-3.5-flash-lite` if you hit quota) | Yes, no card |
| Groq | `openai/gpt-oss-120b` | Yes, no card |
| OpenAI | `gpt-5.6-luna` | Paid |
| Anthropic | `claude-haiku-4-5` | Paid |

Model ids change every few months. The **Load models from …** button in Settings pulls the live list from the provider with your key, so the dropdown never goes stale.

## Limitations (honest list)

- **No LinkedIn API.** LinkedIn doesn't let apps read profiles, so the PDF export is the supported path. The parser is heuristic — the AI always reads the full extracted text, so a mis-detected name doesn't hurt the suggestions.
- **Free tiers have limits.** Gemini/Groq free quotas are per-key per-day; when a student hits them the app tells them to wait or switch provider.
- **Shared key is best-effort.** Without Upstash, the in-memory limits reset whenever Vercel spins up a new instance.
- **Browser storage can be cleared** by the browser (private mode, low disk). The privacy banner says so; export important drafts.
- **AI can be wrong.** Prompts forbid inventing facts and mark unknown numbers as `[add number]`, but students should read before posting.

## Roadmap ideas

- Optional accounts + cross-device sync (Supabase free tier) — only if students ask
- Cover-letter generator reusing the resume + JD pipeline
- Hindi / Tamil / Telugu output option
- "Compare with a strong profile" mode using anonymised examples

## License

[MIT](LICENSE) — free to use, copy, modify and host for any college or student group. Attribution appreciated, not required.

## Credits

Built by [Kannan](https://github.com/kannangates) for students who can't afford paid career tools. Trend data from Google Trends, Hacker News (Algolia API) and Dev.to. Not affiliated with LinkedIn.
