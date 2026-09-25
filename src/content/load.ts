import type { Page } from "./define";
import type { PageSlug } from "./registry";

// One chunk per page, so a reader downloads only the chapter they open.
// `satisfies` makes a missing loader a compile error when a page is added.
const loaders = {
  approach: () => import("./pages/approach"),
  knowledge: () => import("./pages/knowledge"),
  cosmology: () => import("./pages/cosmology"),
  "deep-space": () => import("./pages/deep-space"),
  "celestial-motion": () => import("./pages/celestial-motion"),
  "earths-motion": () => import("./pages/earths-motion"),
  earth: () => import("./pages/earth"),
  life: () => import("./pages/life"),
  embryology: () => import("./pages/embryology"),
  physics: () => import("./pages/physics"),
  mathematics: () => import("./pages/mathematics"),
  scholars: () => import("./pages/scholars"),
  myths: () => import("./pages/myths"),
  references: () => import("./pages/references"),
  about: () => import("./pages/about"),
} satisfies Record<PageSlug, () => Promise<{ default: Page }>>;

const cache = new Map<PageSlug, Promise<Page>>();

/** The full page, loaded once and cached (a stable promise, so React's `use` can suspend on it). */
export function loadPage(slug: PageSlug): Promise<Page> {
  let p = cache.get(slug);
  if (!p) {
    p = loaders[slug]().then((m) => m.default);
    cache.set(slug, p);
  }
  return p;
}
