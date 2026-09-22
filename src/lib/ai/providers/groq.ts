import Groq from "groq-sdk";
import type { ListModelsFn, StreamFn } from "./types";

export const streamGroq: StreamFn = async ({ apiKey, model, system, prompt, images, onToken, signal }) => {
  // The key is the student's own and stays in their browser; nothing is proxied.
  const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  const content: Groq.Chat.ChatCompletionContentPart[] = [
    ...(images ?? []).map((img) => ({
      type: "image_url" as const,
      image_url: { url: `data:${img.mimeType};base64,${img.base64}` },
    })),
    { type: "text" as const, text: prompt },
  ];
  const stream = await client.chat.completions.create(
    {
      model,
      stream: true,
      messages: [
        { role: "system", content: system },
        { role: "user", content },
      ],
    },
    { signal },
  );
  let full = "";
  for await (const chunk of stream) {
    const t = chunk.choices[0]?.delta?.content ?? "";
    if (t) {
      full += t;
      onToken(t);
    }
  }
  return full;
};

export const listGroqModels: ListModelsFn = async (apiKey) => {
  const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  const res = await client.models.list();
  return res.data
    .map((m) => m.id)
    .filter((id) => !/whisper|tts|orpheus|guard|playai|safeguard|embedding/i.test(id))
    .sort();
};
