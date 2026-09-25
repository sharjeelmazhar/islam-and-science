import type { SceneId } from "@/scene/layers";
import type { VerseRef } from "@/domain/verses";
import type { PageSlug } from "./registry";

/** The home page's descent: one stop per layer of the sky, each pointing at its chapter with one short verse. */
export const JOURNEY = [
  { layer: "cosmos", page: "cosmology", verse: "51:47" },
  { layer: "galaxy", page: "deep-space", verse: "56:75" },
  { layer: "solar", page: "celestial-motion", verse: "36:40" },
  { layer: "earth", page: "earth", verse: "51:20" },
  { layer: "mountain", page: "earth", verse: "78:6", to: "78:7", hash: "mountains-as-pegs" },
  { layer: "reader", page: "knowledge", verse: "96:1" },
  { layer: "hive", page: "life", verse: "16:68" },
  { layer: "embryo", page: "embryology", verse: "23:12", to: "23:13" },
  { layer: "atom", page: "physics" },
] as const satisfies readonly { layer: SceneId; page: PageSlug; verse?: VerseRef; to?: VerseRef; hash?: string }[];
