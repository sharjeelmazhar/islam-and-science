/** Placeholder until the R3F orbits scene lands. `start` picks the initial frame of reference. */
export function OrbitsViz({ start = "helio" }: { start?: "helio" | "geo" | "galactic" }) {
  return <div data-start={start} className="aspect-[16/10] w-full border border-rule" />;
}
