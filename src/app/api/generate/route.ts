import { GoogleGenAI, type Part } from "@google/genai";
import { NextRequest } from "next/server";
import { checkSharedLimit } from "@/lib/ratelimit";
import { SHARED_KEY_MESSAGES, sharedKeyState } from "@/lib/shared-key";
import type { GenerateRequest } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const NO_STORE = { "cache-control": "no-store" };

/**
 * Shared-key fallback. Only used when the student has not added their own key.
 * The shared key lives in an env var and never reaches the browser.
 * Nothing about the request is logged or stored.
 */
export async function POST(req: NextRequest) {
  const state = sharedKeyState();
  if (state !== "on") return new Response(SHARED_KEY_MESSAGES[state], { status: 503, headers: NO_STORE });
  const apiKey = process.env.GEMINI_API_KEY;

  const deviceId = req.headers.get("x-device-id")?.slice(0, 64) || "anon";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = await checkSharedLimit(deviceId, ip);
  if (!limit.ok) return new Response(limit.reason, { status: 429, headers: NO_STORE });

  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return new Response("Invalid request", { status: 400, headers: NO_STORE });
  }
  if (!body?.prompt || typeof body.prompt !== "string" || body.prompt.length > 40000) {
    return new Response("Prompt missing or too long", { status: 400, headers: NO_STORE });
  }
  const images = (body.images ?? []).slice(0, 2).filter((i) => i.base64.length < 6_000_000);

  const ai = new GoogleGenAI({ apiKey });
  const parts: Part[] = [
    ...images.map((img) => ({ inlineData: { mimeType: img.mimeType, data: img.base64 } })),
    { text: body.prompt },
  ];

  let upstream: AsyncGenerator<{ text?: string }>;
  try {
    upstream = await ai.models.generateContentStream({
      model: process.env.SHARED_MODEL ?? "gemini-3.8-flash",
      contents: [{ role: "user", parts }],
      config: { systemInstruction: body.system, abortSignal: req.signal },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upstream error";
    const quota = /429|quota|RESOURCE_EXHAUSTED/i.test(msg);
    return new Response(
      quota ? "The shared free key hit its provider quota. Add your own free API key in Settings to continue." : "The AI provider returned an error. Please try again.",
      { status: quota ? 429 : 502, headers: NO_STORE },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of upstream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n[Stream interrupted — please try again]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { ...NO_STORE, "content-type": "text/plain; charset=utf-8", "x-shared-remaining": String(limit.remaining ?? 0) },
  });
}
