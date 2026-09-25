/**
 * One-off: downloads the Qur'an text the site uses and writes src/data/quran.json (the output is committed).
 *   pnpm fetch-quran
 * Source: api.alquran.cloud, which serves the Tanzil project's Uthmani text (quran-uthmani).
 * The English meanings shown on the site live separately in src/data/translation.json.
 */
import { writeFileSync } from "node:fs";
import { type } from "arktype";

const Api = type({
  data: {
    surahs: type({
      number: "number.integer",
      name: "string",
      englishName: "string",
      englishNameTranslation: "string",
      revelationType: "string",
      ayahs: type({ numberInSurah: "number.integer", text: "string" }).array(),
    }).array(),
  },
});

const res = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani", { signal: AbortSignal.timeout(120_000) });
const { surahs } = Api.assert(await res.json()).data;

const clean = (t: string) => t.trim().replace(/^\uFEFF/, "");
// 1:1 exactly as the API encodes it. The API prefixes the basmala to verse 1 of every surah except 1 and 9.
const basmala = clean(surahs[0]?.ayahs[0]?.text ?? "");

const verses: Record<string, string> = {};
for (const s of surahs) {
  for (const a of s.ayahs) {
    let text = clean(a.text);
    if (a.numberInSurah === 1 && s.number !== 1 && basmala && text.startsWith(basmala)) text = text.slice(basmala.length).trim();
    verses[`${s.number}:${a.numberInSurah}`] = text;
  }
}

const out = new URL("../src/data/quran.json", import.meta.url);
writeFileSync(
  out,
  JSON.stringify({
    meta: { arabic: "Tanzil Uthmani text (tanzil.net), Ḥafṣ ʿan ʿĀṣim, Kufan verse numbering", source: "api.alquran.cloud" },
    surahs: surahs.map((s) => ({ n: s.number, name: s.name, english: s.englishName, meaning: s.englishNameTranslation, ayahs: s.ayahs.length, type: s.revelationType })),
    verses,
  }),
);
console.log(`wrote ${out.pathname}: ${surahs.length} surahs, ${Object.keys(verses).length} verses`);
