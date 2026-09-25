/** The five evidence grades. Each has a label, a one-line meaning, and the shape of its Text → Reading → Science chain. */
export type LinkShape = "solid" | "dashed" | "forked" | "void" | "broken" | "faded";

export const STATUSES = {
  established: {
    label: "Consistent with established science",
    short: "Established",
    tip: "The plain meaning of the text matches a well-established scientific finding.",
    links: ["solid", "solid"],
  },
  interpretive: {
    label: "A possible reading",
    short: "Possible reading",
    tip: "A modern reading that the Arabic allows, but not the only meaning. Classical scholars often read it differently.",
    links: ["dashed", "solid"],
  },
  debated: {
    label: "Scholarly debate",
    short: "Debated",
    tip: "Serious scholars disagree on how to read the text or on what science shows.",
    links: ["forked", "forked"],
  },
  unseen: {
    label: "Beyond empirical science",
    short: "Unseen",
    tip: "Concerns the unseen (al-ghayb). Science can neither confirm nor refute it.",
    links: ["solid", "void"],
  },
  caution: {
    label: "Not supported",
    short: "Not supported",
    tip: "A popular claim that does not hold up to careful checking.",
    links: ["broken", "faded"],
  },
} as const satisfies Record<string, { label: string; short: string; tip: string; links: readonly [LinkShape, LinkShape] }>;

export type Status = keyof typeof STATUSES;
export const STATUS_ORDER = ["established", "interpretive", "debated", "unseen", "caution"] as const satisfies readonly Status[];
