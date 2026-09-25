import type { ReactNode } from "react";

/** Transliteration, set in italics: <Tr>ʿalaqah</Tr>. */
export const Tr = ({ children }: { children: ReactNode }) => <span className="tr">{children}</span>;

/** Inline Arabic. */
export const Ar = ({ children }: { children: ReactNode }) => (
  <span lang="ar" dir="rtl" className="font-arabic text-[1.15em] text-ink">
    {children}
  </span>
);

/** An Arabic word with its transliteration, e.g. <Word ar="عَلَقَة" tr="ʿalaqah" />. */
export function Word({ ar, tr }: { ar: string; tr: string }) {
  return (
    <span className="whitespace-nowrap">
      <span lang="ar" dir="rtl" className="font-arabic text-[1.2em] text-gold">
        {ar}
      </span>{" "}
      <span className="tr text-ink">{tr}</span>
    </span>
  );
}

/** A short boxed note. Used for history notes, caveats and "read it yourself" pointers. */
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="reading my-6 border-l border-gold py-1 pl-5 text-[0.95rem]">
      <p className="eyebrow mb-2">{title}</p>
      {children}
    </aside>
  );
}

/** A quotation from a scholar or source. `by` is shown in the caption. */
export function Quote({ by, children, cite }: { by: ReactNode; cite?: ReactNode; children: ReactNode }) {
  return (
    <figure className="my-6">
      <blockquote className="font-serif text-[1.2rem] leading-relaxed text-ink italic">{children}</blockquote>
      <figcaption className="mt-3 text-sm text-ink-3">
        <span className="text-ink-2">{by}</span>
        {cite ? <>, {cite}</> : null}
      </figcaption>
    </figure>
  );
}

/** Two or three columns that stack on phones. */
export function Split({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <div className={cols === 3 ? "grid gap-8 md:grid-cols-3" : "grid gap-8 md:grid-cols-2"}>{children}</div>;
}

/** A dense grid of small titled blocks. */
export function Cards({ children }: { children: ReactNode }) {
  return <div className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
export function Card({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    <div className="reading border-r border-b border-rule p-5 text-[0.95rem]">
      {meta ? <p className="eyebrow mb-2">{meta}</p> : null}
      <h3 className="mb-2 font-serif text-xl text-ink">{title}</h3>
      {children}
    </div>
  );
}

/** A vertical timeline: <Timeline items={[{ when: "c. 820", title: "…", body: <p>…</p> }]} />. */
export function Timeline({ items }: { items: readonly { when: string; title: ReactNode; body: ReactNode }[] }) {
  return (
    <ol className="border-l border-rule-2">
      {items.map((it, i) => (
        <li key={i} className="reveal relative grid gap-1 py-5 pl-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
          <span className="absolute top-7 -left-[5px] size-[9px] rounded-full bg-gold" aria-hidden="true" />
          <span className="font-mono text-sm text-gold">{it.when}</span>
          <div className="reading">
            <h3 className="mb-1 font-serif text-xl text-ink">{it.title}</h3>
            {it.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A scrollable table wrapper; write a normal <table> inside. */
export const Table = ({ children }: { children: ReactNode }) => (
  <div className="reading my-6 overflow-x-auto border-t border-rule-2">{children}</div>
);
