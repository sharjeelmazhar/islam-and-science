import type { Part } from "./define";
import type { PageSlug } from "./registry";
import type { Status } from "@/domain/statuses";
import type { SceneId } from "@/scene/layers";

/** A page's light metadata, as written to src/generated/nav.ts by scripts/gen-nav.tsx. */
export type NavEntry = {
  slug: PageSlug;
  title: string;
  navTitle: string;
  description: string;
  hook: string;
  part: Part;
  scale: number | null;
  scene: SceneId;
  topics: readonly { id: string; title: string; status: Status }[];
};
