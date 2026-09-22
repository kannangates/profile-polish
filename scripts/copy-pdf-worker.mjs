// Copies the pdf.js worker into /public so it is served from our own origin.
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const pkg = dirname(require.resolve("pdfjs-dist/package.json"));
mkdirSync("public", { recursive: true });
copyFileSync(join(pkg, "build", "pdf.worker.min.mjs"), join("public", "pdf.worker.min.mjs"));
console.log("Copied pdf.worker.min.mjs to public/");
