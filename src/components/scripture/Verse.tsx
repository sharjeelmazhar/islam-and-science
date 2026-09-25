import { Fragment } from "react";
import { rangeLabel, surahOf, verseRange, type VerseRef } from "@/domain/verses";
import { useInView } from "@/lib/useInView";
import { CopyButton } from "./CopyButton";

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toArabicDigits = (n: number) => String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)] ?? d);

/**
 * A Qur'an verse (or consecutive range): Uthmani Arabic, the Kanz-ul-Iman English, and a link.
 * The Arabic rises in word by word, right to left, the first time it enters view (once, never looped).
 */
export function Verse({ at, to, size = "md" }: { at: VerseRef; to?: VerseRef; size?: "md" | "lg" }) {
  const verses = verseRange(at, to);
  const [first] = verses;
  if (!first) throw new Error(`No verse for ${at}`);
  const surah = surahOf(first);
  const label = rangeLabel(at, to);
  const multi = verses.length > 1;
  const [ref, inView] = useInView<HTMLElement>(0.3);

  let n = 0;
  const arabic = verses.map((v) => (
    <span key={v.ayah}>
      {v.ar.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="vw" style={{ "--i": n++ }}>
            {w}
          </span>{" "}
        </Fragment>
      ))}
      <span className="vw text-gold" style={{ "--i": n++ }}>
        ۝{toArabicDigits(v.ayah)}
      </span>{" "}
    </span>
  ));

  return (
    <figure ref={ref} data-in={inView || undefined} className="verse" style={{ "--n": n }}>
      <blockquote cite={first.url}>
        <p
          lang="ar"
          dir="rtl"
          className={`font-quran leading-[2.15] text-ink ${size === "lg" ? "text-[calc(2.4rem*var(--arabic-scale))] md:text-[calc(3rem*var(--arabic-scale))]" : "text-[calc(1.75rem*var(--arabic-scale))]"}`}
        >
          {arabic}
        </p>
        <p className={`ven mt-3 font-serif text-ink-2 italic ${size === "lg" ? "text-xl md:text-2xl" : "text-lg"} leading-relaxed`}>
          {verses.map((v) => (
            <span key={v.ayah}>
              {multi ? <sup className="mr-0.5 font-mono text-[0.6em] text-gold not-italic">{v.ayah}</sup> : null}
              {v.en}{" "}
            </span>
          ))}
        </p>
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-[0.06em] text-ink-3 uppercase">
        <a href={first.url} target="_blank" rel="noopener" className="text-gold no-underline hover:underline">
          Qur’an {label}
        </a>
        <span>
          Sūrat {surah.english} · {surah.meaning}
        </span>
        <CopyButton
          label={`Copy verse ${label}`}
          text={`${verses.map((v) => v.ar).join(" ")}\n${verses.map((v) => v.en).join(" ")}\nQur’an ${label}`}
        />
      </figcaption>
    </figure>
  );
}
