# Graph Report - /Users/kannan/Downloads/Code/side-project/linkedin-ai  (2026-09-22)

## Corpus Check
- Corpus is ~21,596 words - fits in a single context window. You may not need a graph.

## Summary
- 351 nodes · 676 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.9)
- Token cost: 96,000 input · 12,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Rules & Invariants|Project Rules & Invariants]]
- [[_COMMUNITY_AI Prompts & Feature Pages|AI Prompts & Feature Pages]]
- [[_COMMUNITY_BYOK Routing & Error Handling|BYOK Routing & Error Handling]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Onboarding & PDF Parsing|Onboarding & PDF Parsing]]
- [[_COMMUNITY_Shared UI & Drafts|Shared UI & Drafts]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Shared-Key Proxy & Rate Limits|Shared-Key Proxy & Rate Limits]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Unused Boilerplate Assets|Unused Boilerplate Assets]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Ten Hard Invariants` - 15 edges
3. `useProfile()` - 11 edges
4. `Button()` - 10 edges
5. `Card()` - 10 edges
6. `useGenerate()` - 9 edges
7. `writeValue()` - 9 edges
8. `Badge()` - 8 edges
9. `readValue()` - 8 edges
10. `getKey()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Where Things Live Table (CONTRIBUTING)` --semantically_similar_to--> `Task-to-File Map (CLAUDE.md)`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Branching Policy (CONTRIBUTING)` --semantically_similar_to--> `Branch-and-PR Workflow`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Feature Request Issue Template` --references--> `ProfilePolish`  [EXTRACTED]
  .github/ISSUE_TEMPLATE/feature_request.md → README.md
- `ProfilePolish` --implements--> `Invariant 10: Don't Oversell`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **The Ten Hard Invariants** — claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_3_no_server_db, claude_invariant_4_ttl, claude_invariant_5_session_storage_keys, claude_invariant_6_no_dom_manipulation, claude_invariant_7_prompts_forbid_invention, claude_invariant_8_no_secrets, claude_invariant_9_no_content_analytics, claude_invariant_10_dont_oversell [EXTRACTED 1.00]
- **Pre-Merge Verification Flow** — claude_pre_merge_checklist, claude_browser_verification, claude_pr_review_priority_order, workflows_ci_check_job, workflows_claude_review_review_job, _github_pull_request_template_checklist [INFERRED 0.85]
- **Client-Side Privacy Guarantee Chain** — readme_byok, readme_privacy_model, readme_shared_key_proxy, docs_privacy_what_server_sees, docs_privacy_shared_key_disclosure, docs_privacy_anonymous_device_id, claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_5_session_storage_keys [INFERRED 0.85]

## Communities (18 total, 4 thin omitted)

### Community 0 - "Project Rules & Invariants"
Cohesion: 0.06
Nodes (56): Pull Request Checklist Template, Optional Automated Claude Review, Branch-and-PR Workflow, Browser Verification Requirement, Code Conventions, Invariant 10: Don't Oversell, Invariant 1: BYOK Calls Go Browser to Provider Directly, Invariant 2: Student Content Stays Client-Side (+48 more)

### Community 1 - "AI Prompts & Feature Pages"
Cohesion: 0.08
Nodes (42): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+34 more)

### Community 2 - "BYOK Routing & Error Handling"
Cohesion: 0.10
Nodes (40): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+32 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 4 - "Onboarding & PDF Parsing"
Cohesion: 0.12
Nodes (20): Mode, OnboardingPage(), extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText(), fileToBase64() (+12 more)

### Community 5 - "Shared UI & Drafts"
Cohesion: 0.15
Nodes (16): CopyButton(), Markdown(), Props, Button(), DraftsPage(), TYPE_LABEL, clearEverything(), clearProfile() (+8 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 8 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 9 - "Shared-Key Proxy & Rate Limits"
Cohesion: 0.25
Nodes (9): NO_STORE, POST(), bump(), checkSharedLimit(), GLOBAL, LimitResult, memory, PER_DEVICE (+1 more)

### Community 10 - "Trending Topics Feed"
Cohesion: 0.27
Nodes (8): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, GET()

### Community 11 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 12 - "Unused Boilerplate Assets"
Cohesion: 0.60
Nodes (5): File/Document Icon (unused Next.js boilerplate asset), Globe/World Icon (unused Next.js boilerplate asset), Next.js Wordmark Logo (unused create-next-app asset), Vercel Triangle Logo (unused create-next-app asset), Browser Window Icon (unused Next.js boilerplate asset)

## Knowledge Gaps
- **89 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Card()` connect `AI Prompts & Feature Pages` to `BYOK Routing & Error Handling`, `Onboarding & PDF Parsing`, `Shared UI & Drafts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Button()` connect `Shared UI & Drafts` to `AI Prompts & Feature Pages`, `BYOK Routing & Error Handling`, `Onboarding & PDF Parsing`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `useProfile()` connect `AI Prompts & Feature Pages` to `Onboarding & PDF Parsing`, `Shared UI & Drafts`, `App Shell & Banners`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Rules & Invariants` be split into smaller, more focused modules?**
  _Cohesion score 0.06428571428571428 - nodes in this community are weakly interconnected._
- **Should `AI Prompts & Feature Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.0803633822501747 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Error Handling` be split into smaller, more focused modules?**
  _Cohesion score 0.09714285714285714 - nodes in this community are weakly interconnected._