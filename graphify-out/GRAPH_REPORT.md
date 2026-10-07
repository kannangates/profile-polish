# Graph Report - .  (2026-10-08)

## Corpus Check
- Corpus is ~33,826 words - fits in a single context window. You may not need a graph.

## Summary
- 597 nodes · 1222 edges · 33 communities (28 shown, 5 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 151 edges (avg confidence: 0.87)
- Token cost: 93,559 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Pages, UI & Prompts|Pages, UI & Prompts]]
- [[_COMMUNITY_BYOK Routing & Key Storage|BYOK Routing & Key Storage]]
- [[_COMMUNITY_Makeover Parser & Headline Scores|Makeover Parser & Headline Scores]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_API Routes, Banner & Limits|API Routes, Banner & Limits]]
- [[_COMMUNITY_Banner Exception & Invariants|Banner Exception & Invariants]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Rule-Based Checks & Optimizer|Rule-Based Checks & Optimizer]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Project Layout & Prompt Rules|Project Layout & Prompt Rules]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]
- [[_COMMUNITY_Browser Storage Invariants|Browser Storage Invariants]]
- [[_COMMUNITY_Features, Posts & Trending|Features, Posts & Trending]]
- [[_COMMUNITY_Getting Started & Forking|Getting Started & Forking]]
- [[_COMMUNITY_Build Checks & CI|Build Checks & CI]]
- [[_COMMUNITY_Demo Switch & No-Key Path|Demo Switch & No-Key Path]]
- [[_COMMUNITY_BYOK Privacy & Roadmap|BYOK Privacy & Roadmap]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Folder Map & Parser Tests|Folder Map & Parser Tests]]
- [[_COMMUNITY_ATS Rule Checks|ATS Rule Checks]]
- [[_COMMUNITY_CLAUDE.md Governance & Review|CLAUDE.md Governance & Review]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Limitations & Why It Exists|Limitations & Why It Exists]]
- [[_COMMUNITY_Accounts Fork in the Road|Accounts: Fork in the Road]]
- [[_COMMUNITY_Secrets & Pre-merge Checks|Secrets & Pre-merge Checks]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 23 edges
2. `Hard invariants (thirteen, never break these)` - 20 edges
3. `Folder structure` - 20 edges
4. `compilerOptions` - 17 edges
5. `Project layout (task to file map)` - 15 edges
6. `Pre-merge verification checklist` - 15 edges
7. `CLAUDE.md — repo instructions for AI and human contributors` - 14 edges
8. `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)` - 13 edges
9. `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)` - 12 edges
10. `Conventions` - 12 edges

## Surprising Connections (you probably didn't know these)
- `README codebase map section` --semantically_similar_to--> `A stale graph is documentation drift, not a build artefact`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `What you should tell students` --conceptually_related_to--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  docs/PRIVACY.md → CLAUDE.md
- `Post format: skimmable labelled lists for steps or results; the student's own numbers kept as given` --conceptually_related_to--> `Invariant 7: prompts must forbid invention`  [INFERRED]
  README.md → CLAUDE.md
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Roadmap: cross-device sync` --semantically_similar_to--> `Known candidate: optional accounts with cross-device sync`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Terms of the LinkedIn banner paid exception** — claude_paid_exception_linkedin_banners, claude_banner_term_only_the_banner, claude_banner_term_capped_server_side, claude_banner_term_cheapest_adequate_model, claude_banner_term_opt_in_off_without_billing, claude_banner_term_minimal_data, claude_constraint_1_zero_host_cost [EXTRACTED 1.00]
- **npm test as a merge gate: commands, checklist 1, PR template item, CI step** — claude_npm_test_command, claude_checklist_1_builds_and_passes_checks, readme_npm_test_command, _github_pull_request_template_checks_pass_item, workflows_ci_npm_test_step [INFERRED 0.85]
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]
- **Rule-based checks that run in the browser without a model** — readme_profile_gaps_panel, readme_rule_based_ats_score, readme_headline_option_scoring, claude_invariant_12_checked_without_a_model [INFERRED 0.95]
- **LinkedIn banner maker: UI, route, crop helper and its capped, opt-in env vars** — readme_feature_linkedin_banner, readme_banner_generator_component, readme_api_banner_route, readme_banner_ts, readme_env_banner_enabled, readme_env_banner_model, readme_env_banner_daily_limit_per_device, readme_env_banner_daily_limit_global [EXTRACTED 1.00]
- **The four small server routes the app needs** — readme_api_generate_shared_key_proxy, readme_api_status_route, readme_api_banner_route, readme_api_trending_route [EXTRACTED 1.00]

## Communities (33 total, 5 thin omitted)

### Community 0 - "Pages, UI & Prompts"
Cohesion: 0.06
Nodes (55): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+47 more)

### Community 1 - "BYOK Routing & Key Storage"
Cohesion: 0.08
Nodes (43): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+35 more)

### Community 2 - "Makeover Parser & Headline Scores"
Cohesion: 0.08
Nodes (34): CharCount(), MakeoverReport(), SectionCard(), ServicesForm(), UpdatedBlock(), bestOption(), HeadlineCheck, HeadlineRating (+26 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (41): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+33 more)

### Community 4 - "API Routes, Banner & Limits"
Cohesion: 0.09
Nodes (30): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), NO_STORE, POST() (+22 more)

### Community 5 - "Banner Exception & Invariants"
Cohesion: 0.12
Nodes (34): Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true), Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception), Invariant 13: no generated or edited photos of people, Invariant 2 exception: banner endpoint receives only target role and optional tagline, stores nothing (+26 more)

### Community 6 - "Onboarding & File Parsing"
Cohesion: 0.11
Nodes (22): Mode, OnboardingPage(), clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText() (+14 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 8 - "Rule-Based Checks & Optimizer"
Cohesion: 0.15
Nodes (19): Invariant 12: anything checkable without a model is checked without one, src/lib/ats.ts (rule-based ATS checks), src/lib/profile-gaps.ts (rule-based profile gap checks), Everything else: up to five fixes, each with a reason and click-by-click LinkedIn steps, Feature: Profile Optimizer (gap check, section-by-section AI makeover, headline options scored out of 100 with Best match, Services card, Everything else fixes, live LinkedIn character counts), Tick box: I offer freelance or consulting services, Headline option scoring: each of the three options scored out of 100 in the browser (role named and up front, skills from profile, length, no buzzwords, nothing left to fill in); strongest marked Best match; current headline scored alongside, Live character counts against LinkedIn's limits (headline 220, About 2,600, experience 2,000) (+11 more)

### Community 9 - "Coding Conventions"
Cohesion: 0.12
Nodes (18): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: copy is written for a 19-year-old in a hurry, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default, Convention: TypeScript strict, no any (+10 more)

### Community 10 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 11 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 12 - "Project Layout & Prompt Rules"
Cohesion: 0.17
Nodes (15): Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Invariant 7: prompts must forbid invention, Project layout (task to file map), src/components/ui.tsx (shared UI primitives), src/lib/ai/client.ts (BYOK vs shared-key routing), src/lib/ai/prompts.ts (prompt builders), src/lib/ai/providers/ (per-provider adapters) (+7 more)

### Community 13 - "Server Data Disclosure"
Cohesion: 0.20
Nodes (15): Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing, Anonymous Device Id and IP Counting (shared-key and banner limits), Shared-Key Data Handling Disclosure, What the Browser Stores, What the Server Sees, What you should tell students, 48-hour auto-clear of profile and drafts, Anonymous device id (localStorage, header-only, for shared-key and banner daily limits) (+7 more)

### Community 14 - "Browser Storage Invariants"
Cohesion: 0.19
Nodes (13): Checklist 2: the invariants still hold, Checklist 6: privacy claims still true, docs/PRIVACY.md, DRAFT_TTL_MS (48 hour expiry), Hard invariants (thirteen, never break these), Invariant 11: never claim something was saved unless storage confirms it, Invariant 4: everything in the browser has a TTL, Invariant 5: keys default to sessionStorage (+5 more)

### Community 15 - "Features, Posts & Trending"
Cohesion: 0.18
Nodes (13): Checklist 7: docs updated, /api/trending cached trend feed, How it works (browser vs serverless diagram: /api/generate with demo switch and limits, /api/status, /api/banner, /api/trending), Credits and trend data sources, Feature: Message Writer, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Post Generator (trending topics, 3 hooks, post written in the student's role, hashtags, image prompt with no people, best time to post), Features table (+5 more)

### Community 16 - "Getting Started & Forking"
Cohesion: 0.21
Nodes (13): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Feature: Settings (BYOK keys, models, clear all data), Fork it and make it your own, Getting started (students), Lab computer tip: leave Remember my keys off and clear all data, Load models from provider button (live model list) (+5 more)

### Community 17 - "Build Checks & CI"
Cohesion: 0.26
Nodes (12): Pull Request Checklist Template, Checklist item: npx tsc --noEmit, npm run lint, npm test and npm run build pass, Checklist 1: it builds and passes checks (tsc, lint, npm test, build), Checklist 4: it works in a browser, not just in CI, CI only checks types, lint, the automated tests in tests/, and the build (not what a student sees), Commands (nvm use, npm install, dev, tsc, lint, npm test, build), npm test (parser, prompt and demo-switch tests, node:test, no extra packages), Development setup and pre-PR checks (+4 more)

### Community 18 - "Demo Switch & No-Key Path"
Cohesion: 0.24
Nodes (12): Checklist 5: the no-key path and the demo-ended state still behave (SetupBanner up front; SHARED_KEY_ENABLED=false -> "The free demo has ended" in banner, Settings and generate), SetupBanner (no-key warning), src/lib/shared-key.ts (the shared-key demo switch, SHARED_KEY_ENABLED), src/app/api/status/route.ts (/api/status: is the shared-key demo on? read by SetupBanner and Settings), Deploy your own (free), SHARED_KEY_ENABLED (default on; false ends the free demo, students then need their own key; banner maker keeps its own switch), Official instance theprofilepolish.vercel.app and its aliases, Other hosts (four server routes: /api/generate, /api/status, /api/banner, /api/trending; Netlify, Cloudflare Pages via OpenNext; BYOK-only via SHARED_KEY_ENABLED=false or no GEMINI_API_KEY) (+4 more)

### Community 19 - "BYOK Privacy & Roadmap"
Cohesion: 0.20
Nodes (11): Constraint 2: student data must never reach the server, Invariant 1: BYOK calls go browser to provider directly, Add your own feature (page + prompt recipe), BYOK: bring your own free key, called direct from the browser, Feature: Resume ATS Check, OutputPanel component (streaming result, copy, save, quota CTA), Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator (+3 more)

### Community 20 - "Trending Topics Feed"
Cohesion: 0.27
Nodes (8): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, GET()

### Community 21 - "Folder Map & Parser Tests"
Cohesion: 0.42
Nodes (9): Rule: add a test in tests/ for every new answer shape when changing prompts.ts, makeover.ts or linkedin-text.ts, tests/ (real model answers that once broke the page), Folder structure, .github/ (CI: typecheck + lint + tests + build, optional Claude PR review, issue & PR templates), src/lib/headline-score.ts (rule-based score for each headline option, no AI call), src/lib/linkedin-text.ts (Markdown to plain text for LinkedIn's boxes, check-mark bullets, no markup), MakeoverReport component (section cards for the profile review), src/lib/makeover.ts (parses the profile review's @@ markers into sections) (+1 more)

### Community 22 - "ATS Rule Checks"
Cohesion: 0.28
Nodes (7): AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP, tokenize()

### Community 23 - "CLAUDE.md Governance & Review"
Cohesion: 0.33
Nodes (7): .github/workflows/claude-review.yml (optional automated review), CLAUDE.md — repo instructions for AI and human contributors, Naming rule: refer to a rule by what it says, not only by its number, PR review priority order, The three founding constraints, ANTHROPIC_API_KEY Gate Step, Claude review Job

### Community 24 - "Codebase Map Honesty"
Cohesion: 0.43
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 25 - "Limitations & Why It Exists"
Cohesion: 0.29
Nodes (7): Limitation: browser storage can be cleared, Limitation: free tiers have per-key daily limits, Limitation: no LinkedIn API, heuristic PDF parsing, Limitations (honest list), LinkedIn 'Save to PDF' export as the input path, Vercel Hobby zero-cost hosting, Why this exists

### Community 26 - "Accounts: Fork in the Road"
Cohesion: 0.53
Nodes (6): Changing an invariant, Constraint 3: usable in under two minutes with no account, Invariant 3: no server-side database, no accounts, no auth, Known candidate: optional accounts with cross-device sync, Ground rule 1: zero cost stays zero cost, Roadmap: cross-device sync

### Community 27 - "Secrets & Pre-merge Checks"
Cohesion: 0.33
Nodes (6): Checklist 3: no secrets are committed, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote, Invariant 8: no secret in client code or commits, Pre-merge verification checklist, Report security issues via private GitHub advisory

## Knowledge Gaps
- **134 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Getting Started & Forking` to `Coding Conventions`, `Server Data Disclosure`, `Features, Posts & Trending`, `Build Checks & CI`, `Demo Switch & No-Key Path`, `BYOK Privacy & Roadmap`, `Folder Map & Parser Tests`, `Codebase Map Honesty`, `Limitations & Why It Exists`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `CLAUDE.md Governance & Review` to `Banner Exception & Invariants`, `Coding Conventions`, `Project Layout & Prompt Rules`, `Browser Storage Invariants`, `Build Checks & CI`, `Folder Map & Parser Tests`, `Codebase Map Honesty`, `Accounts: Fork in the Road`, `Secrets & Pre-merge Checks`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Folder structure` connect `Folder Map & Parser Tests` to `Banner Exception & Invariants`, `Rule-Based Checks & Optimizer`, `Server Data Disclosure`, `Features, Posts & Trending`, `Getting Started & Forking`, `Demo Switch & No-Key Path`, `BYOK Privacy & Roadmap`, `CLAUDE.md Governance & Review`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages, UI & Prompts` be split into smaller, more focused modules?**
  _Cohesion score 0.06494269761974727 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Key Storage` be split into smaller, more focused modules?**
  _Cohesion score 0.08245981830887492 - nodes in this community are weakly interconnected._
- **Should `Makeover Parser & Headline Scores` be split into smaller, more focused modules?**
  _Cohesion score 0.07955596669750231 - nodes in this community are weakly interconnected._