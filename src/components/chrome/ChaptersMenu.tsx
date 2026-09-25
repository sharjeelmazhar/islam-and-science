import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PARTS, pageList } from "@/content/nav";
import { ClaimStar } from "@/components/evidence/ClaimStar";
import { scaleLabel } from "@/lib/scale";

/** Full-screen chapter index in a native <dialog> (focus trap and Esc for free), grouped by part of the journey. */
export function ChaptersMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="flex h-9 items-center gap-2 rounded-full border border-rule-2 px-3 font-mono text-[0.7rem] tracking-[0.08em] text-ink uppercase hover:border-gold"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        Chapters
      </button>
      <dialog
        ref={dialog}
        aria-label="Chapters"
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-paper/95 p-0 text-ink backdrop:bg-transparent"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow">The journey</p>
            <button type="button" onClick={close} className="font-mono text-xs tracking-[0.08em] text-ink-2 uppercase hover:text-gold" autoFocus>
              Close ✕
            </button>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {Object.entries(PARTS).map(([part, title]) => (
              <section key={part}>
                <h2 className="mb-4 border-b border-rule pb-2 font-serif text-2xl text-ink-2">{title}</h2>
                <ul className="space-y-1">
                  {pageList
                    .filter((p) => p.part === part)
                    .map((p) => {
                      const topics = p.topics;
                      return (
                        <li key={p.slug}>
                          <Link
                            to="/$slug/"
                            params={{ slug: p.slug }}
                            onClick={close}
                            className="group grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-2 no-underline"
                          >
                            <span className="font-mono text-xs text-ink-3">{p.scale === null ? "·" : scaleLabel(p.scale)}</span>
                            <span>
                              <span className="font-serif text-xl text-ink group-hover:text-gold">{p.navTitle}</span>
                              {topics.length ? (
                                <span className="mt-1 flex flex-wrap gap-1" aria-label={`${topics.length} claims`}>
                                  {topics.map((t) => (
                                    <ClaimStar key={t.id} status={t.status} size={11} />
                                  ))}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-rule pt-6">
            <Link to="/claims/" onClick={close} className="font-serif text-xl no-underline hover:text-gold">
              Every claim on one map →
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}
