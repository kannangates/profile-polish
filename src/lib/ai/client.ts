import { PROVIDER_BY_ID, type ProviderId } from "../config";
import { getActiveProvider, getDeviceId, getKey, getModel } from "../keys";
import type { GenerateRequest } from "../types";
import type { ListModelsFn, StreamFn } from "./providers/types";

export class QuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaError";
  }
}

// Each provider SDK is loaded only when that provider is actually used,
// so a Gemini user never downloads the OpenAI/Anthropic/Groq bundles.
const loaders: Record<ProviderId, () => Promise<StreamFn>> = {
  gemini: () => import("./providers/gemini").then((m) => m.streamGemini),
  groq: () => import("./providers/groq").then((m) => m.streamGroq),
  openai: () => import("./providers/openai").then((m) => m.streamOpenAI),
  anthropic: () => import("./providers/anthropic").then((m) => m.streamAnthropic),
};

export interface GenerateOptions extends GenerateRequest {
  onToken: (text: string) => void;
  signal?: AbortSignal;
}

export interface GenerateResult {
  text: string;
  via: "byok" | "shared";
  provider: string;
}

/**
 * BYOK: the browser talks to the provider directly with the student's key.
 * No key: fall back to /api/generate, which uses the app's shared free-tier key
 * with fair-use limits.
 */
export async function generate(opts: GenerateOptions): Promise<GenerateResult> {
  const active = getActiveProvider();

  if (active !== "shared") {
    const apiKey = getKey(active);
    if (apiKey) {
      const stream = await loaders[active]();
      const text = await stream({
        apiKey,
        model: getModel(active),
        system: opts.system,
        prompt: opts.prompt,
        images: opts.images,
        onToken: opts.onToken,
        signal: opts.signal,
      });
      return { text, via: "byok", provider: PROVIDER_BY_ID[active].name };
    }
  }

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "content-type": "application/json", "x-device-id": getDeviceId() },
    body: JSON.stringify({ system: opts.system, prompt: opts.prompt, images: opts.images } satisfies GenerateRequest),
    signal: opts.signal,
  });

  if (!res.ok) {
    const msg = (await res.text().catch(() => "")) || `Request failed (${res.status})`;
    if (res.status === 429 || res.status === 503) throw new QuotaError(msg);
    throw new Error(msg);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    const t = decoder.decode(value, { stream: true });
    full += t;
    opts.onToken(t);
  }
  return { text: full, via: "shared", provider: "Shared free key" };
}

const modelListers: Record<ProviderId, () => Promise<ListModelsFn>> = {
  gemini: () => import("./providers/gemini").then((m) => m.listGeminiModels),
  groq: () => import("./providers/groq").then((m) => m.listGroqModels),
  openai: () => import("./providers/openai").then((m) => m.listOpenAIModels),
  anthropic: () => import("./providers/anthropic").then((m) => m.listAnthropicModels),
};

/** Live model list from the provider, using the student's own key (browser → provider). */
export async function listModels(provider: ProviderId, apiKey: string): Promise<string[]> {
  const fn = await modelListers[provider]();
  return fn(apiKey);
}
