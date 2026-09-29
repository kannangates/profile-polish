# Graph Report - .  (2026-09-29)

## Corpus Check
- 10 files · ~29,343 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 546 nodes · 1026 edges · 36 communities (30 shown, 6 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.82)
- Token cost: 78,227 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI Prompts & Result UI|AI Prompts & Result UI]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Server Routes, Banner & Rate Limits|Server Routes, Banner & Rate Limits]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Makeover Report, Fixes & Services|Makeover Report, Fixes & Services]]
- [[_COMMUNITY_Banner Maker & Profile Makeover Docs|Banner Maker & Profile Makeover Docs]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Core Invariants & Storage Rules|Core Invariants & Storage Rules]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Project Identity & Getting Started|Project Identity & Getting Started]]
- [[_COMMUNITY_Verification Checklist|Verification Checklist]]
- [[_COMMUNITY_Banner Paid Exception|Banner Paid Exception]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_Photo Rule & Banner Data Flow|Photo Rule & Banner Data Flow]]
- [[_COMMUNITY_Features Table|Features Table]]
- [[_COMMUNITY_Project Layout & Prompt Rules|Project Layout & Prompt Rules]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Governance & Invariant Changes|Governance & Invariant Changes]]
- [[_COMMUNITY_ATS Checks|ATS Checks]]
- [[_COMMUNITY_Deploy & Limitations|Deploy & Limitations]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Browser Storage & Drafts|Browser Storage & Drafts]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]
- [[_COMMUNITY_Architecture & Trending Docs|Architecture & Trending Docs]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Privacy & Analytics Rules|Privacy & Analytics Rules]]
- [[_COMMUNITY_BYOK & Model Defaults|BYOK & Model Defaults]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_PR Template & CI|PR Template & CI]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 20 edges
2. `Hard invariants (thirteen, never break these)` - 19 edges
3. `compilerOptions` - 16 edges
4. `Project layout (task to file map)` - 14 edges
5. `CLAUDE.md — repo instructions for AI and human contributors` - 13 edges
6. `Pre-merge verification checklist` - 13 edges
7. `Folder structure` - 13 edges
8. `Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day)` - 13 edges
9. `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)` - 12 edges
10. `Conventions` - 12 edges

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
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]

## Communities (36 total, 6 thin omitted)

### Community 0 - "AI Prompts & Result UI"
Cohesion: 0.06
Nodes (51): GenerateResult, atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt() (+43 more)

### Community 1 - "BYOK Routing & Errors"
Cohesion: 0.10
Nodes (38): friendlyMessage(), generate(), GenerateOptions, listModels(), loaders, modelListers, QuotaError, SetupSteps() (+30 more)

### Community 2 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 3 - "Server Routes, Banner & Rate Limits"
Cohesion: 0.11
Nodes (29): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), BannerGenerator(), Status (+21 more)

### Community 4 - "Onboarding & File Parsing"
Cohesion: 0.10
Nodes (22): Mode, LinkButton(), clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText() (+14 more)

### Community 5 - "Makeover Report, Fixes & Services"
Cohesion: 0.11
Nodes (21): MakeoverReport(), SectionCard(), UpdatedBlock(), Field, Fix, isMakeover(), KINDS, Makeover (+13 more)

### Community 6 - "Banner Maker & Profile Makeover Docs"
Cohesion: 0.13
Nodes (26): src/components/BannerGenerator.tsx (banner maker UI), src/lib/banner.ts (banner maker helpers), Add your own feature (page + prompt recipe), BannerGenerator component (style, text, preview, download), src/lib/banner.ts (banner size, styles, 21:9 to 4:1 crop via OffscreenCanvas), Everything else: up to five fixes, each with a reason and click-by-click LinkedIn steps, Feature: Profile Optimizer (gap check, section-by-section AI makeover, Services card, Everything else fixes), Folder structure (+18 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Core Invariants & Storage Rules"
Cohesion: 0.14
Nodes (18): Checklist 2: the invariants still hold, Constraint 2: student data must never reach the server, Convention: copy is written for a 19-year-old in a hurry, DRAFT_TTL_MS (48 hour expiry), Hard invariants (thirteen, never break these), Invariant 10: don't oversell, Invariant 11: never claim something was saved unless storage confirms it, Invariant 1: BYOK calls go browser to provider directly (+10 more)

### Community 9 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 10 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 11 - "Project Identity & Getting Started"
Cohesion: 0.16
Nodes (16): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Fork it and make it your own, Getting started (students), Lab computer tip: leave Remember my keys off and clear all data, Limitation: no LinkedIn API, heuristic PDF parsing, LinkedIn 'Save to PDF' export as the input path (+8 more)

### Community 12 - "Verification Checklist"
Cohesion: 0.14
Nodes (15): Checklist 1: it builds and passes checks, Checklist 3: no secrets are committed, Checklist 4: it works in a browser, not just in CI, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote, Checklist 5: the no-key path still behaves, Commands (nvm use, npm install, dev, tsc, lint, build), Invariant 8: no secret in client code or commits (+7 more)

### Community 13 - "Banner Paid Exception"
Cohesion: 0.30
Nodes (14): Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true), Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception), Invariant 2 exception: banner endpoint receives only target role and optional tagline, stores nothing, Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint) (+6 more)

### Community 14 - "Coding Conventions"
Cohesion: 0.16
Nodes (14): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default (+6 more)

### Community 15 - "Photo Rule & Banner Data Flow"
Cohesion: 0.27
Nodes (13): Invariant 13: no generated or edited photos of people, Banner maker data flow (role, tagline, style via /api/banner to Gemini; image straight back; nothing stored or logged), Host warning: don't log request bodies in /api/generate or /api/banner, src/app/api/banner/route.ts (LinkedIn banner maker, opt-in, 2/day, no-store), /api/generate shared-key proxy, BANNER_DAILY_LIMIT_GLOBAL (default 50; caps worst-case bill ~$1.70/day), BANNER_DAILY_LIMIT_PER_DEVICE (default 2; failed attempts don't count), BANNER_ENABLED (default off; needs billing on GEMINI_API_KEY, ~$0.034 per banner) (+5 more)

### Community 16 - "Features Table"
Cohesion: 0.17
Nodes (12): Checklist 7: docs updated, Feature: Message Writer, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Resume ATS Check, Features table, PDF marked recommended; paste text is the phone fallback, Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator (+4 more)

### Community 17 - "Project Layout & Prompt Rules"
Cohesion: 0.23
Nodes (12): Invariant 12: anything checkable without a model is checked without one, Invariant 7: prompts must forbid invention, Project layout (task to file map), src/components/ui.tsx (shared UI primitives), src/lib/ai/prompts.ts (prompt builders), src/lib/ai/providers/ (per-provider adapters), src/lib/ats.ts (rule-based ATS checks), src/lib/profile-gaps.ts (rule-based profile gap checks) (+4 more)

### Community 18 - "Trending Topics Feed"
Cohesion: 0.27
Nodes (8): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, GET()

### Community 19 - "Governance & Invariant Changes"
Cohesion: 0.33
Nodes (9): .github/workflows/claude-review.yml (optional automated review), Changing an invariant, CLAUDE.md — repo instructions for AI and human contributors, Constraint 3: usable in under two minutes with no account, Invariant 3: no server-side database, no accounts, no auth, Naming rule: refer to a rule by what it says, not only by its number, Known candidate: optional accounts with cross-device sync, The three founding constraints (+1 more)

### Community 20 - "ATS Checks"
Cohesion: 0.28
Nodes (7): AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP, tokenize()

### Community 21 - "Deploy & Limitations"
Cohesion: 0.22
Nodes (9): Deploy your own (free), Limitation: AI can be wrong ([add number] markers), Limitation: free tiers have per-key daily limits, Limitation: shared key is best-effort without Upstash, Limitations (honest list), Official instance theprofilepolish.vercel.app and its aliases, Other hosts (Netlify, Cloudflare Pages via OpenNext; BYOK-only by deleting /api/generate), Upstash Redis rate limiting (optional) (+1 more)

### Community 22 - "Codebase Map Honesty"
Cohesion: 0.33
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 23 - "Browser Storage & Drafts"
Cohesion: 0.38
Nodes (7): What the Browser Stores, 48-hour auto-clear of profile and drafts, Feature: My Drafts (48-hour countdown, Markdown export), IndexedDB (Dexie) browser storage, Limitation: browser storage can be cleared, Privacy model table, Privacy row: generated banner lives in page memory, never stored

### Community 24 - "Server Data Disclosure"
Cohesion: 0.33
Nodes (6): Invariant 2 exception: shared-key proxy forwards one prompt to Gemini, stores nothing, Anonymous Device Id and IP Counting (shared-key and banner limits), Shared-Key Data Handling Disclosure, What the Server Sees, What you should tell students, Anonymous device id (localStorage, header-only, for shared-key and banner daily limits)

### Community 25 - "Architecture & Trending Docs"
Cohesion: 0.33
Nodes (6): /api/trending cached trend feed, How it works (browser vs serverless diagram), Credits and trend data sources, Feature: Post Generator, Tech stack (Next.js 16, React 19, Tailwind 4, Dexie, pdf.js, mammoth), Trending sources (Google Trends India, Hacker News, Dev.to)

### Community 26 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 27 - "Privacy & Analytics Rules"
Cohesion: 0.50
Nodes (5): Checklist 6: privacy claims still true, docs/PRIVACY.md, Invariant 9: no analytics that capture page content or user input, Host warning: check Gemini terms before enabling banners; unpaid keys may be used to improve Google products, Host Prohibitions

### Community 28 - "BYOK & Model Defaults"
Cohesion: 0.40
Nodes (5): BYOK: bring your own free key, called direct from the browser, SHARED_MODEL (default gemini-3.8-flash; gemini-3.5-flash-lite on quota trouble), Feature: Settings (BYOK keys, models, clear all data), Load models from provider button (live model list), Model defaults per provider (Gemini gemini-3.8-flash)

## Knowledge Gaps
- **135 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Project Identity & Getting Started` to `Banner Maker & Profile Makeover Docs`, `Features Table`, `Deploy & Limitations`, `Codebase Map Honesty`, `Browser Storage & Drafts`, `Architecture & Trending Docs`, `BYOK & Model Defaults`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Governance & Invariant Changes` to `Core Invariants & Storage Rules`, `Verification Checklist`, `Banner Paid Exception`, `Coding Conventions`, `Project Layout & Prompt Rules`, `Codebase Map Honesty`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Pre-merge verification checklist` connect `Verification Checklist` to `Core Invariants & Storage Rules`, `Features Table`, `Governance & Invariant Changes`, `Codebase Map Honesty`, `Privacy & Analytics Rules`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI Prompts & Result UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06220095693779904 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.1026827012025902 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._