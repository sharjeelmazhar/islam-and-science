import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { claims, pageList } from "@/content/nav";
import type { NavEntry } from "@/content/nav-types";
import { STATUSES, STATUS_ORDER, type Status } from "@/domain/statuses";
import { rng } from "@/scene/clouds";
import { setStop } from "@/scene/store";
import { ClaimStarShape } from "@/components/evidence/ClaimStar";
import { Grade } from "@/components/evidence/Grade";

const W = 260;
const H = 190;

/** Seeded star positions for one chapter, joined in order like a constellation figure. */
function layout(p: NavEntry, n: number) {
  const r = rng(p.slug.length * 97 + n);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + r() * 0.7;
    const rad = 38 + r() * 46;
    // Rounded so server and browser (different Math.cos last bits) render identical markup.
    return { x: Math.round((W / 2 + Math.cos(a) * rad * 1.25) * 100) / 100, y: Math.round((H / 2 + Math.sin(a) * rad * 0.8) * 100) / 100 };
  });
}

/**
 * Every graded claim on one map. Each chapter is a constellation; each star is a claim whose shape is its grade.
 * Filtering by grade dims the rest, so the site's honesty profile is visible at a glance.
 */
export function ClaimsMap() {
  const [only, setOnly] = useState<Status | null>(null);
  // Only the fixed stars here: the map itself is the picture.
  useEffect(() => setStop(-1.4), []);
  const chapters = pageList.filter((p) => p.topics.length > 0).map((p) => ({ p, topics: p.topics }));
  const shown = (t: { status: Status }) => only === null || t.status === only;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <p className="eyebrow">Every claim, graded</p>
      <h1 className="mt-4 max-w-[16ch] font-serif text-5xl leading-[1] tracking-tight md:text-7xl">The map of claims</h1>
      <p className="mt-6 max-w-[56ch] font-serif text-xl text-ink-2">
        {claims.length} claims across {chapters.length} chapters. Each star is one claim, and its shape is its grade. Select a star to read it.
      </p>

      <div role="group" aria-label="Filter by grade" className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-rule pt-4">
        <button type="button" aria-pressed={only === null} onClick={() => setOnly(null)} className={`font-mono text-[0.72rem] tracking-[0.08em] uppercase ${only === null ? "text-gold" : "text-ink-3 hover:text-ink"}`}>
          All {claims.length}
        </button>
        {STATUS_ORDER.map((s) => (
          <button key={s} type="button" aria-pressed={only === s} onClick={() => setOnly(only === s ? null : s)} className={`transition-opacity ${only === null || only === s ? "opacity-100" : "opacity-40 hover:opacity-80"}`}>
            <Grade status={s} long />
            <span className="ml-2 font-mono text-xs text-ink-3">{claims.filter((c) => c.topic.status === s).length}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map(({ p, topics }) => {
          const pts = layout(p, topics.length);
          return (
            <figure key={p.slug} className="reveal">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="group" aria-label={`${p.navTitle}: ${topics.length} claims`}>
                <polyline points={pts.map((q) => `${q.x},${q.y}`).join(" ")} fill="none" stroke="var(--rule-2)" strokeWidth={0.8} />
                {topics.map((t, i) => {
                  const q = pts[i];
                  if (!q) return null;
                  return (
                    <Link key={t.id} to="/$slug/" params={{ slug: p.slug }} hash={t.id} aria-label={`${t.title} (${STATUSES[t.status].short})`}>
                      <g style={{ opacity: shown(t) ? 1 : 0.15, transition: "opacity .4s" }}>
                        <title>{t.title}</title>
                        <circle cx={q.x} cy={q.y} r={16} fill="transparent" />
                        <ClaimStarShape status={t.status} cx={q.x} cy={q.y} r={9} />
                      </g>
                    </Link>
                  );
                })}
              </svg>
              <figcaption className="mt-2 flex items-baseline justify-between border-t border-rule pt-2">
                <Link to="/$slug/" params={{ slug: p.slug }} className="font-serif text-xl text-ink no-underline hover:text-gold">
                  {p.navTitle}
                </Link>
                <span className="font-mono text-xs text-ink-3">{topics.filter(shown).length}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <h2 className="mt-24 font-serif text-3xl">Every claim, listed</h2>
      <ol className="mt-6 border-t border-rule-2">
        {claims
          .filter((c) => shown(c.topic))
          .map((c) => (
            <li key={`${c.page.slug}-${c.topic.id}`} className="border-b border-rule">
              <Link to="/$slug/" params={{ slug: c.page.slug }} hash={c.topic.id} className="grid gap-1 py-3 no-underline sm:grid-cols-[12rem_1fr_13rem] sm:items-baseline sm:gap-6">
                <span className="text-sm text-ink-3">{c.page.navTitle}</span>
                <span className="text-ink hover:text-gold">{c.topic.title}</span>
                <Grade status={c.topic.status} />
              </Link>
            </li>
          ))}
      </ol>
    </div>
  );
}
