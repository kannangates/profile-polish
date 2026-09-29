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
 * How many rows to trim from each end of a crop. Image models sometimes leave
 * a strip along an edge; it may carry the same colours as the artwork, so it
 * can't be spotted by colour. What gives it away is a seam: a sudden jump
 * between two neighbouring rows, far sharper than anything inside the image.
 * `diffs[y]` is the mean brightness change between row y-1 and row y. Only
 * the outer 12% at each end is searched, so a busy image is never cut deeply.
 */
export function edgeBands(diffs: number[]): { top: number; bottom: number } {
  const n = diffs.length;
  const zone = Math.floor(n * 0.12);
  const sorted = diffs.slice(1).sort((a, b) => a - b);
  const typical = sorted[Math.floor(sorted.length / 2)] ?? 0;
  const threshold = Math.max(6, typical * 5);
  const seam = (from: number, to: number) => {
    let best = -1;
    for (let y = from; y < to; y++) if (diffs[y] > threshold && (best < 0 || diffs[y] > diffs[best])) best = y;
    return best;
  };
  const t = seam(1, zone + 1);
  const b = seam(n - zone, n);
  // Two extra rows either side of the seam: its edge is usually antialiased.
  return { top: t < 0 ? 0 : t + 2, bottom: b < 0 ? 0 : n - b + 2 };
}

/**
 * The model returns 21:9; LinkedIn wants 4:1. Crop the middle band, trim any
 * flat strip the model left along its top or bottom edge, and scale to
 * 1584 × 396. OffscreenCanvas keeps this entirely off the page's DOM.
 */
export async function cropToLinkedInBanner(base64: string, mimeType: string): Promise<Blob> {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const bitmap = await createImageBitmap(new Blob([bytes], { type: mimeType }));
  const target = BANNER_WIDTH / BANNER_HEIGHT;
  let srcH = Math.min(bitmap.height, bitmap.width / target);
  let sy = (bitmap.height - srcH) / 2;

  const full = new OffscreenCanvas(bitmap.width, bitmap.height);
  const fctx = full.getContext("2d");
  if (!fctx) throw new Error("This browser can't crop images.");
  fctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const h = Math.round(srcH);
  const w = full.width;
  const band = fctx.getImageData(0, Math.round(sy), w, h).data;
  const lum = (i: number) => 0.299 * band[i] + 0.587 * band[i + 1] + 0.114 * band[i + 2];
  const diffs = [0];
  for (let y = 1; y < h; y++) {
    let sum = 0;
    for (let x = 0; x < w; x++) sum += Math.abs(lum((y * w + x) * 4) - lum(((y - 1) * w + x) * 4));
    diffs.push(sum / w);
  }
  const { top, bottom } = edgeBands(diffs);
  sy += top;
  srcH -= top + bottom;
  const srcW = srcH * target;
  const sx = (full.width - srcW) / 2;

  const canvas = new OffscreenCanvas(BANNER_WIDTH, BANNER_HEIGHT);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser can't crop images.");
  ctx.drawImage(full, sx, sy, srcW, srcH, 0, 0, BANNER_WIDTH, BANNER_HEIGHT);
  return canvas.convertToBlob({ type: "image/png" });
}
