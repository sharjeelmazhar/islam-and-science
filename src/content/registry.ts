/**
 * The full content of every page, in journey order. The app never imports this at runtime (only types):
 * scripts/gen-nav.tsx reads it to write the light metadata, and src/content/load.ts lazy-loads each page.
 */
import type { Page } from "./define";
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
