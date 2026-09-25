import type { ReactNode } from "react";

/** The original lab heading and instructions, set above a calculator from src/labs/ui. */
export function Lab({ title, note, children }: { title: string; note: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-rule-2 pt-4">
      <p className="eyebrow">{title}</p>
      <p className="mt-2 mb-4 text-sm text-ink-3">{note}</p>
      {children}
    </div>
  );
}
