import { useInView } from "@/lib/useInView";

/** The basmala as written in the muṣḥaf, one entry per counted letter; words are separated by gaps. */
const WORDS = [
  ["ب", "س", "م"],
  ["ا", "ل", "ل", "ه"],
  ["ا", "ل", "ر", "ح", "م", "ن"],
  ["ا", "ل", "ر", "ح", "ي", "م"],
] as const;

/**
 * The nineteen letters of the basmala, numbered right to left.
 * Letters rise in reading order the first time the strip enters view; with reduced motion they are simply shown.
 */
export function LetterStrip() {
  const [ref, inView] = useInView<HTMLOListElement>(0.4);
  let n = 0;
  return (
    <ol
      ref={ref}
      data-in={inView || undefined}
      lang="ar"
      dir="rtl"
      aria-label="The nineteen letters of the basmala"
      className="flex flex-wrap gap-x-8 gap-y-6 border-y md:gap-x-12 border-rule py-8"
    >
      {WORDS.map((word, w) => (
        <li key={w} className="flex gap-x-1 md:gap-x-2">
          {word.map((letter) => {
            const i = ++n;
            return (
              <span
                key={i}
                style={{ "--i": i }}
                className="flex w-10 flex-col items-center motion-safe:transition-[opacity,transform] motion-safe:delay-[calc(var(--i)*70ms)] motion-safe:duration-700 motion-safe:ease-(--ease-rise) md:w-12 motion-safe:[.js_&]:translate-y-2 motion-safe:[.js_&]:opacity-0 motion-safe:[.js_[data-in]_&]:translate-y-0 motion-safe:[.js_[data-in]_&]:opacity-100"
              >
                <b className="font-quran text-[calc(2.4rem*var(--arabic-scale))] leading-[1.6] font-normal text-ink md:text-[calc(3rem*var(--arabic-scale))]">
                  {letter}
                </b>
                <small className="font-mono text-[0.7rem] text-gold">{i}</small>
              </span>
            );
          })}
        </li>
      ))}
    </ol>
  );
}
