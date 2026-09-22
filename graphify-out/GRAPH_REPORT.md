# Graph Report - /Users/kannan/Downloads/Code/side-project/linkedin-ai  (2026-09-22)

## Corpus Check
- Corpus is ~22,306 words - fits in a single context window. You may not need a graph.

## Summary
- 419 nodes · 785 edges · 24 communities (15 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.86)
- Token cost: 62,000 input · 11,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_Governance Checklist & Invariants|Governance: Checklist & Invariants]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Rule-Based Checks & Honesty|Rule-Based Checks & Honesty]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Shared-Key Proxy & Rate Limits|Shared-Key Proxy & Rate Limits]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_PR Template & CI|PR Template & CI]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Device ID & Rate Counting|Device ID & Rate Counting]]
- [[_COMMUNITY_Shared-Key Data Disclosure|Shared-Key Data Disclosure]]
- [[_COMMUNITY_Host Prohibitions|Host Prohibitions]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]

## God Nodes (most connected - your core abstractions)
1. `Hard invariants (twelve, never break these)` - 19 edges
2. `compilerOptions` - 16 edges
3. `Pre-merge verification checklist` - 14 edges
4. `ProfilePolish` - 12 edges
5. `useProfile()` - 11 edges
6. `Button()` - 10 edges
7. `Card()` - 10 edges
8. `useGenerate()` - 9 edges
9. `writeValue()` - 9 edges
10. `Badge()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Report security issues via private GitHub advisory` --semantically_similar_to--> `Invariant 8: no secret in client code or commits`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Project layout (task to file map)` --semantically_similar_to--> `Where things live (task to file map)`  [INFERRED] [semantically similar]
  CLAUDE.md → CONTRIBUTING.md
- `Checklist 4b: test on real data, not only on a fixture you wrote` --semantically_similar_to--> `Limitation: no LinkedIn API, heuristic PDF parsing`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Vercel Hobby zero-cost hosting` --implements--> `Constraint 1: it must cost the host zero rupees`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Client-Side Privacy Guarantee Chain** — readme_byok, readme_privacy_model, readme_shared_key_proxy, docs_privacy_what_server_sees, docs_privacy_shared_key_disclosure, docs_privacy_anonymous_device_id, claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_5_session_storage_keys [INFERRED 0.85]
- **Cross-device sync: the one recorded invariant-change candidate** — readme_roadmap_cross_device_sync, claude_optional_accounts_cross_device_sync, claude_changing_an_invariant, claude_invariant_3_no_server_database_no_accounts_no_auth, claude_invariant_2_student_content_stays_client_side, claude_constraint_1_zero_host_cost, claude_constraint_3_two_minute_no_account_use, contributing_rule_zero_cost_stays_zero_cost [EXTRACTED 1.00]
- **Keeping the committed codebase map honest** — claude_codebase_map, claude_rule_regenerate_after_docs_change, claude_rule_check_one_fact_before_committing, claude_stale_graph_is_documentation_drift, claude_checklist_8_codebase_map_not_stale, readme_codebase_map, readme_graphify_skill [EXTRACTED 1.00]
- **The BYOK privacy chain (key never leaves the browser)** — claude_invariant_1_byok_browser_to_provider_direct, claude_invariant_2_student_content_stays_client_side, claude_invariant_5_keys_default_to_sessionstorage, claude_src_lib_keys_ts, claude_src_lib_ai_client_ts, readme_byok_direct_from_browser, readme_privacy_model, readme_api_generate_shared_key_proxy [INFERRED 0.85]

## Communities (24 total, 9 thin omitted)

### Community 0 - "AI Prompts"
Cohesion: 0.06
Nodes (54): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+46 more)

### Community 1 - "Governance: Checklist & Invariants"
Cohesion: 0.05
Nodes (69): .github/workflows/claude-review.yml (optional automated review), Changing an invariant, Checklist 1: it builds and passes checks, Checklist 2: the invariants still hold, Checklist 3: no secrets are committed, Checklist 4: it works in a browser, not just in CI, Checklist 4a: check the rendered result, not the edit, Checklist 5: the no-key path still behaves (+61 more)

### Community 2 - "BYOK Routing & Errors"
Cohesion: 0.10
Nodes (40): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+32 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 4 - "Onboarding & File Parsing"
Cohesion: 0.11
Nodes (22): Mode, OnboardingPage(), clearProfile(), saveProfile(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText() (+14 more)

### Community 5 - "Rule-Based Checks & Honesty"
Cohesion: 0.10
Nodes (27): Checklist 4b: test on real data, not only on a fixture you wrote, Invariant 10: don't oversell, Invariant 12: anything checkable without a model is checked without one, src/lib/ats.ts (rule-based ATS checks), src/lib/profile-gaps.ts (rule-based profile gap checks), src/lib/profile-parser.ts (LinkedIn PDF heuristics), src/lib/trending.ts (trending sources), Good first contributions (+19 more)

### Community 6 - "Coding Conventions"
Cohesion: 0.11
Nodes (23): Convention: browser-only reads happen after hydration, Convention: provider SDKs are lazy-loaded, Convention: model ids go stale, Convention: Server Components by default, Invariant 5: keys default to sessionStorage, Invariant 7: prompts must forbid invention, src/lib/ai/client.ts (BYOK vs shared-key routing), src/lib/ai/prompts.ts (prompt builders) (+15 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 9 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 10 - "Trending Topics Feed"
Cohesion: 0.22
Nodes (10): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, Filter (+2 more)

### Community 11 - "Shared-Key Proxy & Rate Limits"
Cohesion: 0.25
Nodes (9): NO_STORE, POST(), bump(), checkSharedLimit(), GLOBAL, LimitResult, memory, PER_DEVICE (+1 more)

### Community 12 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 13 - "Branching Policy"
Cohesion: 0.67
Nodes (3): Convention: branch and PR for every change, Convention: never delete a branch without the owner asking, Branching (feat/fix/docs, PR against main)

## Ambiguous Edges - Review These
- `Naming rule: refer to a rule by what it says, not only by its number` → `PR review priority order`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **100 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Naming rule: refer to a rule by what it says, not only by its number` and `PR review priority order`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Hard invariants (twelve, never break these)` connect `Governance: Checklist & Invariants` to `Rule-Based Checks & Honesty`, `Coding Conventions`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Pre-merge verification checklist` connect `Governance: Checklist & Invariants` to `Rule-Based Checks & Honesty`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `ProfilePolish` connect `Rule-Based Checks & Honesty` to `Governance: Checklist & Invariants`, `Coding Conventions`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _105 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI Prompts` be split into smaller, more focused modules?**
  _Cohesion score 0.061052631578947365 - nodes in this community are weakly interconnected._
- **Should `Governance: Checklist & Invariants` be split into smaller, more focused modules?**
  _Cohesion score 0.05413469735720375 - nodes in this community are weakly interconnected._