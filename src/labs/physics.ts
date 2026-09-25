import { fmt } from "./format";

/** Speed of light, km/s. */
export const C = 299792.458;
/** The dilation slider stops short of c. */
export const BETA_MAX = 0.9999;
const YEAR_S = 365.25 * 86400;

export const DILATION_PRESETS = [
  { label: "International Space Station (7.66 km/s)", beta: 0.0000255 },
  { label: "Parker Solar Probe (≈ 192 km/s)", beta: 0.00064 },
  { label: "Half light speed", beta: 0.5 },
  { label: "99% of light speed", beta: 0.99 },
  { label: "99.99%", beta: 0.9999 },
] as const;

/** Lorentz factor γ = 1 / √(1 − β²). */
export const lorentz = (beta: number) => 1 / Math.sqrt(1 - beta * beta);

/** Human-readable dilation figures for speed β (fraction of c), worded as the old lab printed them. */
export function dilation(beta: number) {
  const gamma = lorentz(beta);
  const kms = beta * C;
  const perYear = (gamma - 1) * YEAR_S; // seconds of Earth time gained per traveller-year
  const extra =
    perYear < 1e-3
      ? `${fmt(perYear * 1e6, 3)} microseconds`
      : perYear < 1
        ? `${fmt(perYear * 1e3, 3)} milliseconds`
        : perYear < 86400 * 2
          ? `${fmt(perYear / 3600, 2)} hours`
          : `${fmt(perYear / YEAR_S, 2)} years`;
  return {
    gamma,
    perYear,
    gammaText: gamma < 1e4 ? fmt(gamma, 6) : gamma.toExponential(3),
    speedText: `${fmt(kms, kms < 100 ? 3 : 0)} km/s`,
    betaText: beta < 0.001 ? beta.toExponential(2) : fmt(beta, 9),
    extra,
  };
}

/** How long light takes to reach us from each object. Figures are rounded, as quoted on the page. */
export const LIGHT_OBJECTS = [
  { name: "The Moon", time: "1.3 seconds", note: "The Moon, at an average 384,400 km." },
  { name: "The Sun", time: "8 minutes 20 seconds", note: "The Sun, at 1 astronomical unit (149.6 million km). If it vanished, we would not know for over eight minutes." },
  { name: "Jupiter", time: "33 – 53 minutes", note: "Jupiter. The figure depends on where Earth and Jupiter are in their orbits." },
  { name: "Neptune", time: "about 4 hours", note: "Neptune, the outermost planet, about 30 AU from the Sun." },
  { name: "Voyager 1", time: "almost 1 day", note: "Voyager 1, the most distant spacecraft, launched 1977. It reaches one light-day from Earth in late 2026." },
  { name: "Proxima Centauri", time: "4.24 years", note: "Proxima Centauri, the nearest star to the Sun." },
  { name: "Sirius", time: "8.6 years", note: "Sirius, the brightest star in the night sky, named in Qur’an 53:49." },
  { name: "Vega", time: "25 years", note: "Vega, from Arabic al-wāqiʿ, “the swooping [eagle]”." },
  { name: "Betelgeuse", time: "about 550 years", note: "Betelgeuse, the red supergiant in Orion. Its distance is uncertain; estimates range roughly 500–650 light-years." },
  { name: "Orion Nebula", time: "about 1,340 years", note: "The Orion Nebula, a stellar nursery of gas and dust. The light we see left it around the 680s CE, a few decades after the lifetime of the Prophet ﷺ." },
  { name: "Centre of the Milky Way", time: "about 26,000 years", note: "The centre of our galaxy, home of the black hole Sagittarius A*." },
  { name: "Andromeda Galaxy", time: "about 2.5 million years", note: "The Andromeda Galaxy, the most distant object easily visible to the naked eye. First recorded by the Muslim astronomer al-Ṣūfī in 964." },
  { name: "Most distant galaxies known", time: "about 13.5 billion years", note: "The most distant galaxies seen by the James Webb Space Telescope, as they were a few hundred million years after the Big Bang." },
] as const;
