import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

export type Stage = { ar: string; tr: string; when: string; text: ReactNode };

/**
 * The Qur'an's stages of human creation as one sequence on a thin rule.
 * Each stage lights up the first time the reader reaches it and stays lit (no looping motion).
 * Dimming only applies once JS has run (html.js), so prerendered HTML is fully readable.
 */
export function Stages({ items }: { items: readonly Stage[] }) {
  return (
    <ol className="relative ml-1 border-l border-rule-2">
      {items.map((s, i) => (
        <StageRow key={s.tr} stage={s} n={i + 1} />
      ))}
    </ol>
  );
}

function StageRow({ stage, n }: { stage: Stage; n: number }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.6);
  return (
    <li ref={ref} data-in={inView || undefined} className="relative grid gap-x-10 gap-y-3 py-7 pl-7 md:grid-cols-[15rem_1fr] md:py-9">
      <span
        aria-hidden="true"
        className="absolute top-10 -left-[5px] size-[9px] rounded-full bg-gold transition-colors duration-700 md:top-12 [.js_&]:bg-rule-2 [.js_[data-in]_&]:bg-gold"
      />
      <div className="transition-opacity duration-700 [.js_&]:opacity-40 [.js_[data-in]_&]:opacity-100">
        <p className="font-mono text-[0.7rem] tracking-[0.08em] text-ink-3">{String(n).padStart(2, "0")}</p>
        <p lang="ar" dir="rtl" className="mt-1 text-left font-quran text-[calc(2.6rem*var(--arabic-scale))] leading-[1.5] text-gold">
          {stage.ar}
        </p>
        <p className="tr font-serif text-xl text-ink">{stage.tr}</p>
        <p className="mt-2 font-mono text-[0.72rem] tracking-[0.06em] text-gold uppercase">{stage.when}</p>
      </div>
      <div className="self-center text-ink-2 transition-colors duration-700 md:pt-6 [.js_&]:text-ink-3 [.js_[data-in]_&]:text-ink-2">{stage.text}</div>
    </li>
  );
}
