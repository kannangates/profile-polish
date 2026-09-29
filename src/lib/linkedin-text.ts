/**
 * LinkedIn's About, experience and post boxes are plain text: pasted Markdown
 * shows up as literal "- " and "**". Convert what the model writes into what
 * a student would type by hand — ✔ bullets, no markup, same line breaks.
 */
const BULLET = "✔";
const SUB_BULLET = "–";
// A model sometimes writes "- ✔️ Did X"; don't turn that into "✔ ✔️ Did X".
const LEADING_GLYPH = /^(✔️|✔|✓|☑️|✅|•|▪|►|➤)\s*/u;

function inline(s: string) {
  return s
    .replace(/\[([^\]]+)\]\((\S+?)\)/g, "$1 ($2)")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])\*(?!\s)(.+?)(?<!\s)\*(?=[^\w*]|$)/g, "$1$2")
    .replace(/(^|[^\w])_(?!\s)(.+?)(?<!\s)_(?=[^\w]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1");
}

export function toLinkedInText(markdown: string): string {
  const out = markdown.split("\n").map((raw) => {
    const line = raw.replace(/\s+$/, "");
    if (/^\s*(```|---+|\*\*\*+|___+)\s*$/.test(line)) return "";
    const heading = line.match(/^\s*#{1,6}\s+(.*)$/);
    if (heading) return inline(heading[1]);
    const bullet = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (bullet) {
      const text = inline(bullet[2]).replace(LEADING_GLYPH, "");
      return bullet[1].length >= 2 ? `   ${SUB_BULLET} ${text}` : `${BULLET} ${text}`;
    }
    return inline(line.replace(/^\s*>\s?/, ""));
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
