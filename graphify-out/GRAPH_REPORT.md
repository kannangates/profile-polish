# Graph Report - .  (2026-09-29)

## Corpus Check
- 3 files · ~31,959 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 578 nodes · 1106 edges · 31 communities (26 shown, 5 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance, Banner Exception & CI|Governance, Banner Exception & CI]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Invariants, Test Policy & File Map|Invariants, Test Policy & File Map]]
- [[_COMMUNITY_Banner Route, Crop & Rate Limits|Banner Route, Crop & Rate Limits]]
- [[_COMMUNITY_Makeover Report & Counts|Makeover Report & Counts]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Contributing & Deploying|Contributing & Deploying]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Output Panel & Tool Pages|Output Panel & Tool Pages]]
- [[_COMMUNITY_Demo Switch & No-Key Path|Demo Switch & No-Key Path]]
- [[_COMMUNITY_Profile Page Components|Profile Page Components]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Messages & Shared Hooks|Messages & Shared Hooks]]
- [[_COMMUNITY_Photo Rule & Banner Maker|Photo Rule & Banner Maker]]
- [[_COMMUNITY_Copy & Markdown|Copy & Markdown]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_File Drop & ATS Checks|File Drop & ATS Checks]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Generate Route & Demo Switch|Generate Route & Demo Switch]]
- [[_COMMUNITY_Features & Docs Checklist|Features & Docs Checklist]]
- [[_COMMUNITY_Browser Storage & Drafts|Browser Storage & Drafts]]
- [[_COMMUNITY_ATS Feature & Roadmap|ATS Feature & Roadmap]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 20 edges
2. `Hard invariants (thirteen, never break these)` - 19 edges
3. `Folder structure` - 18 edges
4. `compilerOptions` - 17 edges
5. `Project layout (task to file map)` - 15 edges
6. `Pre-merge verification checklist` - 14 edges
7. `CLAUDE.md — repo instructions for AI and human contributors` - 13 edges
8. `Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day)` - 13 edges
9. `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)` - 12 edges
10. `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Ground rule 4: keep prompts honest` --references--> `Invariant 7: prompts must forbid invention`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Development setup and pre-PR checks` --conceptually_related_to--> `Checklist 1: it builds and passes checks (tsc, lint, npm test, build)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Shared-Key Data Handling Disclosure` --conceptually_related_to--> `Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing`  [INFERRED]
  docs/PRIVACY.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Banner maker implementation files and limits** — readme_feature_linkedin_banner, readme_api_banner_route, readme_banner_generator_component, readme_banner_ts, readme_env_banner_enabled, readme_env_banner_model, readme_env_banner_daily_limit_per_device, readme_env_banner_daily_limit_global [EXTRACTED 1.00]
- **Profile Optimizer makeover outputs: score, section cards, skill chips, photo/banner advice, Services card, Everything else** — readme_makeover_score_quick_wins, readme_makeover_section_cards, readme_skill_chips, readme_text_only_photo_banner_advice, readme_services_page_card, readme_everything_else_fixes [INFERRED 0.85]
- **Shared-key demo switch: env var, shared-key.ts, /api/generate proxy, BYOK fallback, workshop note** — readme_env_shared_key_enabled, readme_shared_key_ts, claude_src_lib_shared_key_ts, readme_api_generate_shared_key_proxy, readme_byok_direct_from_browser, readme_workshop_demo_env_note [INFERRED 0.85]
- **Terms of the LinkedIn banner paid exception** — claude_paid_exception_linkedin_banners, claude_banner_term_only_the_banner, claude_banner_term_capped_server_side, claude_banner_term_cheapest_adequate_model, claude_banner_term_opt_in_off_without_billing, claude_banner_term_minimal_data, claude_constraint_1_zero_host_cost [EXTRACTED 1.00]
- **npm test as a merge gate: commands, checklist 1, PR template item, CI step** — claude_npm_test_command, claude_checklist_1_builds_and_passes_checks, readme_npm_test_command, _github_pull_request_template_checks_pass_item, workflows_ci_npm_test_step [INFERRED 0.85]
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]

## Communities (31 total, 5 thin omitted)

### Community 0 - "Governance, Banner Exception & CI"
Cohesion: 0.05
Nodes (72): Pull Request Checklist Template, Checklist item: npx tsc --noEmit, npm run lint, npm test and npm run build pass, .github/workflows/claude-review.yml (optional automated review), Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true) (+64 more)

### Community 1 - "BYOK Routing & Errors"
Cohesion: 0.08
Nodes (41): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+33 more)

### Community 2 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (41): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+33 more)

### Community 3 - "Invariants, Test Policy & File Map"
Cohesion: 0.09
Nodes (38): Checklist 4b: test on real data, not only on a fixture you wrote, Invariant 12: anything checkable without a model is checked without one, Invariant 7: prompts must forbid invention, Layout row: LinkedIn banner maker (the paid exception), Project layout (task to file map), Rule: add a test in tests/ for every new answer shape when changing prompts.ts, makeover.ts or linkedin-text.ts, src/app/api/banner/route.ts (banner endpoint), src/components/ui.tsx (shared UI primitives) (+30 more)

### Community 4 - "Banner Route, Crop & Rate Limits"
Cohesion: 0.10
Nodes (29): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), BannerGenerator(), Status (+21 more)

### Community 5 - "Makeover Report & Counts"
Cohesion: 0.11
Nodes (24): CharCount(), SectionCard(), ServicesForm(), UpdatedBlock(), charCount(), Field, Fix, isMakeover() (+16 more)

### Community 6 - "Onboarding & File Parsing"
Cohesion: 0.11
Nodes (19): Mode, extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText(), fileToBase64(), ALL_HEADINGS (+11 more)

### Community 7 - "Contributing & Deploying"
Cohesion: 0.12
Nodes (22): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Deploy your own (free), Fork it and make it your own, Getting started (students), Lab computer tip: leave Remember my keys off and clear all data, Limitation: AI can be wrong ([add number] markers) (+14 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 9 - "Output Panel & Tool Pages"
Cohesion: 0.17
Nodes (12): OutputPanel(), Props, Spinner(), clearEverything(), clearProfile(), ProfilePolishDB, saveDraft(), saveProfile() (+4 more)

### Community 10 - "Demo Switch & No-Key Path"
Cohesion: 0.19
Nodes (18): Checklist 5: the no-key path and the demo-ended state still behave (SetupBanner up front; SHARED_KEY_ENABLED=false -> "The free demo has ended" in banner, Settings and generate), Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing, SetupBanner (no-key warning), src/lib/shared-key.ts (the shared-key demo switch, SHARED_KEY_ENABLED), Add your own feature (page + prompt recipe), src/app/api/status/route.ts (/api/status: is the shared-key demo on? read by SetupBanner and Settings), /api/trending cached trend feed, How it works (browser vs serverless diagram: /api/generate with demo switch and limits, /api/status, /api/banner, /api/trending) (+10 more)

### Community 11 - "Profile Page Components"
Cohesion: 0.17
Nodes (12): MakeoverReport(), ProfileGaps(), Card(), saveOffersServices(), saveTargetRole(), analyseProfile(), Gap, GapReport (+4 more)

### Community 12 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 13 - "App Shell & Banners"
Cohesion: 0.18
Nodes (8): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient()

### Community 14 - "Messages & Shared Hooks"
Cohesion: 0.20
Nodes (12): MESSAGE_KINDS, MessageKind, useGenerate(), db, useDrafts(), useProfile(), MessagesPage(), TONES (+4 more)

### Community 15 - "Photo Rule & Banner Maker"
Cohesion: 0.21
Nodes (15): Invariant 13: no generated or edited photos of people, src/components/BannerGenerator.tsx (banner maker UI), src/lib/banner.ts (banner maker helpers), Banner maker data flow (role, tagline, style via /api/banner to Gemini; image straight back; nothing stored or logged), src/app/api/banner/route.ts (LinkedIn banner maker, opt-in, 2/day, no-store), BannerGenerator component (style, text, preview, download), src/lib/banner.ts (banner size, styles, 21:9 to 4:1 crop that trims edge strips, OffscreenCanvas), BANNER_DAILY_LIMIT_GLOBAL (default 50; caps worst-case bill ~$1.70/day) (+7 more)

### Community 16 - "Copy & Markdown"
Cohesion: 0.16
Nodes (8): CopyButton(), Markdown(), Button(), LinkButton(), PageHeader(), Variant, variants, TYPE_LABEL

### Community 17 - "Coding Conventions"
Cohesion: 0.16
Nodes (14): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default (+6 more)

### Community 18 - "File Drop & ATS Checks"
Cohesion: 0.21
Nodes (9): FileDrop(), Props, AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP (+1 more)

### Community 19 - "Server Data Disclosure"
Cohesion: 0.20
Nodes (11): Anonymous Device Id and IP Counting (shared-key and banner limits), Shared-Key Data Handling Disclosure, Host warning: don't log request bodies in /api/generate or /api/banner, What the Server Sees, Anonymous device id (localStorage, header-only, for shared-key and banner daily limits), /api/generate shared-key proxy, SHARED_MODEL (default gemini-3.8-flash; gemini-3.5-flash-lite on quota trouble), Limitation: shared key is best-effort without Upstash (+3 more)

### Community 20 - "Trending Topics Feed"
Cohesion: 0.27
Nodes (8): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, GET()

### Community 21 - "AI Prompts"
Cohesion: 0.42
Nodes (7): atsPrompt(), messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt(), profile

### Community 22 - "Generate Route & Demo Switch"
Cohesion: 0.33
Nodes (3): NO_STORE, SHARED_KEY_MESSAGES, SharedKeyState

### Community 23 - "Features & Docs Checklist"
Cohesion: 0.25
Nodes (8): Checklist 7: docs updated, Credits and trend data sources, Feature: Message Writer, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Post Generator, Features table, PDF marked recommended; paste text is the phone fallback, Trending sources (Google Trends India, Hacker News, Dev.to)

### Community 24 - "Browser Storage & Drafts"
Cohesion: 0.38
Nodes (7): What the Browser Stores, 48-hour auto-clear of profile and drafts, Feature: My Drafts (48-hour countdown, Markdown export), IndexedDB (Dexie) browser storage, Limitation: browser storage can be cleared, Privacy model table, Privacy row: generated banner lives in page memory, never stored

### Community 25 - "ATS Feature & Roadmap"
Cohesion: 0.29
Nodes (7): Feature: Resume ATS Check, Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator, Roadmap: cross-device sync, Roadmap ideas, Roadmap: Hindi / Tamil / Telugu output option, Rule-based ATS score (13 checks, zero AI calls)

## Knowledge Gaps
- **133 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `require`, `pkg` (+128 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Contributing & Deploying` to `Governance, Banner Exception & CI`, `Demo Switch & No-Key Path`, `Server Data Disclosure`, `Features & Docs Checklist`, `Browser Storage & Drafts`, `ATS Feature & Roadmap`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Spinner()` connect `Output Panel & Tool Pages` to `BYOK Routing & Errors`, `Banner Route, Crop & Rate Limits`, `Makeover Report & Counts`, `Onboarding & File Parsing`, `Messages & Shared Hooks`, `Copy & Markdown`, `File Drop & ATS Checks`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Governance, Banner Exception & CI` to `Coding Conventions`, `Invariants, Test Policy & File Map`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Governance, Banner Exception & CI` be split into smaller, more focused modules?**
  _Cohesion score 0.050078247261345854 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.07662337662337662 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._