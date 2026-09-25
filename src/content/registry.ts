import type { Page, Part, Topic } from "./define";
import approach from "./pages/approach";
import knowledge from "./pages/knowledge";
import cosmology from "./pages/cosmology";
import deepSpace from "./pages/deep-space";
import celestialMotion from "./pages/celestial-motion";
import earthsMotion from "./pages/earths-motion";
import earth from "./pages/earth";
import life from "./pages/life";
import embryology from "./pages/embryology";
import physics from "./pages/physics";
import mathematics from "./pages/mathematics";
import scholars from "./pages/scholars";
import myths from "./pages/myths";
import references from "./pages/references";
import about from "./pages/about";

/** Every content page, in journey order: outward through the horizons, inward through the self, then measure and integrity. */
export const pages = {
  approach,
  knowledge,
  cosmology,
  "deep-space": deepSpace,
  "celestial-motion": celestialMotion,
  "earths-motion": earthsMotion,
  earth,
  life,
  embryology,
  physics,
  mathematics,
  scholars,
  myths,
  references,
  about,
} as const satisfies Record<string, Page>;

export type PageSlug = keyof typeof pages;

export const isPageSlug = (s: string): s is PageSlug => Object.hasOwn(pages, s);

export const PARTS = {
  start: "Start here",
  horizons: "The Horizons",
  selves: "Within the Self",
  measure: "Measure & History",
  integrity: "Integrity",
} as const satisfies Record<Part, string>;

export const pageList: readonly Page[] = Object.values(pages);

/** The page after/before `slug` in journey order. */
export function neighbours(slug: string) {
  const i = pageList.findIndex((p) => p.slug === slug);
  return { prev: pageList[i - 1], next: pageList[i + 1] };
}

export const topicsOf = (p: Page): Topic[] => p.flow.filter((b): b is Topic => b.kind === "topic");

/** Flat list of every graded claim, for /claims, the home finale and chapter strips. */
export const claims = pageList.flatMap((p) => topicsOf(p).map((t, i) => ({ page: p, topic: t, n: i + 1 })));
