import { Fragment, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import type { PrimePower } from "../numbers";

// Building blocks shared by the labs. The page renders each lab's heading and intro; a lab starts at its controls.

/** Frame for one lab: thin rules above and below, sections stacked. Motion inside follows the OS reduced-motion setting. */
export function Panel({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-6 border-y border-rule-2 py-6">{children}</div>
    </MotionConfig>
  );
}

/** A labelled control. `value` shows the control's current reading next to its label. */
export function Field({ label, value, children }: { label: string; value?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow flex items-baseline justify-between gap-4">
        {label}
        {value === undefined ? null : <span className="text-ink-2 normal-case tracking-normal tabular-nums">{value}</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export const numberInput =
  "w-full border-0 border-b border-rule-2 bg-transparent py-1 font-serif text-3xl text-ink tabular-nums hover:border-ink-3";
export const rangeInput = "w-full accent-gold";

/** Row of example buttons; the active one is marked with aria-pressed. */
export function Presets({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {children}
    </div>
  );
}

export function Preset({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`border px-3 py-1.5 text-[0.82rem] ${on ? "border-gold text-ink" : "border-rule-2 text-ink-2 hover:border-ink-3 hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

/** Live result: a big serif figure over a line of detail, announced politely to screen readers. */
export function Readout({ big, children }: { big?: ReactNode; children?: ReactNode }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {big === undefined ? null : (
        <p className="font-serif text-4xl leading-[1.05] tracking-tight text-balance text-ink tabular-nums md:text-5xl">{big}</p>
      )}
      {children === undefined ? null : (
        <p className="mt-3 max-w-[62ch] text-[0.92rem] leading-relaxed text-ink-2 [&_strong]:font-medium [&_strong]:text-ink">{children}</p>
      )}
    </div>
  );
}

/** Prime factorisation as text: 2² × 1559. */
export function Factors({ powers }: { powers: readonly PrimePower[] }) {
  return powers.map(({ p, k }, i) => (
    <Fragment key={p}>
      {i > 0 ? " × " : null}
      {p}
      {k > 1 ? <sup>{k}</sup> : null}
    </Fragment>
  ));
}
