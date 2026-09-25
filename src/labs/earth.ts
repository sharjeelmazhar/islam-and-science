/** Airy isostasy: the crustal root needed to float a mountain of height h (km) on denser mantle. Densities in g/cm³. */
export function isostasy(h: number, rhoCrust: number, rhoMantle: number) {
  const root = (h * rhoCrust) / (rhoMantle - rhoCrust);
  return { root, ratio: root / Math.max(h, 0.01) };
}

/** Cross-section drawing constants, in SVG units (viewBox 800 × 600). */
export const SECTION = { width: 800, height: 600, scale: 5, sea: 80, crust: 35, cx: 400 } as const;

/** Geometry of the mountain-and-root cross-section for height h and root depth, both in km. */
export function crossSection(h: number, root: number) {
  const { scale, sea, crust, cx } = SECTION;
  const crustBase = sea + crust * scale;
  const base = 70 + h * 20;
  const halfRoot = base * 0.55;
  const peak = sea - h * scale;
  const bottom = crustBase + root * scale;
  const crustPath = `M0 ${sea} L${cx - base} ${sea} L${cx} ${peak} L${cx + base} ${sea} L800 ${sea} L800 ${crustBase} L${cx + halfRoot + 60} ${crustBase} Q${cx + halfRoot * 0.5} ${bottom} ${cx} ${bottom} Q${cx - halfRoot * 0.5} ${bottom} ${cx - halfRoot - 60} ${crustBase} L0 ${crustBase} Z`;
  return { crustBase, base, halfRoot, peak, bottom, crustPath };
}
