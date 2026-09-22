export const APP_NAME = "CareerLift";
export const APP_TAGLINE = "Free LinkedIn & resume coach for students";

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
  },
];

export const PROVIDER_BY_ID = Object.fromEntries(
  PROVIDERS.map((p) => [p.id, p]),
) as Record<ProviderId, ProviderInfo>;
