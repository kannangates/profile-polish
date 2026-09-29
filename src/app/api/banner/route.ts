import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { BANNER_STYLES, type BannerRequest, type BannerStyle } from "@/lib/banner";
import { BANNER_PER_DEVICE, bannerRemaining, checkBannerLimit, refundBanner } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const NO_STORE = { "cache-control": "no-store" };

/**
 * LinkedIn banner generator — the one paid feature (CLAUDE.md, "The paid
 * exception"). It receives only a target role, an optional tagline and a
 * style; never the profile. Nothing is logged or stored.
 */
function enabled() {
  return process.env.BANNER_ENABLED === "true" && Boolean(process.env.GEMINI_API_KEY);
}

function who(req: NextRequest) {
  return {
    deviceId: req.headers.get("x-device-id")?.slice(0, 64) || "anon",
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
  };
}

export async function GET(req: NextRequest) {
  if (!enabled()) return Response.json({ enabled: false, remaining: 0, limit: 0 }, { headers: NO_STORE });
  return Response.json({ enabled: true, remaining: await bannerRemaining(who(req).deviceId), limit: BANNER_PER_DEVICE }, { headers: NO_STORE });
}

/**
 * The model's widest ratio is 21:9; the browser crops the middle to 4:1
 * (1584 × 396). The prompt keeps content inside that band and right of
 * centre, because LinkedIn puts the profile photo over the lower left.
 * Describing that corner, or a "plain left third", made the model draw a
 * placeholder box or a split panel — so the prompt only asks for focus
 * right of centre.
 */
function bannerPrompt(role: string, tagline: string, style: BannerStyle) {
  return `Create background artwork for a LinkedIn profile banner, for a professional whose target role is: ${role}.
The image IS the artwork itself, filling the whole frame edge to edge. Do not draw a LinkedIn page, a profile layout, a photo placeholder, circles or boxes for a photo, panels, borders, bars, UI elements or any mock-up.
Visual style: ${BANNER_STYLES[style].prompt}

Layout rules — the image will be cropped to a 4:1 strip (1584 × 396 pixels):
- Keep every important element inside a horizontal band across the middle 55% of the image height. The top and bottom will be cut off.
- One continuous, seamless composition across the whole width: no split panels, dividers, hard edges or blocks of flat colour.
- Place the visual focus and any text right of centre.
- Balanced, uncluttered, high contrast, readable at small phone sizes.

Content rules:
- No people, faces, hands or silhouettes of people.
- No logos, brand names, trademarks, watermarks, signatures or frames.
${tagline ? `- Include this text exactly once, spelled exactly, large and legible, placed right of centre: "${tagline}". No other text.` : "- No text, letters or numbers anywhere in the image."}`;
}

export async function POST(req: NextRequest) {
  if (!enabled()) {
    return new Response("Banner generation isn't turned on for this deployment.", { status: 503, headers: NO_STORE });
  }

  let body: BannerRequest;
  try {
    body = (await req.json()) as BannerRequest;
  } catch {
    return new Response("Invalid request", { status: 400, headers: NO_STORE });
  }
  const role = typeof body?.role === "string" ? body.role.trim().slice(0, 80) : "";
  const tagline = typeof body?.tagline === "string" ? body.tagline.replace(/["\n]/g, "").trim().slice(0, 60) : "";
  const style: BannerStyle = body?.style && body.style in BANNER_STYLES ? body.style : "gradient";
  if (!role) return new Response("Add your target role first.", { status: 400, headers: NO_STORE });

  const { deviceId, ip } = who(req);
  const limit = await checkBannerLimit(deviceId, ip);
  if (!limit.ok) return new Response(limit.reason, { status: 429, headers: NO_STORE });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const res = await ai.models.generateContent({
      model: process.env.BANNER_MODEL ?? "gemini-3.1-flash-lite-image",
      contents: bannerPrompt(role, tagline, style),
      config: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "21:9" }, abortSignal: req.signal },
    });
    const image = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData;
    if (!image?.data) throw new Error("No image in response");
    return Response.json({ mimeType: image.mimeType ?? "image/png", base64: image.data, remaining: limit.remaining ?? 0 }, { headers: NO_STORE });
  } catch (err) {
    await refundBanner(deviceId, ip);
    const msg = err instanceof Error ? err.message : "";
    // Image models have no free tier, so an unbilled key fails here.
    const unavailable = /billing|free tier|FAILED_PRECONDITION|PERMISSION_DENIED|429|quota|RESOURCE_EXHAUSTED/i.test(msg);
    return new Response(
      unavailable ? "Banner generation isn't available on this deployment right now. Your daily banners weren't used." : "The image service returned an error. Your daily banners weren't used — try again.",
      { status: unavailable ? 503 : 502, headers: NO_STORE },
    );
  }
}
