import { useEffect, useRef, useState } from "react";
import { rng } from "@/scene/clouds";
import { Button, Check, ControlBar, Range } from "./controls";

type Galaxy = { x: number; y: number; tilt: number; e: number; size: number; warm: boolean };

// 70 galaxies on a comoving grid (same seed as the original site, so the picture is familiar).
const GALAXIES: Galaxy[] = (() => {
  const rand = rng(2024);
  return Array.from({ length: 70 }, (_, i) => {
    const r = Math.sqrt(rand()) * 0.95;
    const a = rand() * Math.PI * 2;
    const g = { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.62, tilt: rand() * Math.PI, e: 0.35 + rand() * 0.6, size: 3 + rand() * 4, warm: rand() < 0.4 };
    return i === 0 ? { ...g, x: 0, y: 0, size: 6 } : g;
  });
})();

/**
 * Expanding space. Galaxies sit on a comoving grid scaled by a(t). Click any galaxy to stand on it:
 * every other galaxy recedes, faster the farther it is (Hubble–Lemaître law). Galaxies themselves
 * do not grow, because gravity holds them together. Animates only while visible and playing.
 */
export function ExpansionViz() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [a, setA] = useState(1);
  const [ref, setRef] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [arrows, setArrows] = useState(true);

  // Autoplay once visible, unless the reader prefers reduced motion.
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (!e.isIntersecting) setPlaying(false);
      else if (!reduce) setPlaying(true);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      setA((v) => (v + dt * 0.12 * v > 1.8 ? 0.35 : v + dt * 0.12 * v));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Draw whenever the state changes (and on resize or theme change).
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const draw = () => paint(el, { a, ref, arrows });
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    const mo = new MutationObserver(draw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [a, ref, arrows]);

  const when = a < 0.995 ? "Earlier: " : a > 1.005 ? "Later: " : "Today: ";
  return (
    <figure className="not-prose">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper">
        <canvas
          ref={canvas}
          role="img"
          aria-label="Galaxies moving apart as space expands. Click a galaxy to view from it."
          className="absolute inset-0 size-full cursor-pointer"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const hit = nearest(e.clientX - r.left, e.clientY - r.top, r.width, r.height, { a, ref, arrows });
            if (hit !== null) setRef(hit);
          }}
        />
        <p className="pointer-events-none absolute top-4 left-4 max-w-sm text-sm text-ink-2">
          <span className="block font-serif text-2xl text-ink">Scale factor a = {a.toFixed(2)}</span>
          {when}every distance between galaxies is {a.toFixed(2)}× its present value. Click any galaxy to stand on it. The view looks the same from everywhere.
        </p>
      </div>
      <div className="mt-4">
        <ControlBar>
          <Button onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</Button>
          <Range label="Scale factor" value={Math.round(a * 100)} min={35} max={180} onChange={(v) => setA(v / 100)} />
          <Check label="Recession arrows" checked={arrows} onChange={setArrows} />
          <Button
            onClick={() => {
              setRef(0);
              setA(1);
            }}
          >
            Reset
          </Button>
        </ControlBar>
      </div>
    </figure>
  );
}

type View = { a: number; ref: number; arrows: boolean };
const unit = (w: number, h: number) => Math.min(w, h * 1.5) * 0.36;
const origin = (ref: number) => GALAXIES[ref] ?? { x: 0, y: 0 };

function toScreen(g: Galaxy, v: View, w: number, h: number) {
  const R = origin(v.ref);
  return { x: w / 2 + (g.x - R.x) * v.a * unit(w, h), y: h / 2 + (g.y - R.y) * v.a * unit(w, h) };
}

function nearest(mx: number, my: number, w: number, h: number, v: View): number | null {
  let best = -1;
  let bd = Infinity;
  GALAXIES.forEach((g, i) => {
    const p = toScreen(g, v, w, h);
    const d = Math.hypot(p.x - mx, p.y - my);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return best >= 0 && bd < 40 ? best : null;
}

function paint(canvas: HTMLCanvasElement, v: View) {
  const r = canvas.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = r.width;
  const h = r.height;
  if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
  if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const css = getComputedStyle(document.documentElement);
  const ink = css.getPropertyValue("--ink").trim();
  const gold = css.getPropertyValue("--gold").trim();
  const light = document.documentElement.dataset.theme === "light";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // Comoving grid: it stretches with space.
  const R = origin(v.ref);
  const u = unit(w, h);
  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.07;
  ctx.lineWidth = 1;
  for (let g = -3; g <= 3.0001; g += 0.2) {
    const x = w / 2 + (g - R.x) * v.a * u;
    const y = h / 2 + (g - R.y) * v.a * u;
    if (x > -2 && x < w + 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    if (y > -2 && y < h + 2) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  // Recession arrows: speed proportional to distance.
  if (v.arrows) {
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 1.2;
    GALAXIES.forEach((g, i) => {
      if (i === v.ref) return;
      const p = toScreen(g, v, w, h);
      const dx = (p.x - w / 2) * 0.22;
      const dy = (p.y - h / 2) * 0.22;
      if (Math.hypot(dx, dy) < 4) return;
      const ex = p.x + dx;
      const ey = p.y + dy;
      const ang = Math.atan2(dy, dx);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 6 * Math.cos(ang - 0.4), ey - 6 * Math.sin(ang - 0.4));
      ctx.lineTo(ex - 6 * Math.cos(ang + 0.4), ey - 6 * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fill();
    });
  }

  // Galaxies keep a constant physical size.
  GALAXIES.forEach((g, i) => {
    const p = toScreen(g, v, w, h);
    if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) return;
    const s = g.size * (w < 600 ? 0.8 : 1);
    const col = i === v.ref || !g.warm ? ink : gold;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.2);
    grad.addColorStop(0, col);
    grad.addColorStop(1, "transparent");
    ctx.save();
    ctx.globalAlpha = light ? 0.75 : 0.95;
    ctx.translate(p.x, p.y);
    ctx.rotate(g.tilt);
    ctx.scale(1, g.e);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, s * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    if (i === v.ref) {
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = gold;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, s * 2.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = "500 11px 'IBM Plex Mono', monospace";
      ctx.fillStyle = gold;
      ctx.textAlign = "center";
      ctx.fillText("YOU ARE HERE", p.x, p.y - s * 2.8 - 8);
    }
  });
  ctx.globalAlpha = 1;
}
