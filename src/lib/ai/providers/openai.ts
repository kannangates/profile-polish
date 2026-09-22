import OpenAI from "openai";
import type { ListModelsFn, StreamFn } from "./types";

export const streamOpenAI: StreamFn = async ({ apiKey, model, system, prompt, images, onToken, signal }) => {
  // The key is the student's own and stays in their browser; nothing is proxied.
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const content: OpenAI.Responses.ResponseInputContent[] = [
    ...(images ?? []).map((img) => ({
      type: "input_image" as const,
      image_url: `data:${img.mimeType};base64,${img.base64}`,
      detail: "auto" as const,
    })),
    { type: "input_text" as const, text: prompt },
  ];
  const stream = await client.responses.create(
    {
      model,
      instructions: system,
      input: [{ role: "user", content }],
      stream: true,
    },
    { signal },
  );
  let full = "";
  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      full += event.delta;
      onToken(event.delta);
    }
  }
  return full;
};

export const listOpenAIModels: ListModelsFn = async (apiKey) => {
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const ids: string[] = [];
  for await (const m of client.models.list()) {
    if (!/^(gpt|o\d)/.test(m.id)) continue;
    if (/realtime|audio|tts|transcribe|image|embedding|search|moderation|instruct|codex|computer/i.test(m.id)) continue;
    ids.push(m.id);
  }
  return ids.sort();
};
