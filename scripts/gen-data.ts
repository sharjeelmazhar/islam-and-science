/**
 * Validates the source JSON in src/data and writes src/generated/verses.json:
 * only the verses the site quotes (Arabic + English + link), so the 1.4 MB quran.json never ships.
 * Run by `pnpm gen` (and before dev, build and typecheck). Any bad data fails the run.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { type } from "arktype";

const read = (file: string): unknown => JSON.parse(readFileSync(new URL(`../src/data/${file}`, import.meta.url), "utf8"));

const Quran = type({
  meta: { arabic: "string", source: "string" },
  surahs: type({ n: "number.integer", name: "string", english: "string", meaning: "string", ayahs: "number.integer", type: "string" }).array(),
  verses: "Record<string, string>",
});
const Translation = type({
  meta: { credit: "string", note: "string", source_url: "string", verse_url: "string", slugs: "Record<string, string>" },
  verses: "Record<string, string>",
});
const Hadith = type({
  "[string]": { source: "string", url: "string", narrator: "string", text: "string", "grade?": "string", "note?": "string" },
});

const quran = Quran.assert(read("quran.json"));
const translation = Translation.assert(read("translation.json"));
Hadith.assert(read("hadith.json"));

const errors: string[] = [];
const surahs = new Map(quran.surahs.map((s) => [s.n, s]));

/** Link to the verse on dawateislami.net (Kanz-ul-Iman). Their Al-Fatihah numbering leaves the
 *  basmala unnumbered, so Kufan 1:n is their 1:(n-1); the basmala itself links to the surah page. */
function verseUrl(s: number, a: number): string {
  const slug = translation.meta.slugs[String(s)];
  if (!slug) {
    errors.push(`no dawateislami slug for surah ${s}`);
    return "";
  }
  if (s === 1) {
    if (a === 1) return `https://www.dawateislami.net/quran/${slug}/translation-4`;
    return translation.meta.verse_url.replace("{slug}", slug).replace("{ayah}", String(a - 1));
  }
  return translation.meta.verse_url.replace("{slug}", slug).replace("{ayah}", String(a));
}

const verses: Record<string, { ar: string; en: string; surah: number; ayah: number; url: string }> = {};
const usedSurahs: Record<string, { name: string; english: string; meaning: string }> = {};

for (const [ref, en] of Object.entries(translation.verses)) {
  const m = /^(\d+):(\d+)$/.exec(ref);
  const ar = quran.verses[ref];
  if (!m?.[1] || !m[2] || ar === undefined) {
    errors.push(`translation.json has ${ref}, which is not a verse in quran.json`);
    continue;
  }
  const s = Number(m[1]);
  const a = Number(m[2]);
  const surah = surahs.get(s);
  if (!surah) {
    errors.push(`unknown surah ${s}`);
    continue;
  }
  verses[ref] = { ar, en, surah: s, ayah: a, url: verseUrl(s, a) };
  usedSurahs[String(s)] = { name: surah.name, english: surah.english, meaning: surah.meaning };
}

if (errors.length) {
  console.error(errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}

mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../src/generated/verses.json", import.meta.url),
  JSON.stringify({ credit: translation.meta.credit, surahs: usedSurahs, verses }, null, 1),
);
console.log(`gen: ${Object.keys(verses).length} verses, ${Object.keys(usedSurahs).length} surahs`);
