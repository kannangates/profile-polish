import { GoogleGenAI, type Part } from "@google/genai";
import type { ListModelsFn, StreamFn } from "./types";

export const streamGemini: StreamFn = async ({ apiKey, model, system, prompt, images, onToken, signal }) => {
  const ai = new GoogleGenAI({ apiKey });
  const parts: Part[] = [
    ...(images ?? []).map((img) => ({ inlineData: { mimeType: img.mimeType, data: img.base64 } })),
    { text: prompt },
  ];
  const stream = await ai.models.generateContentStream({
    model,
    contents: [{ role: "user", parts }],
    config: { systemInstruction: system, abortSignal: signal },
  });
  let full = "";
  for await (const chunk of stream) {
    const t = chunk.text;
    if (t) {
      full += t;
      onToken(t);
    }
  }
  return full;
};

export const listGeminiModels: ListModelsFn = async (apiKey) => {
  const ai = new GoogleGenAI({ apiKey });
  const pager = await ai.models.list();
  const ids: string[] = [];
  for await (const m of pager) {
    const id = (m.name ?? "").replace(/^models\//, "");
    const actions = m.supportedActions ?? [];
    if (!id || !actions.includes("generateContent")) continue;
    if (/embedding|image|imagen|veo|tts|audio|live|omni|aqa/i.test(id)) continue;
    ids.push(id);
  }
  return ids.sort();
};
