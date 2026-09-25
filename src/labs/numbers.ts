/** Trial division; fine up to the prime checker's 10^12 limit. */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

/** Prime factors with repetition, ascending: 6236 → [2, 2, 1559]. Empty for n < 2. */
export function factorise(n: number): number[] {
  const out: number[] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    while (m % p === 0) {
      out.push(p);
      m /= p;
    }
  }
  if (m > 1) out.push(m);
  return out;
}

export type PrimePower = { p: number; k: number };

/** Factors grouped into powers: 6236 → 2² × 1559. */
export function primePowers(n: number): PrimePower[] {
  const powers: PrimePower[] = [];
  for (const p of factorise(n)) {
    const last = powers.at(-1);
    if (last?.p === p) last.k++;
    else powers.push({ p, k: 1 });
  }
  return powers;
}

export const PRIME_MAX = 1e12;

export type NumberCheck =
  | { ok: false }
  | { ok: true; n: number; kind: "prime" | "composite" | "unit"; factors: PrimePower[]; nineteen: number | null };

/** Reads the prime checker's input: whole numbers 1 to 10^12 (decimals are floored). */
export function checkNumber(raw: string): NumberCheck {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1 || n > PRIME_MAX) return { ok: false };
  return {
    ok: true,
    n,
    kind: isPrime(n) ? "prime" : n === 1 ? "unit" : "composite",
    factors: primePowers(n),
    nineteen: n % 19 === 0 ? n / 19 : null,
  };
}

/** Standard (Mashriqi) abjad values. Conventions: ة = 5, ى = 10, ء = 1; hamza carriers take their carrier's value. */
const ABJAD = new Map(
  Object.entries({
    ا: 1, أ: 1, إ: 1, آ: 1, ٱ: 1, ء: 1, ب: 2, ج: 3, د: 4, ه: 5, ة: 5, و: 6, ؤ: 6, ز: 7,
    ح: 8, ط: 9, ي: 10, ى: 10, ئ: 10, ك: 20, ل: 30, م: 40, ن: 50, س: 60, ع: 70, ف: 80,
    ص: 90, ق: 100, ر: 200, ش: 300, ت: 400, ث: 500, خ: 600, ذ: 700, ض: 800, ظ: 900, غ: 1000,
  }),
);

// Diacritics, Qur'anic annotation marks (incl. the superscript alif) and tatweel.
const MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;

export type AbjadLetter = { ch: string; v: number };

/** The counted letters of an Arabic text with their values; everything else is ignored. */
export function abjadLetters(text: string): AbjadLetter[] {
  // Code points, not grapheme clusters: marks are already stripped, so each code point is one letter.
  return Array.from(text.normalize("NFC").replace(MARKS, "")).flatMap((ch) => {
    const v = ABJAD.get(ch);
    return v === undefined ? [] : [{ ch, v }];
  });
}

/** Abjad total plus the facts the calculator reports about it. */
export function abjad(text: string) {
  const letters = abjadLetters(text);
  const total = letters.reduce((s, l) => s + l.v, 0);
  return {
    letters,
    total,
    factors: total > 1 ? primePowers(total) : [],
    prime: isPrime(total),
    remainder19: total % 19,
  };
}
