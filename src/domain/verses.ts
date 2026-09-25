import data from "@/generated/verses.json";

/** Every verse the site quotes, e.g. "21:30". A union of literals inferred from the generated JSON. */
export type VerseRef = keyof typeof data.verses;
export type Verse = (typeof data.verses)[VerseRef];

export const credit = data.credit;

export const isVerseRef = (s: string): s is VerseRef => Object.hasOwn(data.verses, s);

export const verse = (ref: VerseRef): Verse => data.verses[ref];

const surahs = new Map(Object.entries(data.surahs));

export function surahOf(v: Verse) {
  const s = surahs.get(String(v.surah));
  if (!s) throw new Error(`surah ${v.surah} missing from generated data`);
  return s;
}

/** Consecutive verses from..to in one surah. Throws during prerender if invalid, so the build fails. */
export function verseRange(from: VerseRef, to?: VerseRef): Verse[] {
  const first = verse(from);
  if (!to) return [first];
  const last = verse(to);
  if (first.surah !== last.surah || last.ayah <= first.ayah) throw new Error(`Bad verse range ${from}-${to}`);
  return Array.from({ length: last.ayah - first.ayah + 1 }, (_, i) => {
    const ref = `${first.surah}:${first.ayah + i}`;
    if (!isVerseRef(ref)) throw new Error(`Range ${from}-${to} includes unquoted verse ${ref}`);
    return verse(ref);
  });
}

/** "23:12–14" style label for a range. */
export const rangeLabel = (from: VerseRef, to?: VerseRef) => (to ? `${from}–${to.split(":")[1] ?? ""}` : from);
