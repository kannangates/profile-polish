# Graph Report - .  (2026-09-29)

## Corpus Check
- 12 files · ~27,619 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 529 nodes · 1007 edges · 34 communities (28 shown, 6 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.84)
- Token cost: 101,972 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI Prompts & Result UI|AI Prompts & Result UI]]
- [[_COMMUNITY_Governance & Banner Paid Exception|Governance & Banner Paid Exception]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Server Routes, Banner & Rate Limits|Server Routes, Banner & Rate Limits]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Makeover Report & Skills|Makeover Report & Skills]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_Verification Checklist|Verification Checklist]]
- [[_COMMUNITY_Contributor Guide & File Map|Contributor Guide & File Map]]
- [[_COMMUNITY_Project Layout & Rule-Based Checks|Project Layout & Rule-Based Checks]]
- [[_COMMUNITY_Privacy & No-Account Rules|Privacy & No-Account Rules]]
- [[_COMMUNITY_Browser Storage & TTL|Browser Storage & TTL]]
- [[_COMMUNITY_Profile Makeover & Photo Rule|Profile Makeover & Photo Rule]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Founding Constraints|Founding Constraints]]
- [[_COMMUNITY_Project Identity & Workshop|Project Identity & Workshop]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Features & Trending|Features & Trending]]
- [[_COMMUNITY_Providers & Model Config|Providers & Model Config]]
- [[_COMMUNITY_ATS Checks & Roadmap|ATS Checks & Roadmap]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_No-Invention Rule|No-Invention Rule]]
- [[_COMMUNITY_LinkedIn PDF Input|LinkedIn PDF Input]]
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
4. `CLAUDE.md — repo instructions for AI and human contributors` - 14 edges
5. `Project layout (task to file map)` - 14 edges
6. `Feature: LinkedIn banner (if the host turns it on; 1584 x 396 PNG, two a day)` - 14 edges
7. `Pre-merge verification checklist` - 13 edges
8. `Folder structure` - 13 edges
9. `The paid exception: LinkedIn banners` - 13 edges
10. `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Ground rule 1: zero cost stays zero cost` --implements--> `Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Ground rule 2: privacy is the product` --references--> `Invariant 2: student content stays client-side (two store-nothing exceptions: shared-key proxy, banner endpoint)`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `BYOK: bring your own free key, called direct from the browser` --conceptually_related_to--> `Invariant 1: BYOK calls go browser to provider directly`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Terms of the LinkedIn banner paid exception** — claude_paid_exception_linkedin_banners, claude_banner_term_only_the_banner, claude_banner_term_capped_server_side, claude_banner_term_cheapest_adequate_model, claude_banner_term_opt_in_off_without_billing, claude_banner_term_minimal_data, claude_constraint_1_zero_host_cost [EXTRACTED 1.00]
- **Banner maker implementation files and limits** — readme_feature_linkedin_banner, readme_api_banner_route, readme_banner_generator_component, readme_banner_ts, readme_env_banner_enabled, readme_env_banner_model, readme_env_banner_daily_limit_per_device, readme_env_banner_daily_limit_global [EXTRACTED 1.00]
- **Banner data flow: only role and tagline leave the browser, nothing stored** — docs_privacy_banner_maker_data_flow, readme_privacy_row_banner_request, readme_privacy_row_generated_banner, claude_invariant_2_exception_banner_endpoint, claude_banner_term_minimal_data, claude_invariant_13_no_generated_or_edited_photos_of_people, docs_privacy_warning_no_logging_banner_bodies [INFERRED 0.85]

## Communities (34 total, 6 thin omitted)

### Community 0 - "AI Prompts & Result UI"
Cohesion: 0.05
Nodes (60): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+52 more)

### Community 1 - "Governance & Banner Paid Exception"
Cohesion: 0.07
Nodes (59): .github/workflows/claude-review.yml (optional automated review), Banner term: capped server-side (2 per device per day + global daily ceiling), Banner term: cheapest adequate model (BANNER_MODEL), Banner term: minimal data (target role + optional tagline, stored nowhere), Banner term: only the banner (4:1, 1584 x 396, no people), Banner term: opt-in, and off without billing (BANNER_ENABLED=true), Constraint 1: it must cost the host ₹0 by default (one capped, opt-in paid exception), Invariant 2 exception: banner endpoint receives only target role and optional tagline, stores nothing (+51 more)

### Community 2 - "BYOK Routing & Errors"
Cohesion: 0.10
Nodes (40): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+32 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 4 - "Server Routes, Banner & Rate Limits"
Cohesion: 0.11
Nodes (28): bannerPrompt(), enabled(), GET(), NO_STORE, POST(), who(), Status, NO_STORE (+20 more)

### Community 5 - "Onboarding & File Parsing"
Cohesion: 0.10
Nodes (21): Mode, clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText() (+13 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 8 - "Makeover Report & Skills"
Cohesion: 0.18
Nodes (14): SectionCard(), SkillChips(), Field, KINDS, Makeover, MakeoverSection, makeoverToMarkdown(), parseMakeover() (+6 more)

### Community 9 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 10 - "Coding Conventions"
Cohesion: 0.13
Nodes (15): Convention: branch and PR for every change, Convention: browser-only reads happen after hydration, Convention: comments explain why, not what, Convention: copy is written for a 19-year-old in a hurry, Convention: never delete a branch without the owner asking, Convention: phones are the default (check at 375px), Convention: Server Components by default, Convention: TypeScript strict, no any (+7 more)

### Community 11 - "Verification Checklist"
Cohesion: 0.18
Nodes (12): Checklist 1: it builds and passes checks, Checklist 3: no secrets are committed, Checklist 4: it works in a browser, not just in CI, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote, Invariant 8: no secret in client code or commits, PR review priority order, Pre-merge verification checklist (+4 more)

### Community 12 - "Contributor Guide & File Map"
Cohesion: 0.20
Nodes (12): Checklist 5: the no-key path still behaves, SetupBanner (no-key warning), Add your own feature (page + prompt recipe), Folder structure, Makeover card: your original and the rewrite with its own Copy button, MakeoverReport component (section cards for the profile review), Makeover cards: headline (3 options), About, each experience role, skills, src/lib/makeover.ts (parses the profile review's @@ markers into sections) (+4 more)

### Community 13 - "Project Layout & Rule-Based Checks"
Cohesion: 0.23
Nodes (12): Invariant 12: anything checkable without a model is checked without one, Project layout (task to file map), src/components/ui.tsx (shared UI primitives), src/lib/ai/prompts.ts (prompt builders), src/lib/ai/providers/ (per-provider adapters), src/lib/ats.ts (rule-based ATS checks), src/lib/profile-gaps.ts (rule-based profile gap checks), src/lib/profile-parser.ts (LinkedIn PDF heuristics) (+4 more)

### Community 14 - "Privacy & No-Account Rules"
Cohesion: 0.25
Nodes (11): Changing an invariant, Checklist 6: privacy claims still true, Constraint 3: usable in under two minutes with no account, docs/PRIVACY.md, Invariant 3: no server-side database, no accounts, no auth, Invariant 9: no analytics that capture page content or user input, Known candidate: optional accounts with cross-device sync, Ground rule 1: zero cost stays zero cost (+3 more)

### Community 15 - "Browser Storage & TTL"
Cohesion: 0.22
Nodes (11): Checklist 2: the invariants still hold, DRAFT_TTL_MS (48 hour expiry), Hard invariants (thirteen, never break these), Invariant 11: never claim something was saved unless storage confirms it, Invariant 4: everything in the browser has a TTL, Invariant 5: keys default to sessionStorage, src/lib/db.ts (Dexie schema, TTL purge), src/lib/keys.ts (key storage, active provider, device id) (+3 more)

### Community 16 - "Profile Makeover & Photo Rule"
Cohesion: 0.24
Nodes (10): Invariant 13: no generated or edited photos of people, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Profile Optimizer (gap check + section-by-section AI makeover), Makeover score and quick wins, PDF marked recommended; paste text is the phone fallback, Photo and banner feedback from an attached screenshot, Section-by-section AI makeover for the target role, Skills as one-tap chips (LinkedIn adds them one at a time) (+2 more)

### Community 17 - "Trending Topics Feed"
Cohesion: 0.31
Nodes (7): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, GET()

### Community 18 - "Founding Constraints"
Cohesion: 0.28
Nodes (9): CLAUDE.md — repo instructions for AI and human contributors, Commands (nvm use, npm install, dev, tsc, lint, build), Constraint 2: student data must never reach the server, Invariant 1: BYOK calls go browser to provider directly, Naming rule: refer to a rule by what it says, not only by its number, The three founding constraints, CLAUDE.md is the source of truth, Contributing ground rules (+1 more)

### Community 19 - "Project Identity & Workshop"
Cohesion: 0.28
Nodes (9): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Fork it and make it your own, MIT license, ProfilePolish, Run locally, Workshop slide deck: From Ghosted to Shortlisted (+1 more)

### Community 20 - "Codebase Map Honesty"
Cohesion: 0.38
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 21 - "Features & Trending"
Cohesion: 0.33
Nodes (6): Checklist 7: docs updated, Credits and trend data sources, Feature: Message Writer, Feature: Post Generator, Features table, Trending sources (Google Trends India, Hacker News, Dev.to)

### Community 22 - "Providers & Model Config"
Cohesion: 0.40
Nodes (6): Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, src/lib/ai/client.ts (BYOK vs shared-key routing), src/lib/config.ts (app name, providers, model catalog), Adding an AI provider, Load models from provider button (live model list)

### Community 23 - "ATS Checks & Roadmap"
Cohesion: 0.33
Nodes (6): Feature: Resume ATS Check, Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator, Roadmap ideas, Roadmap: Hindi / Tamil / Telugu output option, Rule-based ATS score (13 checks, zero AI calls)

### Community 24 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 25 - "No-Invention Rule"
Cohesion: 0.67
Nodes (3): Invariant 7: prompts must forbid invention, Ground rule 4: keep prompts honest, Limitation: AI can be wrong ([add number] markers)

### Community 26 - "LinkedIn PDF Input"
Cohesion: 0.67
Nodes (3): Limitation: no LinkedIn API, heuristic PDF parsing, LinkedIn 'Save to PDF' export as the input path, Workshop tip: live demo reading a student's profile review aloud

## Knowledge Gaps
- **129 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Founding Constraints` to `Governance & Banner Paid Exception`, `Coding Conventions`, `Verification Checklist`, `Project Layout & Rule-Based Checks`, `Privacy & No-Account Rules`, `Browser Storage & TTL`, `Project Identity & Workshop`, `Codebase Map Honesty`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `ProfilePolish` connect `Project Identity & Workshop` to `Governance & Banner Paid Exception`, `Contributor Guide & File Map`, `Browser Storage & TTL`, `Codebase Map Honesty`, `Features & Trending`, `ATS Checks & Roadmap`, `LinkedIn PDF Input`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Hard invariants (thirteen, never break these)` connect `Browser Storage & TTL` to `Governance & Banner Paid Exception`, `Coding Conventions`, `Verification Checklist`, `Project Layout & Rule-Based Checks`, `Privacy & No-Account Rules`, `Profile Makeover & Photo Rule`, `Founding Constraints`, `No-Invention Rule`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI Prompts & Result UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05249569707401033 - nodes in this community are weakly interconnected._
- **Should `Governance & Banner Paid Exception` be split into smaller, more focused modules?**
  _Cohesion score 0.06779661016949153 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.09714285714285714 - nodes in this community are weakly interconnected._