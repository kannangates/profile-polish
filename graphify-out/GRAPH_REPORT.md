# Graph Report - .  (2026-09-29)

## Corpus Check
- 8 files · ~31,243 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 573 nodes · 1084 edges · 39 communities (34 shown, 5 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.83)
- Token cost: 93,144 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Makeover Report & Counts|Makeover Report & Counts]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Banner Route & Rate Limits|Banner Route & Rate Limits]]
- [[_COMMUNITY_Banner Maker & Profile Page|Banner Maker & Profile Page]]
- [[_COMMUNITY_Founding Constraints & Governance|Founding Constraints & Governance]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Copy, Markdown & Output Panel|Copy, Markdown & Output Panel]]
- [[_COMMUNITY_Contributing & Deploying|Contributing & Deploying]]
- [[_COMMUNITY_Types & Provider Adapters|Types & Provider Adapters]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Profile Optimizer Features|Profile Optimizer Features]]
- [[_COMMUNITY_Build Checks & CI|Build Checks & CI]]
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_Shared Key & Demo Switch|Shared Key & Demo Switch]]
- [[_COMMUNITY_Banner Paid Exception|Banner Paid Exception]]
- [[_COMMUNITY_Prompt Rules & Test Policy|Prompt Rules & Test Policy]]
- [[_COMMUNITY_Privacy & Storage Invariants|Privacy & Storage Invariants]]
- [[_COMMUNITY_Verification Checklist|Verification Checklist]]
- [[_COMMUNITY_Photo Rule & Banner Data Flow|Photo Rule & Banner Data Flow]]
- [[_COMMUNITY_Features & Trending Docs|Features & Trending Docs]]
- [[_COMMUNITY_Banner Maker Files|Banner Maker Files]]
- [[_COMMUNITY_IndexedDB Storage|IndexedDB Storage]]
- [[_COMMUNITY_File Drop & Generation Hook|File Drop & Generation Hook]]
- [[_COMMUNITY_Generate Route & Demo Switch|Generate Route & Demo Switch]]
- [[_COMMUNITY_ATS Checks|ATS Checks]]
- [[_COMMUNITY_Server Data & Limitations|Server Data & Limitations]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Browser Storage & Drafts|Browser Storage & Drafts]]
- [[_COMMUNITY_Profile Gap Checks|Profile Gap Checks]]
- [[_COMMUNITY_ATS Feature & Roadmap|ATS Feature & Roadmap]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 20 edges
2. `Hard invariants (thirteen, never break these)` - 19 edges
3. `compilerOptions` - 17 edges
4. `Folder structure` - 16 edges
5. `Project layout (task to file map)` - 15 edges
6. `Pre-merge verification checklist` - 14 edges
7. `CLAUDE.md — repo instructions for AI and human contributors` - 13 edges
8. `Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day)` - 13 edges
9. `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)` - 12 edges
10. `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `What you should tell students` --conceptually_related_to--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  docs/PRIVACY.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Ground rule 1: zero cost stays zero cost` --implements--> `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Ground rule 2: privacy is the product` --references--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Banner maker implementation files and limits** — readme_feature_linkedin_banner, readme_api_banner_route, readme_banner_generator_component, readme_banner_ts, readme_env_banner_enabled, readme_env_banner_model, readme_env_banner_daily_limit_per_device, readme_env_banner_daily_limit_global [EXTRACTED 1.00]
- **Profile Optimizer makeover outputs: score, section cards, skill chips, photo/banner advice, Services card, Everything else** — readme_makeover_score_quick_wins, readme_makeover_section_cards, readme_skill_chips, readme_text_only_photo_banner_advice, readme_services_page_card, readme_everything_else_fixes [INFERRED 0.85]
- **Terms of the LinkedIn banner paid exception** — claude_paid_exception_linkedin_banners, claude_banner_term_only_the_banner, claude_banner_term_capped_server_side, claude_banner_term_cheapest_adequate_model, claude_banner_term_opt_in_off_without_billing, claude_banner_term_minimal_data, claude_constraint_1_zero_host_cost [EXTRACTED 1.00]
- **npm test as a merge gate: commands, checklist 1, PR template item, CI step** — claude_npm_test_command, claude_checklist_1_builds_and_passes_checks, readme_npm_test_command, _github_pull_request_template_checks_pass_item, workflows_ci_npm_test_step [INFERRED 0.85]
- **Shared-key demo switch: env var, shared-key.ts, /api/generate proxy, BYOK fallback, workshop note** — readme_env_shared_key_enabled, readme_shared_key_ts, claude_src_lib_shared_key_ts, readme_api_generate_shared_key_proxy, readme_byok_direct_from_browser, readme_workshop_demo_env_note [INFERRED 0.85]
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]

## Communities (39 total, 5 thin omitted)

### Community 0 - "BYOK Routing & Errors"
Cohesion: 0.08
Nodes (39): friendlyMessage(), generate(), GenerateOptions, listModels(), loaders, modelListers, QuotaError, geistMono (+31 more)

### Community 1 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (41): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+33 more)

### Community 2 - "Makeover Report & Counts"
Cohesion: 0.11
Nodes (24): CharCount(), SectionCard(), ServicesForm(), UpdatedBlock(), charCount(), Field, Fix, isMakeover() (+16 more)

### Community 3 - "Onboarding & File Parsing"
Cohesion: 0.10
Nodes (21): Mode, clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText() (+13 more)

### Community 4 - "Banner Route & Rate Limits"
Cohesion: 0.15
Nodes (23): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), BANNER_STYLES, BannerRequest (+15 more)

### Community 5 - "Banner Maker & Profile Page"
Cohesion: 0.13
Nodes (15): BannerGenerator(), Status, MakeoverReport(), ProfileGaps(), Card(), Label(), LinkButton(), PageHeader() (+7 more)

### Community 6 - "Founding Constraints & Governance"
Cohesion: 0.16
Nodes (21): Changing an invariant, CLAUDE.md — repo instructions for AI and human contributors, Constraint 2: student data must never reach the server, Constraint 3: usable in under two minutes with no account, Convention: copy is written for a 19-year-old in a hurry, Hard invariants (thirteen, never break these), Invariant 10: don't oversell, Invariant 11: never claim something was saved unless storage confirms it (+13 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 8 - "Copy, Markdown & Output Panel"
Cohesion: 0.15
Nodes (9): CopyButton(), Markdown(), OutputPanel(), Props, Button(), TYPE_LABEL, useDrafts(), toLinkedInText() (+1 more)

### Community 9 - "Contributing & Deploying"
Cohesion: 0.14
Nodes (19): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Deploy your own (free), Fork it and make it your own, Getting started (students), Lab computer tip: leave Remember my keys off and clear all data, Limitation: no LinkedIn API, heuristic PDF parsing (+11 more)

### Community 10 - "Types & Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 11 - "App Shell & Banners"
Cohesion: 0.17
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), Badge(), purgeExpired(), hasAnyKey() (+1 more)

### Community 12 - "Profile Optimizer Features"
Cohesion: 0.21
Nodes (17): Everything else: up to five fixes, each with a reason and click-by-click LinkedIn steps, Feature: Profile Optimizer (gap check, section-by-section AI makeover, Services card, Everything else fixes, live LinkedIn character counts), Tick box: I offer freelance or consulting services, Makeover card: your original and the rewrite with its own Copy button, MakeoverReport component (section cards for the profile review), Makeover score and quick wins, Makeover cards: headline (3 options), About, each experience role, skills, src/lib/makeover.ts (parses the profile review's @@ markers into sections) (+9 more)

### Community 13 - "Build Checks & CI"
Cohesion: 0.18
Nodes (16): Pull Request Checklist Template, Checklist item: npx tsc --noEmit, npm run lint, npm test and npm run build pass, .github/workflows/claude-review.yml (optional automated review), Checklist 1: it builds and passes checks (tsc, lint, npm test, build), Checklist 4: it works in a browser, not just in CI, CI only checks types, lint, the parser and prompt tests, and the build (not what a student sees), Commands (nvm use, npm install, dev, tsc, lint, npm test, build), npm test (parser + prompt tests, node:test, no extra packages) (+8 more)

### Community 14 - "AI Prompts"
Cohesion: 0.24
Nodes (12): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+4 more)

### Community 15 - "Trending Topics Feed"
Cohesion: 0.20
Nodes (11): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, Filter (+3 more)

### Community 16 - "Coding Conventions"
Cohesion: 0.16
Nodes (14): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default (+6 more)

### Community 17 - "Shared Key & Demo Switch"
Cohesion: 0.20
Nodes (14): Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing, src/lib/shared-key.ts (the shared-key demo switch, SHARED_KEY_ENABLED), Shared-Key Data Handling Disclosure, What you should tell students, /api/generate shared-key proxy, How it works (browser vs serverless diagram), BYOK: bring your own free key, called direct from the browser, SHARED_KEY_ENABLED (default on; false ends the free demo, students then need their own key; banner maker keeps its own switch) (+6 more)

### Community 18 - "Banner Paid Exception"
Cohesion: 0.32
Nodes (13): Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true), Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception), Invariant 2 exception: banner endpoint receives only target role and optional tagline, stores nothing, Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint) (+5 more)

### Community 19 - "Prompt Rules & Test Policy"
Cohesion: 0.23
Nodes (13): Invariant 12: anything checkable without a model is checked without one, Invariant 7: prompts must forbid invention, Project layout (task to file map), Rule: add a test in tests/ for every new answer shape when changing prompts.ts, makeover.ts or linkedin-text.ts, src/components/ui.tsx (shared UI primitives), src/lib/ai/prompts.ts (prompt builders), src/lib/ai/providers/ (per-provider adapters), src/lib/ats.ts (rule-based ATS checks) (+5 more)

### Community 20 - "Privacy & Storage Invariants"
Cohesion: 0.17
Nodes (12): Checklist 2: the invariants still hold, Checklist 6: privacy claims still true, docs/PRIVACY.md, DRAFT_TTL_MS (48 hour expiry), Invariant 4: everything in the browser has a TTL, Invariant 5: keys default to sessionStorage, Invariant 9: no analytics that capture page content or user input, src/lib/db.ts (Dexie schema, TTL purge) (+4 more)

### Community 21 - "Verification Checklist"
Cohesion: 0.18
Nodes (11): Checklist 3: no secrets are committed, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote, Checklist 5: the no-key path still behaves, Invariant 8: no secret in client code or commits, PR review priority order, Pre-merge verification checklist, SetupBanner (no-key warning) (+3 more)

### Community 22 - "Photo Rule & Banner Data Flow"
Cohesion: 0.33
Nodes (11): Invariant 13: no generated or edited photos of people, Banner maker data flow (role, tagline, style via /api/banner to Gemini; image straight back; nothing stored or logged), src/app/api/banner/route.ts (LinkedIn banner maker, opt-in, 2/day, no-store), BANNER_DAILY_LIMIT_GLOBAL (default 50; caps worst-case bill ~$1.70/day), BANNER_DAILY_LIMIT_PER_DEVICE (default 2; failed attempts don't count), BANNER_ENABLED (default off; needs billing on GEMINI_API_KEY, ~$0.034 per banner), BANNER_MODEL (default gemini-3.1-flash-lite-image, cheapest Gemini image model), Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day) (+3 more)

### Community 23 - "Features & Trending Docs"
Cohesion: 0.20
Nodes (10): Checklist 7: docs updated, /api/trending cached trend feed, Credits and trend data sources, Feature: Message Writer, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Post Generator, Features table, Other hosts (Netlify, Cloudflare Pages via OpenNext; BYOK-only by deleting /api/generate) (+2 more)

### Community 24 - "Banner Maker Files"
Cohesion: 0.24
Nodes (10): Layout row: LinkedIn banner maker (the paid exception), src/components/BannerGenerator.tsx (banner maker UI), src/lib/banner.ts (banner maker helpers), Add your own feature (page + prompt recipe), BannerGenerator component (style, text, preview, download), src/lib/banner.ts (banner size, styles, 21:9 to 4:1 crop via OffscreenCanvas), Folder structure, OutputPanel component (streaming result, copy, save, quota CTA) (+2 more)

### Community 25 - "IndexedDB Storage"
Cohesion: 0.27
Nodes (7): clearEverything(), db, ProfilePolishDB, saveDraft(), saveOffersServices(), Draft, Profile

### Community 26 - "File Drop & Generation Hook"
Cohesion: 0.31
Nodes (5): GenerateResult, FileDrop(), Props, useGenerate(), ResumePage()

### Community 27 - "Generate Route & Demo Switch"
Cohesion: 0.33
Nodes (3): NO_STORE, SHARED_KEY_MESSAGES, SharedKeyState

### Community 28 - "ATS Checks"
Cohesion: 0.28
Nodes (7): AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP, tokenize()

### Community 29 - "Server Data & Limitations"
Cohesion: 0.25
Nodes (8): Anonymous Device Id and IP Counting (shared-key and banner limits), What the Server Sees, Anonymous device id (localStorage, header-only, for shared-key and banner daily limits), Limitation: AI can be wrong ([add number] markers), Limitation: free tiers have per-key daily limits, Limitation: shared key is best-effort without Upstash, Limitations (honest list), Upstash Redis rate limiting (optional)

### Community 30 - "Codebase Map Honesty"
Cohesion: 0.33
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 31 - "Browser Storage & Drafts"
Cohesion: 0.38
Nodes (7): What the Browser Stores, 48-hour auto-clear of profile and drafts, Feature: My Drafts (48-hour countdown, Markdown export), IndexedDB (Dexie) browser storage, Limitation: browser storage can be cleared, Privacy model table, Privacy row: generated banner lives in page memory, never stored

### Community 32 - "Profile Gap Checks"
Cohesion: 0.43
Nodes (6): analyseProfile(), Gap, gapsToText(), hasCustomUrl(), rolesWithoutDescription(), words()

### Community 33 - "ATS Feature & Roadmap"
Cohesion: 0.29
Nodes (7): Feature: Resume ATS Check, Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator, Roadmap: cross-device sync, Roadmap ideas, Roadmap: Hindi / Tamil / Telugu output option, Rule-based ATS score (13 checks, zero AI calls)

## Knowledge Gaps
- **134 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `require`, `pkg` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Contributing & Deploying` to `ATS Feature & Roadmap`, `Build Checks & CI`, `Shared Key & Demo Switch`, `Features & Trending Docs`, `Banner Maker Files`, `Server Data & Limitations`, `Codebase Map Honesty`, `Browser Storage & Drafts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Spinner()` connect `Banner Maker & Profile Page` to `BYOK Routing & Errors`, `Makeover Report & Counts`, `Onboarding & File Parsing`, `Copy, Markdown & Output Panel`, `Trending Topics Feed`, `File Drop & Generation Hook`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Founding Constraints & Governance` to `Build Checks & CI`, `Coding Conventions`, `Banner Paid Exception`, `Prompt Rules & Test Policy`, `Verification Checklist`, `Codebase Map Honesty`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.07982583454281568 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `Makeover Report & Counts` be split into smaller, more focused modules?**
  _Cohesion score 0.11491935483870967 - nodes in this community are weakly interconnected._