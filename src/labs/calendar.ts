/** Mean tropical year, in days. */
export const SOLAR = 365.2422;
/** Twelve mean synodic months, in days. */
export const LUNAR = 354.36707;

/** Converts solar years to lunar years (Qur'an 18:25: 300 solar ≈ 309 lunar). Negative or invalid input counts as 0. */
export function solarToLunar(years: number) {
  const solar = Math.max(0, years || 0);
  const lunar = (solar * SOLAR) / LUNAR;
  return { solar, lunar, gain: lunar - solar, days: solar * SOLAR };
}
