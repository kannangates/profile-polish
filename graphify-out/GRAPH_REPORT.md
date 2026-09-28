# Graph Report - .  (2026-09-28)

## Corpus Check
- 10 files · ~24,475 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 470 nodes · 865 edges · 31 communities (21 shown, 10 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.83)
- Token cost: 168,102 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Governance Checklist & Invariants|Governance: Checklist & Invariants]]
- [[_COMMUNITY_Result UI & Makeover Report|Result UI & Makeover Report]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Privacy & Serverless Architecture|Privacy & Serverless Architecture]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Contributor Guide & File Map|Contributor Guide & File Map]]
- [[_COMMUNITY_Features & Profile Makeover|Features & Profile Makeover]]
- [[_COMMUNITY_Project Layout & Providers|Project Layout & Providers]]
- [[_COMMUNITY_Browser Storage & TTL|Browser Storage & TTL]]
- [[_COMMUNITY_Shared-Key Proxy & Rate Limits|Shared-Key Proxy & Rate Limits]]
- [[_COMMUNITY_Rule-Based Checks & Roadmap|Rule-Based Checks & Roadmap]]
- [[_COMMUNITY_Project Identity & Workshop|Project Identity & Workshop]]
- [[_COMMUNITY_Codebase Map Honesty|Codebase Map Honesty]]
- [[_COMMUNITY_Limitations|Limitations]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_PR Template & CI|PR Template & CI]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]
- [[_COMMUNITY_Device ID & Rate Counting|Device ID & Rate Counting]]
- [[_COMMUNITY_Shared-Key Data Disclosure|Shared-Key Data Disclosure]]
- [[_COMMUNITY_Host Prohibitions|Host Prohibitions]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]

## God Nodes (most connected - your core abstractions)
1. `ProfilePolish` - 19 edges
2. `Hard invariants (twelve, never break these)` - 18 edges
3. `compilerOptions` - 16 edges
4. `Project layout (task to file map)` - 13 edges
5. `Pre-merge verification checklist` - 13 edges
6. `CLAUDE.md — repo instructions for AI and human contributors` - 11 edges
7. `Conventions` - 11 edges
8. `Button()` - 10 edges
9. `Card()` - 10 edges
10. `useProfile()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Development setup and pre-PR checks` --conceptually_related_to--> `Checklist 4: it works in a browser, not just in CI`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Vercel Hobby zero-cost hosting` --implements--> `Constraint 1: it must cost the host zero rupees`  [INFERRED]
  README.md → CLAUDE.md
- `BYOK: bring your own free key, called direct from the browser` --conceptually_related_to--> `Invariant 1: BYOK calls go browser to provider directly`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Privacy-by-design: data and keys stay in the browser** — claude_constraint_2_no_student_data_on_server, claude_invariant_1_byok_browser_to_provider_direct, claude_invariant_2_student_content_stays_client_side, claude_invariant_4_browser_ttl, claude_invariant_5_keys_default_to_sessionstorage, readme_privacy_model, readme_byok_direct_from_browser, readme_48_hour_auto_clear [INFERRED 0.85]
- **Rule-based checks that run without a model** — claude_invariant_12_checked_without_a_model, claude_src_lib_ats_ts, claude_src_lib_profile_gaps_ts, readme_rule_based_ats_score, readme_profile_gaps_panel [INFERRED 0.85]
- **Target-role profile makeover flow** — readme_target_role_onboarding, readme_profile_makeover, readme_makeover_section_cards, readme_makeover_report_component, readme_makeover_ts, readme_photo_banner_screenshot_feedback [INFERRED 0.75]

## Communities (31 total, 10 thin omitted)

### Community 0 - "Governance: Checklist & Invariants"
Cohesion: 0.06
Nodes (57): .github/workflows/claude-review.yml (optional automated review), Changing an invariant, Checklist 1: it builds and passes checks, Checklist 2: the invariants still hold, Checklist 3: no secrets are committed, Checklist 4: it works in a browser, not just in CI, Checklist 4a: check the rendered result, not the edit, Checklist 4b: test on real data, not only on a fixture you wrote (+49 more)

### Community 1 - "Result UI & Makeover Report"
Cohesion: 0.07
Nodes (37): CopyButton(), MakeoverReport(), SectionCard(), Markdown(), OutputPanel(), Props, ProfileGaps(), Button() (+29 more)

### Community 2 - "BYOK Routing & Errors"
Cohesion: 0.09
Nodes (41): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+33 more)

### Community 3 - "AI Prompts"
Cohesion: 0.07
Nodes (38): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+30 more)

### Community 4 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 5 - "Onboarding & File Parsing"
Cohesion: 0.10
Nodes (22): Mode, LinkButton(), clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText() (+14 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 8 - "Privacy & Serverless Architecture"
Cohesion: 0.15
Nodes (17): What the Browser Stores, Anonymous device id (localStorage, header-only, for shared-key rate limits), /api/generate shared-key proxy, /api/trending cached trend feed, How it works (browser vs serverless diagram), Credits and trend data sources, Deploy your own (free), Feature: Post Generator (+9 more)

### Community 9 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 10 - "Contributor Guide & File Map"
Cohesion: 0.19
Nodes (13): Checklist 5: the no-key path still behaves, SetupBanner (no-key warning), src/lib/ai/prompts.ts (prompt builders), src/lib/trending.ts (trending sources), Good first contributions, Add your own feature (page + prompt recipe), Folder structure, MakeoverReport component (section cards for the profile review) (+5 more)

### Community 11 - "Features & Profile Makeover"
Cohesion: 0.17
Nodes (13): Convention: phones are the default (check at 375px), Feature: Message Writer, Feature: Onboarding (LinkedIn PDF drop or paste, target role), Feature: Profile Optimizer (gap check + section-by-section AI makeover), Features table, Makeover card: your original and the rewrite with its own Copy button, Makeover score and quick wins, Makeover cards: headline (3 options), About, each experience role, skills (+5 more)

### Community 12 - "Project Layout & Providers"
Cohesion: 0.29
Nodes (11): Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Project layout (task to file map), src/components/ui.tsx (shared UI primitives), src/lib/ai/client.ts (BYOK vs shared-key routing), src/lib/ai/providers/ (per-provider adapters), src/lib/config.ts (app name, providers, model catalog), src/lib/ratelimit.ts (shared-key limits) (+3 more)

### Community 13 - "Browser Storage & TTL"
Cohesion: 0.22
Nodes (11): DRAFT_TTL_MS (48 hour expiry), Invariant 4: everything in the browser has a TTL, 48-hour auto-clear of profile and drafts, BYOK: bring your own free key, called direct from the browser, Feature: My Drafts (48-hour countdown, Markdown export), Feature: Settings (BYOK keys, models, clear all data), Getting started (students), Lab computer tip: leave Remember my keys off and clear all data (+3 more)

### Community 14 - "Shared-Key Proxy & Rate Limits"
Cohesion: 0.25
Nodes (9): NO_STORE, POST(), bump(), checkSharedLimit(), GLOBAL, LimitResult, memory, PER_DEVICE (+1 more)

### Community 15 - "Rule-Based Checks & Roadmap"
Cohesion: 0.27
Nodes (10): Invariant 12: anything checkable without a model is checked without one, src/lib/ats.ts (rule-based ATS checks), src/lib/profile-gaps.ts (rule-based profile gap checks), Feature: Resume ATS Check, "What's missing from your profile" panel (13 checks, no AI call), Roadmap: compare with a strong profile (anonymised examples), Roadmap: cover-letter generator, Roadmap ideas (+2 more)

### Community 16 - "Project Identity & Workshop"
Cohesion: 0.24
Nodes (10): You don't need to contribute to use it (MIT, fork freely), Bug Report Issue Template, Feature Request Issue Template, Fork it and make it your own, MIT license, ProfilePolish, Run locally, Workshop tip: live demo reading a student's profile review aloud (+2 more)

### Community 17 - "Codebase Map Honesty"
Cohesion: 0.43
Nodes (7): Checklist 8: the codebase map is not stale, The codebase map (graphify-out snapshot), Map honesty rule 2: check one fact before committing it, Map honesty rule 1: regenerate after a docs change, not alongside one, A stale graph is documentation drift, not a build artefact, README codebase map section, graphify skill

### Community 18 - "Limitations"
Cohesion: 0.33
Nodes (6): src/lib/profile-parser.ts (LinkedIn PDF heuristics), Limitation: browser storage can be cleared, Limitation: free tiers have per-key daily limits, Limitation: no LinkedIn API, heuristic PDF parsing, Limitation: shared key is best-effort without Upstash, Limitations (honest list)

### Community 19 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Knowledge Gaps
- **119 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+114 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProfilePolish` connect `Project Identity & Workshop` to `Privacy & Serverless Architecture`, `Contributor Guide & File Map`, `Features & Profile Makeover`, `Project Layout & Providers`, `Browser Storage & TTL`, `Rule-Based Checks & Roadmap`, `Codebase Map Honesty`, `Limitations`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `CLAUDE.md — repo instructions for AI and human contributors` connect `Governance: Checklist & Invariants` to `Project Identity & Workshop`, `Codebase Map Honesty`, `Project Layout & Providers`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Hard invariants (twelve, never break these)` connect `Governance: Checklist & Invariants` to `Browser Storage & TTL`, `Rule-Based Checks & Roadmap`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Governance: Checklist & Invariants` be split into smaller, more focused modules?**
  _Cohesion score 0.05764411027568922 - nodes in this community are weakly interconnected._
- **Should `Result UI & Makeover Report` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.09411764705882353 - nodes in this community are weakly interconnected._