/** LinkedIn's recommended background image size. */
export const BANNER_WIDTH = 1584;
export const BANNER_HEIGHT = 396;

export type BannerStyle = "gradient" | "abstract" | "scene";

export const BANNER_STYLES: Record<BannerStyle, { label: string; prompt: string }> = {
  gradient: {
    label: "Clean gradient",
    prompt: "a smooth, modern two- or three-colour gradient with subtle geometric accents; calm and corporate.",
  },
  abstract: {
    label: "Abstract shapes",
    prompt: "abstract flowing shapes and lines that loosely suggest the field of work; modern, confident, not busy.",
  },
  scene: {
    label: "Workplace scene",
    prompt: "a softly blurred, photographic scene of a workplace or tools typical of the role, with no people in it.",
  },
};

export interface BannerRequest {
  role: string;
  tagline?: string;
  style?: BannerStyle;
}

export interface BannerResponse {
  mimeType: string;
  base64: string;
  remaining: number;
}

/**
 * The model returns 21:9; LinkedIn wants 4:1. Crop the middle band and scale
 * to 1584 × 396. OffscreenCanvas keeps this entirely off the page's DOM.
 */
export async function cropToLinkedInBanner(base64: string, mimeType: string): Promise<Blob> {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const bitmap = await createImageBitmap(new Blob([bytes], { type: mimeType }));
  const target = BANNER_WIDTH / BANNER_HEIGHT;
  const srcH = Math.min(bitmap.height, bitmap.width / target);
  const srcW = srcH * target;
  const sx = (bitmap.width - srcW) / 2;
  const sy = (bitmap.height - srcH) / 2;

  const canvas = new OffscreenCanvas(BANNER_WIDTH, BANNER_HEIGHT);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser can't crop images.");
  ctx.drawImage(bitmap, sx, sy, srcW, srcH, 0, 0, BANNER_WIDTH, BANNER_HEIGHT);
  bitmap.close();
  return canvas.convertToBlob({ type: "image/png" });
}
