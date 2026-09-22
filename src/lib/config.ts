export const APP_NAME = "ProfilePolish";
export const APP_TAGLINE = "Polish your LinkedIn profile & resume";

/** Drafts and the parsed profile auto-clear after this long. */
export const DRAFT_TTL_MS = 48 * 60 * 60 * 1000;

export type ProviderId = "gemini" | "groq" | "openai" | "anthropic";

export interface ModelOption {
  id: string;
  label: string;
  /** Short note shown next to the model in Settings. */
  note?: string;
}

export interface ProviderInfo {
  id: ProviderId;
  name: string;
  defaultModel: string;
  /** Curated list as of Sep 2026. Settings can also load the live list from the provider. */
  models: ModelOption[];
  keyUrl: string;
  keyHint: string;
  free: boolean;
  /** Roughly how long getting a key takes, shown on the setup card. */
  setupTime: string;
  /** Step-by-step instructions shown in Settings. */
  setupSteps: string[];
  /** Expected start of a valid key — used only to warn about paste mistakes. */
  keyPrefix: string;
  keyPlaceholder: string;
  /** Extra warning shown under the steps, e.g. "needs a card". */
  setupWarning?: string;
}

export const PROVIDERS: ProviderInfo[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    defaultModel: "gemini-3.8-flash",
    models: [
      { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash", note: "Best quality on the free tier" },
      { id: "gemini-3.5-flash-lite", label: "Gemini 3.5 Flash-Lite", note: "Fastest, most generous free quota" },
      { id: "gemini-3.5-flash", label: "Gemini 3.5 Flash" },
      { id: "gemini-3.1-flash-lite", label: "Gemini 3.1 Flash-Lite" },
      { id: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro (preview)", note: "Low free-tier limits" },
    ],
    keyUrl: "https://aistudio.google.com/apikey",
    keyHint: "Free tier, no card needed. Best default for students.",
    free: true,
    setupTime: "about 1 minute",
    keyPrefix: "AIza",
    keyPlaceholder: "AIza…",
    setupSteps: [
      "Open Google AI Studio and sign in with any Google account (your college Gmail works).",
      "If it asks, accept the terms — you do NOT need to enter a credit card.",
      "Click the blue **Create API key** button.",
      "Choose **Create API key in new project** (or pick an existing project if you have one).",
      "Your key appears — it starts with `AIza`. Click the copy icon.",
      "Come back here, paste it in the box below and click **Save**.",
    ],
  },
  {
    id: "groq",
    name: "Groq",
    defaultModel: "openai/gpt-oss-120b",
    models: [
      { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B", note: "Best quality on Groq" },
      { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B" },
      { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B" },
      { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B", note: "Fastest, biggest free quota" },
      { id: "qwen/qwen3.8-27b", label: "Qwen 3.8 27B (preview)" },
    ],
    keyUrl: "https://console.groq.com/keys",
    keyHint: "Free tier, very fast responses. No image support on most models.",
    free: true,
    setupTime: "about 2 minutes",
    keyPrefix: "gsk_",
    keyPlaceholder: "gsk_…",
    setupSteps: [
      "Open the Groq console and sign in with Google or GitHub (no card needed).",
      "Go to **API Keys** in the left menu.",
      "Click **Create API Key**.",
      "Give it any name, e.g. `ProfilePolish`, and submit.",
      "Copy the key — it starts with `gsk_`. **Groq shows it only once**, so copy it now.",
      "Come back here, paste it below and click **Save**.",
    ],
    setupWarning: "Groq shows the key only once. If you lose it, just create another — they're free.",
  },
  {
    id: "openai",
    name: "OpenAI (ChatGPT)",
    defaultModel: "gpt-5.6-luna",
    models: [
      { id: "gpt-5.6-luna", label: "GPT-5.6 Luna", note: "Cheapest" },
      { id: "gpt-5.6-terra", label: "GPT-5.6 Terra" },
      { id: "gpt-5.6-sol", label: "GPT-5.6 Sol" },
      { id: "gpt-6-astra", label: "GPT-6 Astra", note: "Most capable, most expensive" },
    ],
    keyUrl: "https://platform.openai.com/api-keys",
    keyHint: "Paid — needs a card on the OpenAI account.",
    free: false,
    setupTime: "about 5 minutes",
    keyPrefix: "sk-",
    keyPlaceholder: "sk-…",
    setupSteps: [
      "Open the OpenAI platform and sign in.",
      "Go to **Settings → Billing** and add a payment method, then buy a small amount of credit. OpenAI has no free API tier, so keys won't work without credit.",
      "Go to **API keys** and click **Create new secret key**.",
      "Name it, create it, then copy the key — it starts with `sk-` and is shown only once.",
      "Come back here, paste it below and click **Save**.",
    ],
    setupWarning: "This costs real money from your own account. If you're a student, use Google Gemini or Groq instead — they're free.",
  },
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    defaultModel: "claude-haiku-4-5",
    models: [
      { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", note: "Cheapest, fast" },
      { id: "claude-sonnet-5", label: "Claude Sonnet 5" },
      { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
      { id: "claude-opus-5", label: "Claude Opus 5", note: "Most capable, most expensive" },
    ],
    keyUrl: "https://console.anthropic.com/settings/keys",
    keyHint: "Paid — needs credits on the Anthropic account.",
    free: false,
    setupTime: "about 5 minutes",
    keyPrefix: "sk-ant-",
    keyPlaceholder: "sk-ant-…",
    setupSteps: [
      "Open the Anthropic Console and sign in.",
      "Go to **Plans & Billing** and buy credits. There's no free API tier, so a key won't work without credit.",
      "Go to **API keys** and click **Create Key**.",
      "Name it, create it, then copy the key — it starts with `sk-ant-` and is shown only once.",
      "Come back here, paste it below and click **Save**. Claude Haiku 4.5 is preselected as the cheapest option.",
    ],
    setupWarning: "This costs real money from your own account. If you're a student, use Google Gemini or Groq instead — they're free.",
  },
];

export const PROVIDER_BY_ID = Object.fromEntries(
  PROVIDERS.map((p) => [p.id, p]),
) as Record<ProviderId, ProviderInfo>;
