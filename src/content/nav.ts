import { NAV } from "@/generated/nav";
import type { NavEntry } from "./nav-types";
import type { Part } from "./define";
import type { PageSlug } from "./registry";

/** Every page's metadata in journey order. Cheap to import anywhere (no page text). */
export const pageList: readonly NavEntry[] = NAV;

const bySlug = new Map<string, NavEntry>(NAV.map((p) => [p.slug, p]));

export const isPageSlug = (s: string): s is PageSlug => bySlug.has(s);

export function navOf(slug: PageSlug): NavEntry {
  const p = bySlug.get(slug);
  if (!p) throw new Error(`No page ${slug}`);
  return p;
}

export const PARTS = {
  start: "Start here",
  horizons: "The Horizons",
  selves: "Within the Self",
  measure: "Measure & History",
  integrity: "Integrity",
} as const satisfies Record<Part, string>;

/** The pages after and before `slug` in journey order. */
export function neighbours(slug: string) {
  const i = pageList.findIndex((p) => p.slug === slug);
  return { prev: pageList[i - 1], next: pageList[i + 1] };
}

/** Flat list of every graded claim, for /claims and the home finale. */
export const claims = pageList.flatMap((p) => p.topics.map((t, i) => ({ page: p, topic: t, n: i + 1 })));
