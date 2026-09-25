import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CAPTIONS, type Frame } from "./orbits-model";
import { Button, Check, ControlBar, Range, Segmented } from "./controls";

const OrbitsScene = lazy(() => import("./OrbitsScene"));

const FRAMES = [
  { value: "helio", label: "Sun-centred" },
  { value: "geo", label: "Earth-centred" },
  { value: "galactic", label: "Through the galaxy" },
] as const satisfies readonly { value: Frame; label: string }[];

/**
 * One Solar System, three points of view. Real orbital periods, circular orbits in one plane.
 * Switching the frame glides every body into its new description, so the reader sees that the
 * motions are the same and only the description changes. Plays only while on screen.
 */
export function OrbitsViz({ start = "helio" }: { start?: Frame }) {
  const box = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame>(start);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(45);
  const [trails, setTrails] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) setNear(true);
        setPlaying(e.isIntersecting && !reduce);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper"
        role="img"
        aria-label="Interactive model of the Sun, Earth, Moon, Mercury, Venus and Mars. Drag to rotate, scroll or pinch to zoom."
      >
        {near ? (
          <Suspense fallback={null}>
            <OrbitsScene frame={frame} playing={playing} speed={speed} trails={trails} resetKey={resetKey} />
          </Suspense>
        ) : null}
      </div>
      <div className="mt-4">
        <ControlBar>
          <Segmented label="Frame of reference" value={frame} options={FRAMES} onChange={setFrame} />
          <Button onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</Button>
          <Range label="Speed" value={speed} min={0} max={100} onChange={setSpeed} />
          <Check label="Trails" checked={trails} onChange={setTrails} />
          <Button onClick={() => setResetKey((k) => k + 1)}>Reset</Button>
        </ControlBar>
      </div>
      <figcaption className="mt-4 max-w-[68ch] text-sm leading-relaxed text-ink-2">
        <strong className="font-medium text-ink">{CAPTIONS[frame].split(". ")[0]}.</strong> {CAPTIONS[frame].split(". ").slice(1).join(". ")}
      </figcaption>
    </figure>
  );
}
