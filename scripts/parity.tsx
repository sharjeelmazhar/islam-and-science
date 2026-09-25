/**
 * One-off migration check: every sentence of an old page (src/pages/<slug>.html) must appear in the new TSX page.
 *   pnpm exec tsx scripts/parity.tsx cosmology earth …   (no args = all pages)
 * Shortcodes ({{verse}}, {{hadith}}, {{status}}) are ignored here; tsc checks those refs.
 */
import { readFileSync } from "node:fs";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { pages, isPageSlug } from "../src/content/registry";
import type { Page } from "../src/content/define";

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
// Block-level closing tags become line breaks so headings never merge into the following sentence.
const BLOCK = /<\/(p|h[1-6]|li|figcaption|blockquote|dt|dd|td|th|div|section|article|header|summary|legend)>/g;
const text = (html: string) =>
  decode(html.replace(BLOCK, "\n").replace(/<[^>]+>/g, " "))
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\s+([,.;:!?)”’])/g, "$1")
    .replace(/([(“‘]) /g, "$1")
    .trim();
const flat = (s: string) => s.replace(/\s+/g, " ");
const render = (n: ReactNode) => (n ? renderToStaticMarkup(<>{n}</>) : "");

let failed = 0;
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(pages);
for (const slug of slugs) {
  if (!isPageSlug(slug)) throw new Error(`unknown page ${slug}`);
  const page: Page = pages[slug];
  const raw = readFileSync(new URL(`../src/pages/${slug}.html`, import.meta.url), "utf8").replace(/^---[\s\S]*?---\n/, "");
  const old = text(
    raw
      .replace(/\{\{[^}]*\}\}/g, " ")
      .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
      // Visualisation and calculator controls are rebuilt as components; their labels are not prose.
      .replace(/<div class="(viz__controls|lab__body|lab__presets)"[\s\S]*?<\/div>\s*<\/div>/g, " "),
  );
  const parts: string[] = [page.title, page.description, ...(page.stats ?? []).flatMap((s) => [s.value, s.label])];
  for (const b of page.flow) {
    parts.push(b.title);
    if (b.kind === "section") parts.push(render(b.body));
    else {
      parts.push(b.lede ?? "", render(b.aside));
      for (const s of b.steps) parts.push(s.heading, render(s.gist), render(s.more));
    }
  }
  const now = flat(text(parts.join("\n")));
  const missing = old
    .split(/\n|(?<=[.!?”…])\s+(?=[A-Z“‘(0-9])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && !now.includes(flat(s)));
  if (missing.length) {
    failed++;
    console.log(`✗ ${slug}: ${missing.length} sentence(s) missing`);
    for (const m of missing.slice(0, 40)) console.log(`   · ${m.slice(0, 160)}`);
  } else console.log(`✓ ${slug}`);
}
process.exit(failed ? 1 : 0);
