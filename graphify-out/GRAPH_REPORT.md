# Graph Report - /Users/kannan/Downloads/Code/side-project/linkedin-ai  (2026-09-22)

## Corpus Check
- Corpus is ~22,011 words - fits in a single context window. You may not need a graph.

## Summary
- 390 nodes · 721 edges · 30 communities (21 shown, 9 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.87)
- Token cost: 48,000 input · 9,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI Prompts|AI Prompts]]
- [[_COMMUNITY_BYOK Routing & Errors|BYOK Routing & Errors]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Browser Storage & Drafts|Browser Storage & Drafts]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Hard Invariants|Hard Invariants]]
- [[_COMMUNITY_Shared-Key Proxy & Rate Limits|Shared-Key Proxy & Rate Limits]]
- [[_COMMUNITY_Founding Constraints & Review Policy|Founding Constraints & Review Policy]]
- [[_COMMUNITY_Verification Checklist|Verification Checklist]]
- [[_COMMUNITY_Docs Structure & Contributing|Docs Structure & Contributing]]
- [[_COMMUNITY_Coding Conventions|Coding Conventions]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Privacy & Data Retention|Privacy & Data Retention]]
- [[_COMMUNITY_README Product Sections|README Product Sections]]
- [[_COMMUNITY_Codebase Map & Drift Guard|Codebase Map & Drift Guard]]
- [[_COMMUNITY_ATS Rule Engine|ATS Rule Engine]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Branching Policy|Branching Policy]]
- [[_COMMUNITY_Security Reporting|Security Reporting]]
- [[_COMMUNITY_Device ID & Rate Counting|Device ID & Rate Counting]]
- [[_COMMUNITY_Server Data Disclosure|Server Data Disclosure]]
- [[_COMMUNITY_Feature Request Template|Feature Request Template]]

## God Nodes (most connected - your core abstractions)
1. `Hard Invariants` - 17 edges
2. `compilerOptions` - 16 edges
3. `Pre-Merge Verification Checklist` - 13 edges
4. `useProfile()` - 11 edges
5. `Button()` - 10 edges
6. `Card()` - 10 edges
7. `useGenerate()` - 9 edges
8. `writeValue()` - 9 edges
9. `Badge()` - 8 edges
10. `readValue()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Running the Session: The Live Demo Lands Best` --semantically_similar_to--> `Checklist 4: It Works in a Browser, Not Just in CI`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Where Things Live Table (CONTRIBUTING)` --semantically_similar_to--> `Project Layout Task-to-File Table`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Adding an AI Provider` --conceptually_related_to--> `Coding Conventions`  [INFERRED]
  CONTRIBUTING.md → CLAUDE.md
- `Checklist 4b: Test on Real Data, Not Only on a Fixture` --semantically_similar_to--> `No LinkedIn API: PDF Export Is the Supported Path`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Bug Report Issue Template` --references--> `Settings (BYOK and Model Selection)`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Client-Side Privacy Guarantee Chain** — readme_byok, readme_privacy_model, readme_shared_key_proxy, docs_privacy_what_server_sees, docs_privacy_shared_key_disclosure, docs_privacy_anonymous_device_id, claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_5_session_storage_keys [INFERRED 0.85]
- **Client-Side Privacy Guarantee** — claude_constraint_no_server_data, claude_invariant_1_byok_direct, claude_invariant_2_student_content_client_side, claude_invariant_5_keys_default_session_storage, claude_invariant_9_no_content_capturing_analytics, readme_privacy_model [EXTRACTED 1.00]
- **Documentation Drift Guard for the Codebase Map** — claude_codebase_map, claude_regenerate_after_docs_change, claude_check_one_fact_before_committing, claude_checklist_8_codebase_map_not_stale, readme_codebase_map, claude_graphify_skill [EXTRACTED 1.00]
- **Verify in the Running App, Not in CI** — claude_checklist_4_works_in_a_browser, claude_checklist_4a_check_the_rendered_result, claude_checklist_4b_test_on_real_data, claude_checklist_5_no_key_path_behaves, claude_invariant_11_never_claim_saved_unless_confirmed [INFERRED 0.85]

## Communities (30 total, 9 thin omitted)

### Community 0 - "AI Prompts"
Cohesion: 0.10
Nodes (36): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+28 more)

### Community 1 - "BYOK Routing & Errors"
Cohesion: 0.11
Nodes (37): friendlyMessage(), generate(), GenerateResult, listModels(), loaders, modelListers, QuotaError, SetupSteps() (+29 more)

### Community 2 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 3 - "Onboarding & File Parsing"
Cohesion: 0.12
Nodes (20): Mode, OnboardingPage(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText(), fileToBase64() (+12 more)

### Community 4 - "Browser Storage & Drafts"
Cohesion: 0.15
Nodes (16): Props, clearEverything(), clearProfile(), ProfilePolishDB, saveDraft(), saveProfile(), analyseProfile(), Gap (+8 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 7 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 8 - "Hard Invariants"
Cohesion: 0.17
Nodes (15): Pull Request Checklist Template, Checklist 2: The Invariants Still Hold, Constraint: Student Data Must Never Reach the Server, Hard Invariants, Invariant 10: Don't Oversell, Invariant 1: BYOK Calls Go Browser to Provider Directly, Invariant 2: Student Content Stays Client-Side, Invariant 6: No Direct DOM Manipulation (+7 more)

### Community 9 - "Shared-Key Proxy & Rate Limits"
Cohesion: 0.21
Nodes (11): GenerateOptions, NO_STORE, POST(), bump(), checkSharedLimit(), GLOBAL, LimitResult, memory (+3 more)

### Community 10 - "Founding Constraints & Review Policy"
Cohesion: 0.18
Nodes (13): Automated Claude Review Workflow, Constraint: Usable in Under Two Minutes Without an Account, Constraint: Must Cost the Host Zero Rupees, Invariant 12: Anything Checkable Without a Model Is Checked Without One, Invariant 3: No Server-Side Database, No Accounts, No Auth, PR Review Priority Order, Good First Contributions, Getting Started (Students) (+5 more)

### Community 11 - "Verification Checklist"
Cohesion: 0.21
Nodes (13): Checklist 1: It Builds and Passes Checks, Checklist 3: No Secrets Are Committed, Checklist 4: It Works in a Browser, Not Just in CI, Checklist 4a: Check the Rendered Result, Not the Edit, Checklist 4b: Test on Real Data, Not Only on a Fixture, Checklist 5: The No-Key Path Still Behaves, Development Commands, Invariant 11: Never Claim Something Was Saved Unless Storage Confirms It (+5 more)

### Community 12 - "Docs Structure & Contributing"
Cohesion: 0.17
Nodes (12): Checklist 7: Docs Updated, Project Layout Task-to-File Table, Where Things Live Table (CONTRIBUTING), Add Your Own Feature (Page Plus Prompt), Anonymous Device ID, CONTRIBUTING.md, Deploy Your Own (Free), Folder Structure (+4 more)

### Community 13 - "Coding Conventions"
Cohesion: 0.18
Nodes (12): Convention: Branch and PR for Every Change, Convention: Provider SDKs Are Lazy-Loaded, Convention: Model IDs Go Stale, Convention: Phones Are the Default (375px Check), Coding Conventions, Running the Session: The Live Demo Lands Best, Model Defaults per Provider, Profile Optimizer (+4 more)

### Community 14 - "Trending Topics Feed"
Cohesion: 0.27
Nodes (8): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, GET()

### Community 15 - "Privacy & Data Retention"
Cohesion: 0.22
Nodes (10): Checklist 6: Privacy Claims Still True, DRAFT_TTL_MS (48 Hour Draft TTL), Invariant 4: Everything in the Browser Has a TTL, Invariant 5: Keys Default to sessionStorage, Invariant 9: No Analytics That Capture Page Content or User Input, docs/PRIVACY.md, What the Browser Stores, My Drafts (+2 more)

### Community 16 - "README Product Sections"
Cohesion: 0.24
Nodes (10): Shared-Key Data Handling Disclosure, Host Prohibitions, Bug Report Issue Template, BYOK Direct From Browser, Features Table, How It Works Architecture Diagram, Post Generator, Settings (BYOK and Model Selection) (+2 more)

### Community 17 - "Codebase Map & Drift Guard"
Cohesion: 0.33
Nodes (9): Check One Fact Before Committing the Map, Checklist 8: The Codebase Map Is Not Stale, The Codebase Map, graphify Skill, Regenerate After a Docs Change, Not Alongside One, Codebase Map (README Section), graphify-out/graph.html, graphify-out/graph.json (+1 more)

### Community 18 - "ATS Rule Engine"
Cohesion: 0.28
Nodes (7): AtsCheck, AtsReport, atsReportToText(), extractJdKeywords(), runAtsChecks(), STOP, tokenize()

### Community 19 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Ambiguous Edges - Review These
- `Invariant 3: No Server-Side Database, No Accounts, No Auth` → `Roadmap Ideas`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **99 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Invariant 3: No Server-Side Database, No Accounts, No Auth` and `Roadmap Ideas`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Hard Invariants` connect `Hard Invariants` to `Founding Constraints & Review Policy`, `Verification Checklist`, `Docs Structure & Contributing`, `Privacy & Data Retention`, `Codebase Map & Drift Guard`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Pre-Merge Verification Checklist` connect `Verification Checklist` to `Hard Invariants`, `Founding Constraints & Review Policy`, `Docs Structure & Contributing`, `Coding Conventions`, `Privacy & Data Retention`, `Codebase Map & Drift Guard`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Card()` connect `AI Prompts` to `BYOK Routing & Errors`, `Onboarding & File Parsing`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI Prompts` be split into smaller, more focused modules?**
  _Cohesion score 0.09783368273934312 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Errors` be split into smaller, more focused modules?**
  _Cohesion score 0.10531400966183575 - nodes in this community are weakly interconnected._