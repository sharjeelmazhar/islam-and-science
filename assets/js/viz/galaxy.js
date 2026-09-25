/**
 * Home hero: a slowly turning spiral galaxy made of a few thousand stars.
 * Drag to tilt and turn it. Purely illustrative (not a model of the Milky Way).
 */
import { createStage, rng, gaussian, starfield, reducedMotion } from "./engine.js";

const host = document.querySelector("[data-galaxy]");
if (host) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-label", "An illustrated spiral galaxy. Drag to rotate.");
  canvas.setAttribute("role", "img");
  host.appendChild(canvas);

  const rand = rng(1447);
  const R = 520;
  const ARMS = 2;
  const stars = [];
  const N = window.innerWidth < 700 ? 4200 : 7000;

  for (let i = 0; i < N; i++) {
    const kind = rand();
    let r, a, y;
    if (kind < 0.22) {                        // central bulge
      r = Math.abs(gaussian(rand)) * 70;
      a = rand() * Math.PI * 2;
      y = gaussian(rand) * 38 * Math.exp(-r / 160);
    } else if (kind < 0.9) {                  // spiral arms (logarithmic)
      r = 40 + Math.pow(rand(), 0.8) * R;
      const arm = Math.floor(rand() * ARMS);
      const twist = Math.log(r / 40) * 2.35;
      const spread = gaussian(rand) * (0.18 + 18 / r);
      a = arm * (Math.PI * 2 / ARMS) + twist + spread;
      y = gaussian(rand) * 9;
    } else {                                   // diffuse disc
      r = rand() * R * 1.05;
      a = rand() * Math.PI * 2;
      y = gaussian(rand) * 14;
    }
    const core = Math.max(0, 1 - r / 260);
    const bright = rand();
    stars.push({
      r, a, y,
      // flat-ish rotation curve: inner stars turn faster in angle
      w: 0.055 * (60 / (r + 60)) + 0.012,
      size: bright > 0.985 ? 2.6 : bright > 0.9 ? 1.8 : 1.25,
      warm: core > 0.25 || rand() < 0.06,
      alpha: 0.45 + rand() * 0.55,
    });
  }

  let bg = null;
  const stage = createStage(canvas, {
    yaw: 0.5, pitch: 0.98, distance: 1500, fov: 1250,
    minPitch: 0.05, maxPitch: 1.5, minZoom: 0.6, maxZoom: 2.2,
    onResize(s) {
      bg = starfield(s.w, s.h, s.dpr, Math.round((s.w * s.h) / 1600), 99);
      const wide = s.w > 900;
      s.cam.cx = wide ? 0.68 : 0.5;
      s.cam.cy = wide ? 0.5 : 0.33;
      s.cam.zoom = wide ? 1.15 : 1.0;
    },
    onFrame(s, dt) {
      const { ctx, w, h } = s;
      ctx.clearRect(0, 0, w, h);
      if (bg) ctx.drawImage(bg, 0, 0, w, h);
      if (!s.interacting && s.playing) s.cam.yaw += dt * 0.02;

      // core glow
      const c = s.project(0, 0, 0);
      const gr = 150 * c.s;
      const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, gr);
      g.addColorStop(0, "rgba(255,236,200,0.55)");
      g.addColorStop(0.35, "rgba(230,200,150,0.16)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(c.x, c.y, gr, 0, Math.PI * 2); ctx.fill();

      ctx.globalCompositeOperation = "lighter";
      const t = s.t;
      for (const st of stars) {
        const ang = st.a + t * st.w;
        const p = s.project(Math.cos(ang) * st.r, st.y, Math.sin(ang) * st.r);
        const size = Math.max(1, st.size * p.s * 1.25);
        ctx.fillStyle = st.warm
          ? `rgba(255,226,170,${st.alpha})`
          : `rgba(215,225,255,${st.alpha * 0.9})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalCompositeOperation = "source-over";
    },
  });

  if (reducedMotion) stage.redraw();
}
