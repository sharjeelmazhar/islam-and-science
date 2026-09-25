import { useEffect, useRef, useState } from "react";
import type { Topic } from "@/content/define";
import { STATUSES } from "@/domain/statuses";
import { Verse } from "@/components/scripture/Verse";
import { Hadith } from "@/components/scripture/Hadith";
import { ThreeLinks } from "@/components/evidence/ThreeLinks";

/**
 * A graded claim, told as scrollytelling: the scripture stays pinned while the steps scroll past.
 * Each step reached draws the next link of the evidence chain; the verdict lands on the last step.
 */
export function TopicView({ topic, n }: { topic: Topic; n: number }) {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Server render shows everything drawn; on mount we rewind to what the reader has actually reached.
  const [reached, setReached] = useState(topic.steps.length);

  useEffect(() => {
    const els = stepRefs.current;
    const passed = els.filter((el) => el && el.getBoundingClientRect().top < innerHeight * 0.6).length;
    setReached(passed);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target instanceof HTMLLIElement ? e.target : null);
          if (i >= 0) setReached((r) => Math.max(r, i + 1));
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    for (const el of els) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  const status = STATUSES[topic.status];
  const done = reached >= topic.steps.length;
  const drawn = reached >= 2 ? 2 : reached >= 1 ? 1 : 0;

  return (
    // content-visibility lets the browser skip layout and paint for topics far off screen.
    <article id={topic.id} className="scroll-mt-24 py-20 [contain-intrinsic-size:auto_1600px] [content-visibility:auto] md:py-32">
      <header className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">
          Claim {String(n).padStart(2, "0")} · <span style={{ color: `var(--st-${topic.status})` }}>{status.short}</span>
        </p>
        <h2 className="mt-4 max-w-[22ch] font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
          <a href={`#${topic.id}`} className="no-underline">
            {topic.title}
          </a>
        </h2>
        {topic.lede ? <p className="mt-5 max-w-[58ch] font-serif text-xl leading-snug text-ink-2">{topic.lede}</p> : null}
      </header>

      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-6 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="space-y-10 lg:sticky lg:top-24 lg:self-start">
          <div>
            <ThreeLinks status={topic.status} drawn={drawn} />
            <p
              className="mt-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase transition-opacity duration-700"
              style={{ color: `var(--st-${topic.status})`, opacity: done ? 1 : 0 }}
              title={status.tip}
            >
              Verdict · {status.label}
            </p>
          </div>
          {topic.scripture.map((s) =>
            "verse" in s ? <Verse key={s.verse} at={s.verse} {...(s.to ? { to: s.to } : {})} /> : <Hadith key={s.hadith} k={s.hadith} />,
          )}
          {topic.aside}
        </div>

        <ol className="space-y-16 lg:space-y-[22vh] lg:pt-4 lg:pb-[12vh]">
          {topic.steps.map((step, i) => (
            <li
              key={step.heading}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="transition-opacity duration-700"
              style={{ opacity: reached > i || i === 0 ? 1 : 0.35 }}
            >
              <p className="eyebrow mb-4">{step.heading}</p>
              <div className="reading text-[1.12rem]">{step.gist}</div>
              {step.more ? (
                <details className="more mt-4">
                  <summary className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase hover:text-gold">Read more</summary>
                  <div className="reading pt-4">{step.more}</div>
                </details>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
