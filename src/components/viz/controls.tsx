import type { ReactNode } from "react";

/** Shared, minimal controls for the visualisations: thin rules, mono labels, no pill chrome. */
export function ControlBar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-4 font-mono text-[0.72rem] tracking-[0.06em] text-ink-2 uppercase">{children}</div>;
}

export function Button({ onClick, children, pressed }: { onClick: () => void; children: ReactNode; pressed?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={pressed} className={`uppercase hover:text-gold ${pressed ? "text-gold" : ""}`}>
      {children}
    </button>
  );
}

export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex border border-rule-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 uppercase ${o.value === value ? "bg-ink text-paper" : "hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Range({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <label className="flex min-w-48 flex-1 items-center gap-3">
      {label}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-gold" />
    </label>
  );
}

export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-gold" />
      {label}
    </label>
  );
}
