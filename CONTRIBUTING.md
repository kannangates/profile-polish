# Contributing to ProfilePolish

Thanks for helping students! This project is intentionally small and free to run, so contributions that keep it that way are the most welcome.

## Ground rules

1. **Zero cost stays zero cost.** Don't add services that need a card, and don't add server-side state (databases, auth) without a discussion first.
2. **Privacy is the product.** Student profiles, resumes, drafts and API keys must never reach our server. BYOK calls go browser → provider. If a change makes that untrue, it won't be merged.
3. **No direct DOM manipulation.** Drive the UI through React state. The one exception is a detached `<a>` for downloads.
4. **Keep prompts honest.** Prompts must forbid inventing achievements, numbers or skills the student didn't provide.

## Development

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env.local   # optional shared key
npm run dev
```

Before opening a PR:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Branching

Work on a branch (`feat/…`, `fix/…`, `docs/…`) and open a PR against `main`. `main` deploys automatically, so never commit to it directly.

## Where things live

| Task | File |
|---|---|
| Change a prompt | `src/lib/ai/prompts.ts` |
| Add/remove a model or provider | `src/lib/config.ts` (+ an adapter in `src/lib/ai/providers/`) |
| ATS rules | `src/lib/ats.ts` |
| Trending sources | `src/lib/trending.ts` |
| LinkedIn PDF parsing heuristics | `src/lib/profile-parser.ts` |
| Rate limits for the shared key | `src/lib/ratelimit.ts` |

## Adding a provider

1. Create `src/lib/ai/providers/<name>.ts` exporting a `StreamFn` and a `ListModelsFn` (see `gemini.ts`). Use the vendor's official SDK with browser access enabled.
2. Register it in `src/lib/ai/client.ts` (`loaders` and `modelListers`).
3. Add it to `PROVIDERS` in `src/lib/config.ts` with a curated model list and key URL.

## Reporting security issues

Please open a private security advisory on GitHub rather than a public issue.
