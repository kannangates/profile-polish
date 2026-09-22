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

/**
 * Providers surface failures as raw JSON or SDK stack messages. Students need
 * to know which of the few things that matter went wrong, and what to do.
 */
function friendlyMessage(providerName: string, err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();
  if (/api[_ ]?key[_ ]?(not valid|invalid)|invalid[_ ]api[_ ]key|unauthorized|401|permission_denied|authentication/.test(lower)) {
    return `That ${providerName} key was rejected. Open Settings and check you pasted the whole key, and that it still exists in your ${providerName} account.`;
  }
  if (/quota|rate.?limit|resource_exhausted|429|too many requests/.test(lower)) {
    return `This key has hit its limit for now. Wait a few minutes, or add a second free key (Groq) in Settings and switch to it.`;
  }
  if (/failed to fetch|networkerror|load failed|econnrefused|network error|fetch failed/.test(lower)) {
    return `Couldn't reach ${providerName}. Check your internet connection and try again.`;
  }
  if (/model/.test(lower) && /not found|404|not supported|does not exist|unsupported/.test(lower)) {
    return `The model chosen in Settings isn't available on this key. Pick another one, or use "Load models from ${providerName}".`;
  }
  if (/safety|blocked|refus/.test(lower)) {
    return `${providerName} declined to answer this one. Try rephrasing what you asked for.`;
  }
  return `${providerName} returned an error: ${raw.slice(0, 300)}`;
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
      const providerName = PROVIDER_BY_ID[active].name;
      try {
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
        return { text, via: "byok", provider: providerName };
      } catch (err) {
        if (opts.signal?.aborted) throw err;
        throw new Error(friendlyMessage(providerName, err));
      }
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
