/**
 * Client-side text extraction. Files never leave the browser.
 * pdf.js runs in a web worker served from /pdf.worker.min.mjs (copied at install).
 */

export interface ExtractedLine {
  text: string;
  /** Font height of the first item on the line — the name in a LinkedIn PDF is the tallest. */
  height: number;
  page: number;
}

export async function extractPdfLines(file: File): Promise<ExtractedLine[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const lines: ExtractedLine[] = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    // Group items by their y coordinate so we get real lines back.
    let current: { y: number; parts: string[]; height: number } | null = null;
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const y = Math.round(item.transform[5]);
      const h = Math.abs(item.transform[3]) || Math.abs(item.transform[0]) || 0;
      if (current && Math.abs(current.y - y) <= 2) {
        current.parts.push(item.str);
      } else {
        if (current) lines.push({ text: current.parts.join("").trim(), height: current.height, page: p });
        current = { y, parts: [item.str], height: h };
      }
    }
    if (current) lines.push({ text: current.parts.join("").trim(), height: current.height, page: p });
  }
  return lines.filter((l) => l.text.length > 0);
}

export async function extractPdfText(file: File): Promise<string> {
  const lines = await extractPdfLines(file);
  return lines.map((l) => l.text).join("\n");
}

export async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value;
}

export async function extractResumeText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return extractPdfText(file);
  if (name.endsWith(".docx")) return extractDocxText(file);
  if (name.endsWith(".txt") || file.type.startsWith("text/")) return file.text();
  throw new Error("Please upload a PDF, DOCX or TXT file.");
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
