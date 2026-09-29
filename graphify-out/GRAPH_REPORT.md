# Graph Report - .  (2026-09-29)

## Corpus Check
- 2 files · ~31,346 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 575 nodes · 1101 edges · 34 communities (29 shown, 5 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.83)
- Token cost: 97,831 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance, Banner Exception & CI|Governance, Banner Exception & CI]]
- [[_COMMUNITY_Invariants, Conventions & Test Policy|Invariants, Conventions & Test Policy]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Makeover Report & Counts|Makeover Report & Counts]]
- [[_COMMUNITY_Banner Route & Rate Limits|Banner Route & Rate Limits]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Profile Page Components|Profile Page Components]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Deploying & Limitations|Deploying & Limitations]]
- [[_COMMUNITY_My Drafts Page|My Drafts Page]]
- [[_COMMUNITY_File Drop & ATS Checks|File Drop & ATS Checks]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Demo Switch & No-Key Path|Demo Switch & No-Key Path]]
- [[_COMMUNITY_Photo Rule & Banner Data Flow|Photo Rule & Banner Data Flow]]
- [[_COMMUNITY_Markdown & Output Panel|Markdown & Output Panel]]
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Project Identity & License|Project Identity & License]]
- [[_COMMUNITY_Browser Storage & BYOK|Browser Storage & BYOK]]
- [[_COMMUNITY_Copy Button & UI Primitives|Copy Button & UI Primitives]]
- [[_COMMUNITY_Generate Route & Demo Switch|Generate Route & Demo Switch]]
- [[_COMMUNITY_Message Writer Page|Message Writer Page]]
- [[_COMMUNITY_Features & Model Defaults|Features & Model Defaults]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_ATS Feature & Roadmap|ATS Feature & Roadmap]]
- [[_COMMUNITY_Architecture & Trending Docs|Architecture & Trending Docs]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
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
- `What you should tell students` --conceptually_related_to--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  docs/PRIVACY.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Ground rule 4: keep prompts honest` --references--> `Invariant 7: prompts must forbid invention`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Development setup and pre-PR checks` --conceptually_related_to--> `Checklist 1: it builds and passes checks (tsc, lint, npm test, build)`  [INFERRED]
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

## Communities (34 total, 5 thin omitted)

### Community 0 - "Governance, Banner Exception & CI"
Cohesion: 0.05
Nodes (72): Pull Request Checklist Template, Checklist item: npx tsc --noEmit, npm run lint, npm test and npm run build pass, .github/workflows/claude-review.yml (optional automated review), Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true) (+64 more)

### Community 1 - "Invariants, Conventions & Test Policy"
Cohesion: 0.06
Nodes (54): Checklist 4b: test on real data, not only on a fixture you wrote, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Invariant 12: anything checkable without a model is checked without one, Invariant 7: prompts must forbid invention, Layout row: LinkedIn banner maker (the paid exception), Project layout (task to file map), Rule: add a test in tests/ for every new answer shape when changing prompts.ts, makeover.ts or linkedin-text.ts (+46 more)

### Community 2 - "BYOK Routing & Errors"
Cohesion: 0.09
Nodes (37): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+29 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (41): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+33 more)

### Community 4 - "Makeover Report & Counts"
Cohesion: 0.11
Nodes (24): CharCount(), SectionCard(), ServicesForm(), UpdatedBlock(), charCount(), Field, Fix, isMakeover() (+16 more)

### Community 5 - "Banner Route & Rate Limits"
Cohesion: 0.12
Nodes (26): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), Status, BANNER_STYLES (+18 more)

### Community 6 - "Onboarding & File Parsing"
Cohesion: 0.11
Nodes (20): Mode, clearProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText(), fileToBase64() (+12 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 8 - "Profile Page Components"
Cohesion: 0.16
Nodes (13): BannerGenerator(), MakeoverReport(), ProfileGaps(), Card(), saveOffersServices(), saveTargetRole(), analyseProfile(), Gap (+5 more)

### Community 9 - "App Shell & Banners"
Cohesion: 0.17
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), Badge(), purgeExpired(), hasAnyKey() (+1 more)

### Community 10 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 11 - "Deploying & Limitations"
Cohesion: 0.14
Nodes (15): Anonymous Device Id and IP Counting (shared-key and banner limits), Deploy your own (free), Getting started (students), Lab computer tip: leave Remember my keys off and clear all data, Limitation: AI can be wrong ([add number] markers), Limitation: free tiers have per-key daily limits, Limitation: no LinkedIn API, heuristic PDF parsing, Limitation: shared key is best-effort without Upstash (+7 more)

### Community 12 - "My Drafts Page"
Cohesion: 0.19
Nodes (8): TYPE_LABEL, clearEverything(), db, ProfilePolishDB, saveProfile(), useDrafts(), Draft, Profile

### Community 13 - "File Drop & ATS Checks"
Cohesion: 0.21
Nodes (9): FileDrop(), Props, AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP (+1 more)

### Community 14 - "Trending Topics Feed"
Cohesion: 0.22
Nodes (10): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, Filter (+2 more)

### Community 15 - "Demo Switch & No-Key Path"
Cohesion: 0.27
Nodes (12): Checklist 5: the no-key path and the demo-ended state still behave (SetupBanner up front; SHARED_KEY_ENABLED=false -> "The free demo has ended" in banner, Settings and generate), Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing, SetupBanner (no-key warning), src/lib/shared-key.ts (the shared-key demo switch, SHARED_KEY_ENABLED), Shared-Key Data Handling Disclosure, What the Server Sees, What you should tell students, /api/generate shared-key proxy (+4 more)

### Community 16 - "Photo Rule & Banner Data Flow"
Cohesion: 0.29
Nodes (12): Invariant 13: no generated or edited photos of people, Banner maker data flow (role, tagline, style via /api/banner to Gemini; image straight back; nothing stored or logged), Anonymous device id (localStorage, header-only, for shared-key and banner daily limits), src/app/api/banner/route.ts (LinkedIn banner maker, opt-in, 2/day, no-store), BANNER_DAILY_LIMIT_GLOBAL (default 50; caps worst-case bill ~$1.70/day), BANNER_DAILY_LIMIT_PER_DEVICE (default 2; failed attempts don't count), BANNER_ENABLED (default off; needs billing on GEMINI_API_KEY, ~$0.034 per banner), BANNER_MODEL (default gemini-3.1-flash-lite-image, cheapest Gemini image model) (+4 more)

### Community 17 - "Markdown & Output Panel"
Cohesion: 0.21
Nodes (7): Markdown(), OutputPanel(), Props, Spinner(), saveDraft(), toLinkedInText(), DraftType

### Community 18 - "AI Prompts"
Cohesion: 0.36
Nodes (8): atsPrompt(), MESSAGE_KINDS, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt(), profile

### Community 19 - "Project Identity & License"
Cohesion: 0.24
Nodes (10): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Fork it and make it your own, MIT license, npm test (parser, prompt and demo-switch tests, node:test, no extra packages), ProfilePolish, Run locally (+2 more)

### Community 20 - "Browser Storage & BYOK"
Cohesion: 0.27
Nodes (10): What the Browser Stores, 48-hour auto-clear of profile and drafts, BYOK: bring your own free key, called direct from the browser, Feature: My Drafts (48-hour countdown, Markdown export), IndexedDB (Dexie) browser storage, Limitation: browser storage can be cleared, Privacy model table, Privacy row: generated banner lives in page memory, never stored (+2 more)

### Community 21 - "Copy Button & UI Primitives"
Cohesion: 0.25
Nodes (7): CopyButton(), Button(), Label(), LinkButton(), PageHeader(), Variant, variants

### Community 22 - "Generate Route & Demo Switch"
Cohesion: 0.33
Nodes (3): NO_STORE, SHARED_KEY_MESSAGES, SharedKeyState

### Community 23 - "Message Writer Page"
Cohesion: 0.36
Nodes (7): MessageKind, useGenerate(), useProfile(), MessagesPage(), TONES, PostsPage(), ResumePage()

### Community 24 - "Features & Model Defaults"
Cohesion: 0.29
Nodes (7): Checklist 7: docs updated, SHARED_MODEL (default gemini-3.8-flash; gemini-3.5-flash-lite on quota trouble), Feature: Message Writer, Feature: Settings (BYOK keys, models, clear all data), Features table, Load models from provider button (live model list), Model defaults per provider (Gemini gemini-3.8-flash)

### Community 25 - "Codebase Map Honesty"
Cohesion: 0.33
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 26 - "ATS Feature & Roadmap"
Cohesion: 0.29
Nodes (7): Feature: Resume ATS Check, Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator, Roadmap: cross-device sync, Roadmap ideas, Roadmap: Hindi / Tamil / Telugu output option, Rule-based ATS score (13 checks, zero AI calls)

### Community 27 - "Architecture & Trending Docs"
Cohesion: 0.33
Nodes (6): /api/trending cached trend feed, How it works (browser vs serverless diagram: /api/generate with demo switch and limits, /api/status, /api/banner, /api/trending), Credits and trend data sources, Feature: Post Generator, Tech stack (Next.js 16, React 19, Tailwind 4, Dexie, pdf.js, mammoth), Trending sources (Google Trends India, Hacker News, Dev.to)

### Community 28 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Knowledge Gaps
- **133 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `require`, `pkg` (+128 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Project Identity & License` to `Invariants, Conventions & Test Policy`, `Deploying & Limitations`, `Browser Storage & BYOK`, `Features & Model Defaults`, `Codebase Map Honesty`, `ATS Feature & Roadmap`, `Architecture & Trending Docs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Spinner()` connect `Markdown & Output Panel` to `BYOK Routing & Errors`, `Makeover Report & Counts`, `Banner Route & Rate Limits`, `Onboarding & File Parsing`, `File Drop & ATS Checks`, `Trending Topics Feed`, `Copy Button & UI Primitives`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Governance, Banner Exception & CI` to `Codebase Map Honesty`, `Invariants, Conventions & Test Policy`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Governance, Banner Exception & CI` be split into smaller, more focused modules?**
  _Cohesion score 0.050078247261345854 - nodes in this community are weakly interconnected._
- **Should `Invariants, Conventions & Test Policy` be split into smaller, more focused modules?**
  _Cohesion score 0.06009783368273934 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.08941176470588236 - nodes in this community are weakly interconnected._