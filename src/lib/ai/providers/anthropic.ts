import Anthropic from "@anthropic-ai/sdk";
import type { ListModelsFn, StreamFn } from "./types";

export const streamAnthropic: StreamFn = async ({ apiKey, model, system, prompt, images, onToken, signal }) => {
  // The key is the student's own and stays in their browser; nothing is proxied.
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const content: Anthropic.Beta.Messages.BetaContentBlockParam[] = [
    ...(images ?? []).map((img) => ({
      type: "image" as const,
      source: {
        type: "base64" as const,
        media_type: img.mimeType as "image/png" | "image/jpeg" | "image/webp" | "image/gif",
        data: img.base64,
      },
    })),
    { type: "text" as const, text: prompt },
  ];

  // Server-side refusal fallbacks are only understood by the Opus 5 / Fable
  // generation; older models (Haiku 4.5, Sonnet 4.6) would reject the param.
  const supportsFallbacks = /^claude-(opus-5|fable)/.test(model);

  const stream = client.beta.messages.stream(
    {
      model,
      max_tokens: 16000,
      system,
      messages: [{ role: "user", content }],
      ...(supportsFallbacks
        ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
        : {}),
    },
    { signal },
  );

  let full = "";
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      full += event.delta.text;
      onToken(event.delta.text);
    }
  }
  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") {
    throw new Error("Claude declined this request. Try rephrasing or switch provider in Settings.");
  }
  return full;
};

export const listAnthropicModels: ListModelsFn = async (apiKey) => {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  const ids: string[] = [];
  for await (const m of client.models.list()) ids.push(m.id);
  return ids.sort();
};
