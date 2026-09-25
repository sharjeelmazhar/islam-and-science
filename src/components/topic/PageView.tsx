import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Page } from "@/content/define";
import { PARTS, neighbours, topicsOf } from "@/content/registry";
import { LAYERS } from "@/scene/layers";
import { setScene } from "@/scene/store";
import { scaleLabel } from "@/lib/scale";
import { ClaimStar } from "@/components/evidence/ClaimStar";
import { TopicView } from "./TopicView";

/** Any content page: a hero over the sky at this page's scale, then its topics and sections, then the next stop. */
export function PageView({ page }: { page: Page }) {
  const topics = topicsOf(page);
  const { prev, next } = neighbours(page.slug);

  useEffect(() => {
    setScene({ scale: page.scale ?? LAYERS[page.scene].scale, dim: 0 });
  }, [page]);

  let n = 0;
  return (
    <>
      <header className="relative flex min-h-[92svh] items-end pt-28 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="eyebrow">
            {page.scale === null ? PARTS[page.part] : `${scaleLabel(page.scale)} · ${PARTS[page.part]}`}
          </p>
          <h1 className="mt-5 max-w-[15ch] font-serif text-5xl leading-[0.98] tracking-tight text-balance md:text-7xl lg:text-8xl">{page.title}</h1>
          <p className="mt-6 max-w-[54ch] font-serif text-xl leading-snug text-ink-2 md:text-2xl">{page.description}</p>

          {topics.length ? (
            <nav aria-label="Claims in this chapter" className="mt-10">
              <p className="eyebrow mb-3 text-ink-3">{topics.length} claims, graded</p>
              <ol className="flex flex-wrap gap-x-5 gap-y-2">
                {topics.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="group flex items-center gap-2 text-sm text-ink-2 no-underline hover:text-ink" title={t.title}>
                      <ClaimStar status={t.status} size={14} />
                      <span className="max-w-[26ch] truncate">
                        <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span> {t.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {page.stats?.length ? (
            <dl className="mt-12 grid grid-cols-2 border-t border-l border-rule/80 md:grid-cols-4">
              {page.stats.map((s) => (
                <div key={s.value} className="border-r border-b border-rule/80 p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-3xl text-ink md:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-3">{s.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </header>

      <div className="relative bg-gradient-to-b from-transparent via-paper/90 to-paper to-[40rem]">
        {page.flow.map((block) =>
          block.kind === "topic" ? (
            <TopicView key={block.id} topic={block} n={++n} />
          ) : (
            <section key={block.id} id={block.id} className="section-block scroll-mt-24 py-20 md:py-28">
              <div className="mx-auto max-w-6xl px-6">
                <h2 className="max-w-[24ch] font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">{block.title}</h2>
                <div className="reading section-body mt-10">{block.body}</div>
              </div>
            </section>
          ),
        )}

        <nav aria-label="Continue the journey" className="mx-auto grid max-w-6xl gap-px border-t border-rule px-6 py-16 md:grid-cols-2">
          {prev ? (
            <Link to="/$slug/" params={{ slug: prev.slug }} className="group py-4 no-underline">
              <span className="eyebrow text-ink-3">← {prev.scale === null ? "Previous" : scaleLabel(prev.scale)}</span>
              <span className="mt-2 block font-serif text-2xl text-ink-2 group-hover:text-ink">{prev.navTitle}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to="/$slug/" params={{ slug: next.slug }} className="group py-4 text-right no-underline">
              <span className="eyebrow">{next.scale === null ? "Next" : scaleLabel(next.scale)} →</span>
              <span className="mt-2 block font-serif text-3xl text-ink group-hover:text-gold md:text-4xl">{next.navTitle}</span>
              <span className="mt-2 ml-auto block max-w-[44ch] text-sm text-ink-3">{next.hook}</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
