const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** 26 → "10²⁶ m", -3 → "10⁻³ m". */
export function scaleLabel(scale: number): string {
  const n = Math.round(scale);
  const digits = String(Math.abs(n)).replace(/\d/g, (d) => SUP[Number(d)] ?? d);
  return `10${n < 0 ? "⁻" : ""}${digits} m`;
}
