import { hadith, type HadithKey } from "@/domain/hadith";

/** A hadith with narrator, collection link and grade. A note explains weak chains with authentic wording. */
export function Hadith({ k }: { k: HadithKey }) {
  const h = hadith(k);
  return (
    <figure className="border-l border-rule-2 pl-5">
      <blockquote cite={h.url} className="font-serif text-[1.08rem] leading-relaxed text-ink">
        <p>{h.text}</p>
      </blockquote>
      {h.note ? <p className="mt-2 text-sm text-ink-3">{h.note}</p> : null}
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-[0.06em] text-ink-3 uppercase">
        <span>Narrated by {h.narrator}</span>
        <a href={h.url} target="_blank" rel="noopener" className="text-gold no-underline hover:underline">
          {h.source}
        </a>
        {h.grade ? <span className="text-ink-2">{h.grade}</span> : null}
      </figcaption>
    </figure>
  );
}
