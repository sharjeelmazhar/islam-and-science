export type Heir = { name: string; share: readonly [numerator: number, denominator: number] };

/** al-Minbariyya: the case ʿAlī answered from the pulpit, where the Qur'anic shares add up to more than the estate. */
export const MINBARIYYA = [
  { name: "Wife", share: [1, 8] },
  { name: "Two daughters", share: [2, 3] },
  { name: "Father", share: [1, 6] },
  { name: "Mother", share: [1, 6] },
] as const satisfies readonly Heir[];

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * Proportional reduction (ʿawl). Shares are put over a common base (the lowest common denominator);
 * if the parts add up to more than the base, every heir gets `part / sum` instead of `part / base`.
 */
export function awl<const H extends Heir>(heirs: readonly H[]) {
  const base = heirs.reduce((l, h) => (l * h.share[1]) / gcd(l, h.share[1]), 1);
  const rows = heirs.map((h) => ({ ...h, part: (h.share[0] * base) / h.share[1] }));
  const sum = rows.reduce((s, r) => s + r.part, 0);
  return { base, sum, excess: sum - base, rows };
}
