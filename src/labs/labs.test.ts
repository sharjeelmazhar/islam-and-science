import { describe, expect, test } from "vitest";
import { solarToLunar } from "./calendar";
import { awl, MINBARIYYA } from "./inheritance";
import { abjad, checkNumber, factorise, isPrime, primePowers } from "./numbers";
import { C, dilation, LIGHT_OBJECTS } from "./physics";
import { isostasy } from "./earth";

describe("primes", () => {
  test("isPrime edge cases", () => {
    expect([0, 1, 2, 3, 4, 19, 1559].map(isPrime)).toEqual([false, false, true, true, false, true, true]);
    expect(isPrime(-7)).toBe(false);
    expect(isPrime(2.5)).toBe(false);
    expect(isPrime(999_999_999_989)).toBe(true); // largest 12-digit prime
  });

  test("factorise and prime powers", () => {
    expect(factorise(1)).toEqual([]);
    expect(factorise(97)).toEqual([97]);
    expect(factorise(6236)).toEqual([2, 2, 1559]);
    expect(primePowers(1024)).toEqual([{ p: 2, k: 10 }]);
    expect(primePowers(6236)).toEqual([{ p: 2, k: 2 }, { p: 1559, k: 1 }]);
  });

  test("checkNumber reads the checker input", () => {
    expect(checkNumber("6236")).toMatchObject({ ok: true, kind: "composite", nineteen: null });
    expect(checkNumber("114")).toMatchObject({ ok: true, nineteen: 6 });
    expect(checkNumber("19.9")).toMatchObject({ ok: true, n: 19, kind: "prime" });
    expect(checkNumber("1")).toMatchObject({ ok: true, kind: "unit" });
    for (const bad of ["", "0", "abc", "1e13"]) expect(checkNumber(bad)).toEqual({ ok: false });
  });
});

describe("abjad", () => {
  test.each([
    ["الحديد", 57],
    ["حديد", 26],
    ["الله", 66],
    ["محمد", 92],
  ])("%s = %i", (word, total) => expect(abjad(word).total).toBe(total));

  test("basmala is 786 over 19 letters, with or without diacritics", () => {
    for (const text of ["بسم الله الرحمن الرحيم", "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"]) {
      const b = abjad(text);
      expect(b.total).toBe(786);
      expect(b.letters).toHaveLength(19);
    }
  });

  test("conventions: ة = 5, ى = 10, ء = 1; tatweel and Latin ignored", () => {
    expect(abjad("ةىء").total).toBe(16);
    expect(abjad("مـحـمـد abc").total).toBe(92);
  });
});

test("300 solar years are 309.2 lunar years", () => {
  expect(solarToLunar(300).lunar).toBeCloseTo(309.2, 1);
  expect(solarToLunar(-5).solar).toBe(0);
});

test("al-Minbariyya: shares over 24 add up to 27", () => {
  const r = awl(MINBARIYYA);
  expect(r.base).toBe(24);
  expect(r.rows.map((h) => h.part)).toEqual([3, 16, 4, 4]);
  expect(r.sum).toBe(27);
  expect(r.excess).toBe(3);
});

describe("physics", () => {
  test("time dilation", () => {
    expect(dilation(0.8)).toMatchObject({ gammaText: "1.666667", speedText: "239,834 km/s", extra: "0.67 years" });
    expect(dilation(0.0000255)).toMatchObject({ betaText: "2.55e-5", extra: "10.26 milliseconds" });
  });

  test("quoted light times agree with c", () => {
    const time = (name: string) => LIGHT_OBJECTS.find((o) => o.name === name)?.time;
    expect(time("The Moon")).toBe(`${(384_400 / C).toFixed(1)} seconds`);
    expect(Math.round(149.6e6 / C / 10) * 10).toBe(8 * 60 + 20);
    expect(time("The Sun")).toBe("8 minutes 20 seconds");
  });
});

test("Airy isostasy root", () => {
  const { root, ratio } = isostasy(8.8, 2.8, 3.3);
  expect(root).toBeCloseTo(49.28, 2);
  expect(ratio).toBeCloseTo(5.6, 2);
});
