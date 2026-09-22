# Graph Report - /Users/kannan/Downloads/Code/side-project/linkedin-ai  (2026-09-22)

## Corpus Check
- Corpus is ~21,562 words - fits in a single context window. You may not need a graph.

## Summary
- 352 nodes · 690 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.89)
- Token cost: 153,000 input · 14,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Rules & Invariants|Project Rules & Invariants]]
- [[_COMMUNITY_BYOK Routing & Error Handling|BYOK Routing & Error Handling]]
- [[_COMMUNITY_AI Prompts & Feature Pages|AI Prompts & Feature Pages]]
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_Onboarding & File Parsing|Onboarding & File Parsing]]
- [[_COMMUNITY_Shared UI & Drafts|Shared UI & Drafts]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Shell & Banners|App Shell & Banners]]
- [[_COMMUNITY_Provider Adapters|Provider Adapters]]
- [[_COMMUNITY_Trending Topics Feed|Trending Topics Feed]]
- [[_COMMUNITY_Shared-Key Proxy & Rate Limits|Shared-Key Proxy & Rate Limits]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_PDF Worker Install Script|PDF Worker Install Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `Twelve Hard Invariants` - 17 edges
2. `compilerOptions` - 16 edges
3. `useProfile()` - 11 edges
4. `Button()` - 10 edges
5. `Card()` - 10 edges
6. `Pre-Merge Verification Checklist` - 10 edges
7. `useGenerate()` - 9 edges
8. `writeValue()` - 9 edges
9. `Badge()` - 8 edges
10. `readValue()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Where Things Live Table (CONTRIBUTING)` --semantically_similar_to--> `Task-to-File Map (CLAUDE.md)`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Branching Policy (CONTRIBUTING)` --semantically_similar_to--> `Branch-and-PR Workflow`  [INFERRED] [semantically similar]
  CONTRIBUTING.md → CLAUDE.md
- `Tech Stack and Folder Structure` --conceptually_related_to--> `Code Conventions`  [INFERRED]
  README.md → CLAUDE.md
- `Bug Report Issue Template` --references--> `ProfilePolish`  [INFERRED]
  .github/ISSUE_TEMPLATE/bug_report.md → README.md
- `Feature Request Issue Template` --references--> `ProfilePolish`  [EXTRACTED]
  .github/ISSUE_TEMPLATE/feature_request.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **The Twelve Hard Invariants** — claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_3_no_server_db, claude_invariant_4_ttl, claude_invariant_5_session_storage_keys, claude_invariant_6_no_dom_manipulation, claude_invariant_7_prompts_forbid_invention, claude_invariant_8_no_secrets, claude_invariant_9_no_content_analytics, claude_invariant_10_dont_oversell, claude_invariant_11_storage_confirmed_save, claude_invariant_12_rule_based_first [EXTRACTED 1.00]
- **Pre-Merge Verification Flow** — claude_pre_merge_checklist, claude_browser_verification, claude_check_rendered_result, claude_test_on_real_data, claude_pr_review_priority_order, workflows_ci_check_job, workflows_claude_review_review_job, _github_pull_request_template_checklist [INFERRED 0.85]
- **Client-Side Privacy Guarantee Chain** — readme_byok, readme_privacy_model, readme_shared_key_proxy, docs_privacy_what_server_sees, docs_privacy_shared_key_disclosure, docs_privacy_anonymous_device_id, claude_invariant_1_byok_direct, claude_invariant_2_client_side_content, claude_invariant_5_session_storage_keys [INFERRED 0.85]

## Communities (17 total, 4 thin omitted)

### Community 0 - "Project Rules & Invariants"
Cohesion: 0.06
Nodes (62): Pull Request Checklist Template, Optional Automated Claude Review, Branch-and-PR Workflow, Browser Verification Requirement, Check the Rendered Result, Not the Edit, Code Conventions, Invariant 10: Don't Oversell, Invariant 11: Never Claim a Save Unless Storage Confirms It (+54 more)

### Community 1 - "BYOK Routing & Error Handling"
Cohesion: 0.10
Nodes (40): friendlyMessage(), generate(), GenerateOptions, GenerateResult, listModels(), loaders, modelListers, QuotaError (+32 more)

### Community 2 - "AI Prompts & Feature Pages"
Cohesion: 0.08
Nodes (38): atsPrompt(), MESSAGE_KINDS, MessageKind, messagePrompt(), postPrompt(), profileBlock(), profileOptimizePrompt(), resumeFixPrompt() (+30 more)

### Community 3 - "Dependencies & Build Config"
Cohesion: 0.05
Nodes (40): dependencies, @anthropic-ai/sdk, dexie, dexie-react-hooks, @google/genai, groq-sdk, mammoth, next (+32 more)

### Community 4 - "Onboarding & File Parsing"
Cohesion: 0.11
Nodes (21): Mode, FileDrop(), Props, extractDocxText(), ExtractedLine, extractPdfLines(), extractPdfText(), extractResumeText() (+13 more)

### Community 5 - "Shared UI & Drafts"
Cohesion: 0.14
Nodes (17): CopyButton(), Markdown(), Props, Button(), Spinner(), DraftsPage(), TYPE_LABEL, clearEverything() (+9 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "App Shell & Banners"
Cohesion: 0.19
Nodes (9): AppShell(), NAV, isDismissed(), PrivacyBanner(), SetupBanner(), purgeExpired(), hasAnyKey(), useIsClient() (+1 more)

### Community 8 - "Provider Adapters"
Cohesion: 0.18
Nodes (4): ImageInput, ListModelsFn, StreamFn, StreamParams

### Community 9 - "Trending Topics Feed"
Cohesion: 0.22
Nodes (10): devTo(), EVERGREEN_TOPICS, fetchTrends(), googleTrends(), hackerNews(), REVALIDATE, Trend, Filter (+2 more)

### Community 10 - "Shared-Key Proxy & Rate Limits"
Cohesion: 0.25
Nodes (9): NO_STORE, POST(), bump(), checkSharedLimit(), GLOBAL, LimitResult, memory, PER_DEVICE (+1 more)

### Community 11 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Knowledge Gaps
- **89 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Card()` connect `AI Prompts & Feature Pages` to `Trending Topics Feed`, `Onboarding & File Parsing`, `Shared UI & Drafts`, `BYOK Routing & Error Handling`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Button()` connect `Shared UI & Drafts` to `Trending Topics Feed`, `AI Prompts & Feature Pages`, `Onboarding & File Parsing`, `BYOK Routing & Error Handling`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Rules & Invariants` be split into smaller, more focused modules?**
  _Cohesion score 0.06292966684294024 - nodes in this community are weakly interconnected._
- **Should `BYOK Routing & Error Handling` be split into smaller, more focused modules?**
  _Cohesion score 0.09568627450980392 - nodes in this community are weakly interconnected._
- **Should `AI Prompts & Feature Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.08421985815602837 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._