import type { ReactNode } from "react";
import type { VerseRef } from "@/domain/verses";
import type { HadithKey } from "@/domain/hadith";
import type { Status } from "@/domain/statuses";
import type { SceneId } from "@/scene/layers";

/** A verse (or consecutive range) or a hadith, shown in a topic's pinned scripture column. */
export type Scripture = { verse: VerseRef; to?: VerseRef } | { hadith: HadithKey };

/** One step of a topic. `gist` is always visible; `more` sits behind "Read more", so pages stay light. */
export type Step = { heading: string; gist: ReactNode; more?: ReactNode };

/** A graded claim. As the reader scrolls its steps, the Text → Reading → Science chain draws itself. */
export type Topic = {
  kind: "topic";
  id: string;
  status: Status;
  title: string;
  lede?: string;
  scripture: readonly Scripture[];
  /** Extra material pinned under the scripture: callouts, quotes. */
  aside?: ReactNode;
  steps: readonly Step[];
};

/** Free-form content between topics: introductions, visualisations, labs, essays. */
export type Section = { kind: "section"; id: string; title: string; body: ReactNode };

export type Part = "start" | "horizons" | "selves" | "measure" | "integrity";

/** Every content page (chapters and essays) is one of these. Files end with `satisfies Page`. */
export type Page = {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  /** One short line for the journey and the chapters menu. */
  hook: string;
  part: Part;
  /** log10 metres: where this page sits on the journey. null = outside scale. */
  scale: number | null;
  scene: SceneId;
  stats?: readonly { value: string; label: string }[];
  flow: readonly (Topic | Section)[];
};
