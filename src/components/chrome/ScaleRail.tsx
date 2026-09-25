import { Link } from "@tanstack/react-router";
import { pageList } from "@/content/nav";
import { useSceneScale } from "@/scene/store";
import { scaleLabel } from "@/lib/scale";

const TOP = 26;
const BOTTOM = -10;
const pos = (s: number) => `${((TOP - s) / (TOP - BOTTOM)) * 100}%`;
// One tick per distinct scale (two pages can share one, e.g. both Solar System chapters).
const stops = pageList
  .filter((p) => p.scale !== null)
  .filter((p, i, all) => all.findIndex((q) => q.scale === p.scale) === i)
  .sort((a, b) => (b.scale ?? 0) - (a.scale ?? 0));

/** The scale ruler on the right edge: where you are in the universe, and a menu of every stop. */
export function ScaleRail() {
  const scale = useSceneScale();
  return (
    <nav aria-label="Scale of the universe" className="no-print fixed top-24 right-5 bottom-24 z-30 hidden w-40 lg:block">
      <div className="absolute top-0 right-0 bottom-0 w-px bg-rule-2" />
      {Number.isFinite(scale) ? (
        <div
          className="absolute right-0 h-px w-8 bg-gold transition-[top] duration-500 ease-out"
          style={{ top: pos(Math.max(BOTTOM, Math.min(TOP, scale))) }}
          aria-hidden="true"
        />
      ) : null}
      {stops.map((p) => {
        const s = p.scale ?? 0;
        const on = Math.abs(s - scale) < 0.75;
        return (
          <Link
            key={p.slug}
            to="/$slug/"
            params={{ slug: p.slug }}
            className="group absolute right-0 flex -translate-y-1/2 items-center gap-2 no-underline"
            style={{ top: pos(s) }}
          >
            <span className={`text-right text-xs leading-tight transition-opacity ${on ? "text-ink opacity-100" : "text-ink-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
              {p.navTitle}
            </span>
            <span className={`font-mono text-[0.65rem] ${on ? "text-gold" : "text-ink-3"}`}>{scaleLabel(s).replace(" m", "")}</span>
            <span className={`h-px ${on ? "w-5 bg-gold" : "w-3 bg-ink-3"}`} />
          </Link>
        );
      })}
    </nav>
  );
}
