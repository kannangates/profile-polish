# Graph Report - .  (2026-09-29)

## Corpus Check
- 12 files · ~30,674 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 563 nodes · 1069 edges · 31 communities (26 shown, 5 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 108 edges (avg confidence: 0.83)
- Token cost: 103,106 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Banner Paid Exception & Governance|Banner Paid Exception & Governance]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Features, Docs & Contributing|Features, Docs & Contributing]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Makeover Report, Counts & Tests|Makeover Report, Counts & Tests]]
- [[_COMMUNITY_Server Routes, Banner & Rate Limits|Server Routes, Banner & Rate Limits]]
- [[_COMMUNITY_PDF & DOCX Extraction|PDF & DOCX Extraction]]
- [[_COMMUNITY_Output Panel & Tool Pages|Output Panel & Tool Pages]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Core Invariants & Storage Rules|Core Invariants & Storage Rules]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_Prompt Rules & Test Policy|Prompt Rules & Test Policy]]
- [[_COMMUNITY_File Drop & ATS Checks|File Drop & ATS Checks]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Build Checks & npm test Gate|Build Checks & npm test Gate]]
- [[_COMMUNITY_Verification Checklist|Verification Checklist]]
- [[_COMMUNITY_Messages & Shared Hooks|Messages & Shared Hooks]]
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Governance & Invariant Changes|Governance & Invariant Changes]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Privacy & Analytics Rules|Privacy & Analytics Rules]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 20 edges
2. `Hard invariants (thirteen, never break these)` - 19 edges
3. `compilerOptions` - 17 edges
4. `Project layout (task to file map)` - 14 edges
5. `Pre-merge verification checklist` - 14 edges
6. `Folder structure` - 14 edges
7. `CLAUDE.md — repo instructions for AI and human contributors` - 13 edges
8. `Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day)` - 13 edges
9. `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)` - 12 edges
10. `Conventions` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Ground rule 1: zero cost stays zero cost` --implements--> `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Ground rule 2: privacy is the product` --references--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Ground rule 4: keep prompts honest` --references--> `Invariant 7: prompts must forbid invention`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Banner maker implementation files and limits** — readme_feature_linkedin_banner, readme_api_banner_route, readme_banner_generator_component, readme_banner_ts, readme_env_banner_enabled, readme_env_banner_model, readme_env_banner_daily_limit_per_device, readme_env_banner_daily_limit_global [EXTRACTED 1.00]
- **Profile Optimizer makeover outputs: score, section cards, skill chips, photo/banner advice, Services card, Everything else** — readme_makeover_score_quick_wins, readme_makeover_section_cards, readme_skill_chips, readme_text_only_photo_banner_advice, readme_services_page_card, readme_everything_else_fixes [INFERRED 0.85]
- **Terms of the LinkedIn banner paid exception** — claude_paid_exception_linkedin_banners, claude_banner_term_only_the_banner, claude_banner_term_capped_server_side, claude_banner_term_cheapest_adequate_model, claude_banner_term_opt_in_off_without_billing, claude_banner_term_minimal_data, claude_constraint_1_zero_host_cost [EXTRACTED 1.00]
- **npm test as a merge gate: commands, checklist 1, PR template item, CI step** — claude_npm_test_command, claude_checklist_1_builds_and_passes_checks, readme_npm_test_command, _github_pull_request_template_checks_pass_item, workflows_ci_npm_test_step [INFERRED 0.85]
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]

## Communities (31 total, 5 thin omitted)

### Community 0 - "Banner Paid Exception & Governance"
Cohesion: 0.06
Nodes (63): .github/workflows/claude-review.yml (optional automated review), Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true), Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception), Invariant 13: no generated or edited photos of people (+55 more)

### Community 1 - "BYOK Routing & Errors"
Cohesion: 0.09
Nodes (42): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+34 more)

### Community 2 - "Features, Docs & Contributing"
Cohesion: 0.06
Nodes (52): Checklist 7: docs updated, You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Add your own feature (page + prompt recipe), /api/trending cached trend feed, Credits and trend data sources, Everything else: up to five fixes, each with a reason and click-by-click LinkedIn steps (+44 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (41): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+33 more)

### Community 4 - "Makeover Report, Counts & Tests"
Cohesion: 0.09
Nodes (28): CharCount(), MakeoverReport(), SectionCard(), ServicesForm(), UpdatedBlock(), Markdown(), saveOffersServices(), saveTargetRole() (+20 more)

### Community 5 - "Server Routes, Banner & Rate Limits"
Cohesion: 0.11
Nodes (29): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), BannerGenerator(), Status (+21 more)

### Community 6 - "PDF & DOCX Extraction"
Cohesion: 0.11
Nodes (24): extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText(), fileToBase64(), analyseProfile(), Gap (+16 more)

### Community 7 - "Output Panel & Tool Pages"
Cohesion: 0.15
Nodes (12): OutputPanel(), Props, PageHeader(), TYPE_LABEL, db, ProfilePolishDB, saveDraft(), useDrafts() (+4 more)

### Community 8 - "Onboarding & File Parsing"
Cohesion: 0.12
Nodes (12): Mode, CopyButton(), ProfileGaps(), Button(), Card(), LinkButton(), Spinner(), Variant (+4 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 10 - "Core Invariants & Storage Rules"
Cohesion: 0.13
Nodes (19): Checklist 2: the invariants still hold, Constraint 2: student data must never reach the server, Convention: copy is written for a 19-year-old in a hurry, DRAFT_TTL_MS (48 hour expiry), Hard invariants (thirteen, never break these), Invariant 10: don't oversell, Invariant 11: never claim something was saved unless storage confirms it, Invariant 1: BYOK calls go browser to provider directly (+11 more)

### Community 11 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 12 - "App Shell & Banners"
Cohesion: 0.21
Nodes (8): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient()

### Community 13 - "Coding Conventions"
Cohesion: 0.16
Nodes (14): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default (+6 more)

### Community 14 - "Prompt Rules & Test Policy"
Cohesion: 0.21
Nodes (14): Invariant 12: anything checkable without a model is checked without one, Invariant 7: prompts must forbid invention, Project layout (task to file map), Rule: add a test in tests/ for every new answer shape when changing prompts.ts, makeover.ts or linkedin-text.ts, src/components/ui.tsx (shared UI primitives), src/lib/ai/prompts.ts (prompt builders), src/lib/ai/providers/ (per-provider adapters), src/lib/ats.ts (rule-based ATS checks) (+6 more)

### Community 15 - "File Drop & ATS Checks"
Cohesion: 0.21
Nodes (9): FileDrop(), Props, AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP (+1 more)

### Community 16 - "Trending Topics Feed"
Cohesion: 0.22
Nodes (10): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, Filter (+2 more)

### Community 17 - "Build Checks & npm test Gate"
Cohesion: 0.25
Nodes (11): Pull Request Checklist Template, Checklist item: npx tsc --noEmit, npm run lint, npm test and npm run build pass, Checklist 1: it builds and passes checks (tsc, lint, npm test, build), Checklist 4: it works in a browser, not just in CI, Commands (nvm use, npm install, dev, tsc, lint, npm test, build), npm test (parser + prompt tests, node:test, no extra packages), Development setup and pre-PR checks, npm test (parser + prompt tests, node:test, no extra packages) (+3 more)

### Community 18 - "Verification Checklist"
Cohesion: 0.18
Nodes (11): Checklist 3: no secrets are committed, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote, Checklist 5: the no-key path still behaves, Invariant 8: no secret in client code or commits, PR review priority order, Pre-merge verification checklist, SetupBanner (no-key warning) (+3 more)

### Community 19 - "Messages & Shared Hooks"
Cohesion: 0.27
Nodes (9): MESSAGE_KINDS, MessageKind, Label(), useGenerate(), useProfile(), MessagesPage(), TONES, PostsPage() (+1 more)

### Community 20 - "AI Prompts"
Cohesion: 0.42
Nodes (7): atsPrompt(), messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt(), profile

### Community 21 - "Governance & Invariant Changes"
Cohesion: 0.39
Nodes (8): Changing an invariant, CLAUDE.md — repo instructions for AI and human contributors, Constraint 3: usable in under two minutes with no account, Invariant 3: no server-side database, no accounts, no auth, Naming rule: refer to a rule by what it says, not only by its number, Known candidate: optional accounts with cross-device sync, The three founding constraints, Ground rule 1: zero cost stays zero cost

### Community 22 - "Codebase Map Honesty"
Cohesion: 0.33
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 23 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 24 - "Privacy & Analytics Rules"
Cohesion: 0.40
Nodes (5): Checklist 6: privacy claims still true, docs/PRIVACY.md, Invariant 9: no analytics that capture page content or user input, Host warning: check Gemini terms before enabling banners; unpaid keys may be used to improve Google products, Host Prohibitions

## Knowledge Gaps
- **134 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `require`, `pkg` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Features, Docs & Contributing` to `Banner Paid Exception & Governance`, `Build Checks & npm test Gate`, `Codebase Map Honesty`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Governance & Invariant Changes` to `Banner Paid Exception & Governance`, `Core Invariants & Storage Rules`, `Coding Conventions`, `Prompt Rules & Test Policy`, `Build Checks & npm test Gate`, `Verification Checklist`, `Codebase Map Honesty`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Spinner()` connect `Onboarding & File Parsing` to `BYOK Routing & Errors`, `Makeover Report, Counts & Tests`, `Server Routes, Banner & Rate Limits`, `Output Panel & Tool Pages`, `File Drop & ATS Checks`, `Trending Topics Feed`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Banner Paid Exception & Governance` be split into smaller, more focused modules?**
  _Cohesion score 0.05837173579109063 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.09125188536953242 - nodes in this community are weakly interconnected._
- **Should `Features, Docs & Contributing` be split into smaller, more focused modules?**
  _Cohesion score 0.05957767722473605 - nodes in this community are weakly interconnected._