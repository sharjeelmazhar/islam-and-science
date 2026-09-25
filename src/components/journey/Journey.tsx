import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { JOURNEY } from "@/content/journey";
import { PARTS, claims, navOf, pageList } from "@/content/nav";
import { LAYERS } from "@/scene/layers";
import { setStop, stopOf } from "@/scene/store";
import { rangeLabel, verseRange, type VerseRef } from "@/domain/verses";
import { STATUS_ORDER } from "@/domain/statuses";
import { scaleLabel } from "@/lib/scale";
import { Verse } from "@/components/scripture/Verse";
import { Hadith } from "@/components/scripture/Hadith";
import { ClaimStar } from "@/components/evidence/ClaimStar";
import { Grade } from "@/components/evidence/Grade";

/** Where the sky sits for the sections around the descent: the whole universe seen from outside. */
const OUTSIDE = -0.2;

/**
 * The home page: a single descent from the observable universe to the atom.
 * Every section carries a `data-stop`; as the reader scrolls, the sky's position is interpolated
 * between the two sections straddling the middle of the screen. After the atom the camera pulls
 * all the way back out, sweeping through every layer in reverse.
 */
export function Journey() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const marks = [...el.querySelectorAll<HTMLElement>("[data-stop]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = innerHeight / 2;
      const pts = marks.map((m) => {
        const r = m.getBoundingClientRect();
        return { y: r.top + r.height / 2, v: Number(m.dataset.stop) };
      });
      const next = pts.findIndex((p) => p.y > mid);
      const a = pts[Math.max(0, next - 1)];
      const b = pts[next];
      if (!a) return;
      if (next <= 0 || !b) {
        setStop(next === 0 ? (pts[0]?.v ?? OUTSIDE) : a.v);
        return;
      }
      const t = Math.min(1, Math.max(0, (mid - a.y) / (b.y - a.y)));
      setStop(a.v + (b.v - a.v) * t);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={root}>
      <Hero />
      <Intro />
      {JOURNEY.map((stop, i) => (
        <Stop key={stop.layer} stop={stop} first={i === 0} />
      ))}
      <Beyond />
      <Constellation />
      <Principles />
      <WhyItMatters />
    </div>
  );
}

function Band({ stop, children, tall = false, id }: { stop: number; children: ReactNode; tall?: boolean; id?: string | undefined }) {
  return (
    <section id={id} data-stop={stop} className={`relative ${tall ? "min-h-[165svh]" : ""}`}>
      <div className={tall ? "sticky top-0 flex min-h-svh items-center py-24" : "py-24 md:py-32"}>
        <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section data-stop={OUTSIDE} className="relative flex min-h-svh items-end pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-paper/70 via-paper/20 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p className="eyebrow">Qur’an · Hadith · Science</p>
        <h1 className="mt-5 max-w-[12ch] font-serif text-6xl leading-[0.95] tracking-tight text-balance md:text-8xl lg:text-[8.5rem]">
          Signs in the heavens and the earth
        </h1>
        <div className="mt-10 max-w-2xl">
          <Verse at="3:190" />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href="#journey" className="font-mono text-sm tracking-[0.08em] text-gold uppercase no-underline hover:underline">
            Begin the journey ↓
          </a>
          <Link to="/$slug/" params={{ slug: "approach" }} className="font-mono text-sm tracking-[0.08em] text-ink-2 uppercase no-underline hover:text-ink">
            How we weigh the evidence
          </Link>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Band stop={-0.2}>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="reveal">
          <p className="eyebrow">What this is</p>
          <h2 className="mt-4 max-w-[20ch] font-serif text-4xl leading-tight tracking-tight md:text-5xl">A guide for people who love both science and scripture</h2>
          <div className="reading mt-6 max-w-[60ch] text-lg">
            <p>
              The Qur’an repeatedly asks its readers to look at the sky, the mountains, the seas, living things and their own bodies, and to think. This site gathers
              the verses and authentic hadith that touch on the natural world and sets them beside what modern science has measured, with references you can check.
            </p>
            <details className="more">
              <summary className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase hover:text-gold">Read more</summary>
              <div className="pt-4">
                <p>
                  It is written for everyone: Muslims of any school, people of other faiths, and people of none. It is not a debate site. Its aim is to show what the
                  texts actually say, what science has actually found, and where the two meet. Where a connection is only a possible reading, or where scholars
                  disagree, we say so plainly.
                </p>
                <p>
                  Every Qur’an quotation is drawn automatically from the standard Uthmani Arabic text with a single, consistent English translation, and every hadith
                  links to its source.
                </p>
              </div>
            </details>
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow">How to read the badges</p>
          <ul className="mt-5 space-y-4">
            {(
              [
                ["established", "The plain meaning of the text lines up with a well-established finding."],
                ["interpretive", "The Arabic allows this modern reading, but it is not the only meaning."],
                ["debated", "Serious scholars disagree about the reading or the science."],
                ["unseen", "About the unseen. Science cannot test it either way."],
              ] as const
            ).map(([s, text]) => (
              <li key={s} className="border-t border-rule pt-3">
                <Grade status={s} long />
                <p className="mt-1 text-sm text-ink-2">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

function Stop({ stop, first }: { stop: (typeof JOURNEY)[number]; first: boolean }) {
  const page = navOf(stop.page);
  const layer = LAYERS[stop.layer];
  const hinge = stop.layer === "reader";
  const featured = "hash" in stop ? page.topics.find((t) => t.id === stop.hash) : undefined;
  const topics = page.topics;
  const atomClaim = stop.layer === "atom" ? topics.find((t) => t.id === "atom-and-smaller") : undefined;
  return (
    <Band stop={stopOf(stop.layer)} tall id={first ? "journey" : undefined}>
      <div className="reveal max-w-xl">
        <p className="eyebrow">
          {scaleLabel(layer.scale)} · {hinge ? "Halfway: from the horizons to the self" : layer.name}
        </p>
        {hinge ? (
          <div className="mt-6">
            <Verse at="41:53" size="lg" />
          </div>
        ) : null}
        <h2 className="mt-5 font-serif text-5xl leading-[1] tracking-tight text-balance md:text-7xl">{featured?.title ?? page.navTitle}</h2>
        <p className="mt-5 max-w-[42ch] font-serif text-xl leading-snug text-ink-2">{hinge ? "The first word revealed: “Read” (96:1)." : page.hook}</p>
        {"verse" in stop && !hinge ? <VerseLine at={stop.verse} {...("to" in stop ? { to: stop.to } : {})} /> : null}
        {atomClaim ? <p className="mt-6 font-serif text-2xl text-ink italic">{atomClaim.title}</p> : null}
        {topics.length && !featured ? (
          <p className="mt-6 flex flex-wrap items-center gap-1.5" aria-label={`${topics.length} claims`}>
            {topics.map((t) => (
              <ClaimStar key={t.id} status={t.status} size={13} />
            ))}
            <span className="ml-2 font-mono text-xs text-ink-3">{topics.length} claims</span>
          </p>
        ) : null}
        <Link
          to="/$slug/"
          params={{ slug: page.slug }}
          {...("hash" in stop ? { hash: stop.hash } : {})}
          className="mt-8 inline-block font-mono text-sm tracking-[0.08em] text-gold uppercase no-underline hover:underline"
        >
          {featured ? "See the claim →" : `Enter ${page.navTitle} →`}
        </Link>
      </div>
    </Band>
  );
}

/** A compact verse for the journey: Arabic, meaning and reference, no chrome. */
function VerseLine({ at, to }: { at: VerseRef; to?: VerseRef }) {
  const vs = verseRange(at, to);
  const url = vs[0]?.url;
  return (
    <figure className="mt-8 border-l border-gold-2 pl-5">
      <p lang="ar" dir="rtl" className="font-quran text-[calc(1.6rem*var(--arabic-scale))] leading-[2] text-ink">
        {vs.map((v) => v.ar).join(" ")}
      </p>
      <p className="mt-1 font-serif text-lg text-ink-2 italic">“{vs.map((v) => v.en).join(" ")}”</p>
      <figcaption className="mt-2">
        <a href={url} target="_blank" rel="noopener" className="font-mono text-xs tracking-[0.08em] text-gold uppercase no-underline hover:underline">
          Qur’an {rangeLabel(at, to)}
        </a>
      </figcaption>
    </figure>
  );
}

function Beyond() {
  const items = [navOf("mathematics"), navOf("scholars"), navOf("myths")];
  return (
    <Band stop={OUTSIDE}>
      <p className="eyebrow">Outside every scale</p>
      <h2 className="mt-4 max-w-[18ch] font-serif text-5xl leading-[1] tracking-tight md:text-7xl">Numbers, the people who measured, and what we refuse to claim</h2>
      <div className="mt-14 grid border-t border-rule md:grid-cols-3">
        {items.map((p) => (
          <Link key={p.slug} to="/$slug/" params={{ slug: p.slug }} className="group reveal border-b border-rule py-8 no-underline md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
            <p className="eyebrow text-ink-3">{PARTS[p.part]}</p>
            <h3 className="mt-3 font-serif text-3xl text-ink group-hover:text-gold">{p.navTitle}</h3>
            <p className="mt-3 text-ink-2">{p.hook}</p>
          </Link>
        ))}
      </div>
    </Band>
  );
}

function Constellation() {
  const byPage = pageList.filter((p) => p.topics.length).map((p) => ({ p, topics: p.topics }));
  const counts = STATUS_ORDER.map((s) => [s, claims.filter((c) => c.topic.status === s).length] as const);
  return (
    <Band stop={OUTSIDE}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div className="reveal">
          <p className="eyebrow">Every claim, graded</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight md:text-7xl">{claims.length} claims. Graded, not inflated.</h2>
          <ul className="mt-8 space-y-2">
            {counts.map(([s, n]) => (
              <li key={s} className="flex items-center justify-between border-t border-rule pt-2">
                <Grade status={s} long />
                <span className="font-mono text-sm text-ink-2">{n}</span>
              </li>
            ))}
          </ul>
          <Link to="/claims/" className="mt-8 inline-block font-mono text-sm tracking-[0.08em] text-gold uppercase no-underline hover:underline">
            See every claim on one map →
          </Link>
        </div>
        <div className="reveal space-y-3">
          {byPage.map(({ p, topics }) => (
            <Link key={p.slug} to="/$slug/" params={{ slug: p.slug }} className="group grid grid-cols-[10rem_1fr] items-center gap-4 no-underline">
              <span className="truncate text-right text-sm text-ink-3 group-hover:text-ink">{p.navTitle}</span>
              <span className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <ClaimStar key={t.id} status={t.status} size={18} title={t.title} />
                ))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Band>
  );
}

const PRINCIPLES = [
  ["Revelation is the fixed point", "For Muslims the Qur’an is the word of God, and the Creator knows His creation best. The text does not change. Our understanding of it, and our science, can grow."],
  ["Science is a method, and it revises itself", "Einstein refined Newton, and today’s models will be refined too. We report the current scientific consensus with dates and data, and we never treat it as final."],
  ["Words mean what they mean", "We check the Arabic and the classical commentaries before claiming a connection, and we never stretch a word to fit a discovery."],
  ["Honesty over impressiveness", "A verse does not need our exaggeration. We label every claim, and we list the popular claims that do not hold up."],
] as const;

function Principles() {
  return (
    <Band stop={OUTSIDE}>
      <p className="eyebrow">Four principles behind every page</p>
      <p className="mt-4 max-w-[46ch] font-serif text-2xl text-ink-2">These keep the site trustworthy for a believer, a sceptic and a scientist alike.</p>
      <ol className="mt-12 grid border-t border-rule md:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map(([title, body], i) => (
          <li key={title} className="reveal border-b border-rule py-6 pr-6 lg:border-r lg:border-b-0 lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
            <span className="font-serif text-5xl text-gold">{i + 1}</span>
            <h3 className="mt-4 font-serif text-2xl text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{body}</p>
          </li>
        ))}
      </ol>
      <div className="reveal mx-auto mt-28 max-w-3xl text-center">
        <Verse at="67:3" size="lg" />
      </div>
    </Band>
  );
}

function WhyItMatters() {
  return (
    <Band stop={OUTSIDE}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Why this matters</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">Knowledge that leads to its Source</h2>
          <div className="reading mt-6 text-lg">
            <p>
              In the Islamic tradition, studying creation is not a rival to faith. It is one of its paths. The first word revealed was <em>“Read”</em>, and the Qur’an
              praises those who reflect on the heavens and the earth and conclude: <em>“O our Lord, You have not created this in vain.”</em>
            </p>
            <p>
              That also sets the intention. Knowledge is sought to know God better and to benefit people, not for fame or argument. The Prophet ﷺ asked God for
              “beneficial knowledge” every morning, and sought refuge from knowledge that does not benefit.
            </p>
          </div>
          <Link to="/$slug/" params={{ slug: "knowledge" }} className="mt-6 inline-block font-mono text-sm tracking-[0.08em] text-gold uppercase no-underline hover:underline">
            Read: Knowledge &amp; Reflection →
          </Link>
        </div>
        <div className="reveal space-y-10">
          <Hadith k="muslim:2699" />
          <Hadith k="ibnmajah:925" />
        </div>
      </div>
    </Band>
  );
}
