/**
 * Kinematics for the frames-of-reference model (ported from the original site's orbits.js).
 * Circular, coplanar orbits with real periods. Distances are in AU; sizes and the Moon's distance
 * are exaggerated so they can be seen (the page says so).
 */
export type Vec3 = readonly [number, number, number];
export type Frame = "helio" | "geo" | "galactic";
export type BodyId = "sun" | "mercury" | "venus" | "earth" | "mars" | "moon";

type Orbit = { a: number; P: number; phase: number };
export const PLANETS = {
  mercury: { a: 0.387, P: 87.969, phase: 1.2, r: 0.017, color: "#b9ab98" },
  venus: { a: 0.723, P: 224.701, phase: 3.9, r: 0.028, color: "#e9d3a2" },
  earth: { a: 1.0, P: 365.256, phase: 0, r: 0.03, color: "#6aa6de" },
  mars: { a: 1.524, P: 686.98, phase: 0.6, r: 0.023, color: "#d9774b" },
} as const satisfies Record<string, Orbit & { r: number; color: string }>;
export const MOON = { a: 0.15, P: 27.3217, phase: 0, r: 0.011, color: "#d8d6d0" } as const;
export const SUN = { r: 0.1, color: "#f5c866" } as const;

export const CAPTIONS = {
  helio:
    "Sun-centred frame. Strictly, this is centred on the Solar System’s centre of mass, which lies close to the Sun. Earth completes one orbit in 365.25 days and the Moon circles Earth every 27.3 days. Planet sizes and the Moon’s distance are enlarged so they can be seen.",
  geo: "Earth-centred frame. These are the same motions, described with Earth held still. The Sun now circles Earth once a year, and Mars and Venus trace loops (retrograde motion). Ptolemy modelled those loops with epicycles. Both descriptions predict the same positions in the sky, and they differ in which one physics finds simpler.",
  galactic:
    "Travelling through the galaxy. The Sun carries its planets around the centre of the Milky Way at roughly 230 km/s, so each planet’s real path is a stretched helix. The forward motion is slowed about 10× here so the spirals are visible. At true proportions each turn would be about 48 AU long. The tilt of the orbital plane is illustrative.",
} as const satisfies Record<Frame, string>;

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];

function circle(o: Orbit, days: number): Vec3 {
  const ang = o.phase + (2 * Math.PI * days) / o.P;
  return [Math.cos(ang) * o.a, 0, -Math.sin(ang) * o.a];
}

// Galactic frame: orbital plane tilted 60° about x; the system moves along +x, 10× compressed.
const TILT = (60 * Math.PI) / 180;
const SUN_SPEED = 48.5 / 10 / 365.256;
const tilt = ([x, y, z]: Vec3): Vec3 => [x, y * Math.cos(TILT) - z * Math.sin(TILT), y * Math.sin(TILT) + z * Math.cos(TILT)];

/** Where every body is after `days`, described in the given frame. */
export function positions(frame: Frame, days: number): Record<BodyId, Vec3> {
  const helio = {
    mercury: circle(PLANETS.mercury, days),
    venus: circle(PLANETS.venus, days),
    earth: circle(PLANETS.earth, days),
    mars: circle(PLANETS.mars, days),
  };
  const moon = circle(MOON, days);
  switch (frame) {
    case "helio":
      return { sun: [0, 0, 0], ...helio, moon: add(helio.earth, moon) };
    case "geo": {
      const e = helio.earth;
      return {
        sun: sub([0, 0, 0], e),
        mercury: sub(helio.mercury, e),
        venus: sub(helio.venus, e),
        earth: [0, 0, 0],
        mars: sub(helio.mars, e),
        moon,
      };
    }
    case "galactic": {
      const s: Vec3 = [SUN_SPEED * days, 0, 0];
      return {
        sun: s,
        mercury: add(s, tilt(helio.mercury)),
        venus: add(s, tilt(helio.venus)),
        earth: add(s, tilt(helio.earth)),
        mars: add(s, tilt(helio.mars)),
        moon: add(add(s, tilt(helio.earth)), tilt(moon)),
      };
    }
  }
}

/** The point the camera follows in each frame. */
export const focus = (frame: Frame, p: Record<BodyId, Vec3>): Vec3 => (frame === "galactic" ? p.sun : [0, 0, 0]);
