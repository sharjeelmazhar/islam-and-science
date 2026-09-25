/**
 * Frames of reference: the same inner Solar System drawn three ways.
 *   helio    — Sun at the centre (strictly: near the Solar System's centre of mass)
 *   geo      — Earth held still at the centre; everything else moves relative to it
 *   galactic — the Sun and planets carried along on the Sun's orbit around the Milky Way
 *
 * Circular, coplanar orbits with real periods. Sizes and the Moon's distance are
 * exaggerated so they can be seen; the text in the page says so.
 */
import { createStage, sphere, hexA, starfield, reducedMotion } from "./engine.js";

const AU = 300;                       // world units per astronomical unit
const BODIES = [
  { id: "mercury", name: "Mercury", a: 0.387, P: 87.969, r: 5, color: "#b9ab98", phase: 1.2 },
  { id: "venus", name: "Venus", a: 0.723, P: 224.701, r: 8.5, color: "#e9d3a2", phase: 3.9 },
  { id: "earth", name: "Earth", a: 1.0, P: 365.256, r: 9, color: "#6aa6de", phase: 0 },
  { id: "mars", name: "Mars", a: 1.524, P: 686.98, r: 7, color: "#d9774b", phase: 0.6 },
];
const MOON = { id: "moon", name: "Moon", a: 0.15, P: 27.3217, r: 3.4, color: "#d8d6d0", phase: 0 };
const SUN = { id: "sun", name: "Sun", r: 30, color: "#f5c866" };

const CAPTIONS = {
  helio: "<strong>Sun-centred frame.</strong> Strictly, this is centred on the Solar System’s centre of mass, which lies close to the Sun. Earth completes one orbit in 365.25 days and the Moon circles Earth every 27.3 days. Planet sizes and the Moon’s distance are enlarged so they can be seen.",
  geo: "<strong>Earth-centred frame.</strong> These are the same motions, described with Earth held still. The Sun now circles Earth once a year, and Mars and Venus trace loops (retrograde motion). Ptolemy modelled those loops with epicycles. Both descriptions predict the same positions in the sky, and they differ in which one physics finds simpler.",
  galactic: "<strong>Travelling through the galaxy.</strong> The Sun carries its planets around the centre of the Milky Way at roughly 230 km/s, so each planet’s real path is a stretched helix. The forward motion is slowed about 10× here so the spirals are visible. At true proportions each turn would be about 48 AU long. The tilt of the orbital plane is illustrative.",
};

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];

document.querySelectorAll("[data-orbits]").forEach(setup);

function setup(root) {
  const stageEl = root.querySelector(".viz__stage");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Interactive model of the Sun, Earth, Moon, Mercury, Venus and Mars. Drag to rotate.");
  stageEl.prepend(canvas);

  const overlay = root.querySelector("[data-overlay]");
  const caption = root.querySelector("[data-caption]");
  const playBtn = root.querySelector("[data-play]");
  const speedInput = root.querySelector("[data-speed]");
  const trailsInput = root.querySelector("[data-trails]");
  const modeBtns = [...root.querySelectorAll("[data-mode]")];

  let mode = root.dataset.start || "helio";
  let days = 0;
  let trails = new Map();
  let sampleAcc = 0;
  let bg = null;

  const VIEWS = {
    helio: { yaw: 0.35, pitch: 0.62, zoom: 1.5 },
    geo: { yaw: 0.35, pitch: 0.9, zoom: 1.0 },
    galactic: { yaw: -0.9, pitch: 0.36, zoom: 1.25 },
  };

  const stage = createStage(canvas, {
    distance: 1800, fov: 1200, minZoom: 0.35, maxZoom: 3.5,
    onResize(s) { bg = starfield(s.w, s.h, s.dpr, Math.round((s.w * s.h) / 2200), 21); },
    onFrame: frame,
  });

  function daysPerSecond() {
    const v = Number(speedInput?.value ?? 40) / 100;   // 0..1, logarithmic 4 → 240 days/s
    return 4 * Math.pow(60, v);
  }

  /* ---------- kinematics ---------- */
  function helioPos(b, d) {
    const ang = b.phase + (2 * Math.PI * d) / b.P;
    return [Math.cos(ang) * b.a * AU, 0, -Math.sin(ang) * b.a * AU];
  }
  function moonOffset(d) {
    const ang = (2 * Math.PI * d) / MOON.P;
    return [Math.cos(ang) * MOON.a * AU, 0, -Math.sin(ang) * MOON.a * AU];
  }

  // Galactic mode: orbital plane tilted about the x axis, system moving along +x.
  const TILT = (60 * Math.PI) / 180;
  const SUN_SPEED = (48.5 / 10) * AU / 365.256;           // world units per day (10× compressed)
  const tilt = ([x, y, z]) => [x, y * Math.cos(TILT) - z * Math.sin(TILT), y * Math.sin(TILT) + z * Math.cos(TILT)];

  function positions(d) {
    const out = {};
    const earth = helioPos(BODIES[2], d);
    const moonRel = moonOffset(d);
    if (mode === "helio") {
      out.sun = [0, 0, 0];
      for (const b of BODIES) out[b.id] = helioPos(b, d);
      out.moon = add(out.earth, moonRel);
    } else if (mode === "geo") {
      out.sun = scale(earth, -1);
      for (const b of BODIES) out[b.id] = sub(helioPos(b, d), earth);
      out.moon = moonRel;
    } else {
      const sun = [SUN_SPEED * d, 0, 0];
      out.sun = sun;
      for (const b of BODIES) out[b.id] = add(sun, tilt(helioPos(b, d)));
      out.moon = add(out.earth, tilt(moonRel));
    }
    return out;
  }

  function centre(pos) {
    if (mode === "galactic") return pos.sun;
    return [0, 0, 0];
  }

  /* ---------- drawing ---------- */
  function frame(s, dt) {
    const { ctx, w, h } = s;
    if (s.playing) days += dt * daysPerSecond();
    const pos = positions(days);
    const c = centre(pos);

    // trails: sample every ~1.5 simulated days
    if (trailsInput?.checked !== false && s.playing) {
      sampleAcc += dt * daysPerSecond();
      if (sampleAcc > 1.5) {
        sampleAcc = 0;
        const maxLen = mode === "geo" ? 2200 : mode === "galactic" ? 900 : 700;
        for (const id of ["mercury", "venus", "earth", "mars", "moon", "sun"]) {
          if (mode === "helio" && id === "sun") continue;
          if (mode === "geo" && id === "earth") continue;
          const arr = trails.get(id) || [];
          arr.push(pos[id]);
          if (arr.length > maxLen) arr.splice(0, arr.length - maxLen);
          trails.set(id, arr);
        }
      }
    }

    ctx.clearRect(0, 0, w, h);
    if (bg) ctx.drawImage(bg, 0, 0, w, h);
    const P = (p) => s.project(p[0] - c[0], p[1] - c[1], p[2] - c[2]);

    // orbit guides
    ctx.lineWidth = 1;
    if (mode === "helio") {
      for (const b of BODIES) ring(ctx, P, [0, 0, 0], b.a * AU, "rgba(255,255,255,0.13)");
      ring(ctx, P, pos.earth, MOON.a * AU, "rgba(255,255,255,0.10)");
    } else if (mode === "geo") {
      ring(ctx, P, [0, 0, 0], AU, "rgba(245,200,102,0.22)", [5, 6]);   // the Sun's apparent yearly circle
      ring(ctx, P, [0, 0, 0], MOON.a * AU, "rgba(255,255,255,0.10)");
    }

    // trails
    if (trailsInput?.checked !== false) {
      for (const [id, arr] of trails) {
        if (arr.length < 2) continue;
        const col = id === "sun" ? SUN.color : id === "moon" ? MOON.color : BODIES.find((b) => b.id === id).color;
        ctx.lineWidth = id === "moon" ? 1 : 1.4;
        const n = arr.length;
        let prev = P(arr[0]);
        for (let i = 1; i < n; i++) {
          const q = P(arr[i]);
          ctx.strokeStyle = hexA(col, 0.05 + 0.6 * (i / n));
          ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          prev = q;
        }
      }
    }

    // bodies, back to front
    const list = [
      { ...SUN, p: P(pos.sun) },
      ...BODIES.map((b) => ({ ...b, p: P(pos[b.id]) })),
      { ...MOON, p: P(pos.moon) },
    ].sort((a, b) => a.p.z - b.p.z);

    ctx.font = "500 12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (const b of list) {
      const r = Math.max(b.id === "moon" ? 2 : 3, b.r * b.p.s * 1.35);
      sphere(ctx, b.p.x, b.p.y, r, b.color, -0.35, -0.4, b.id === "sun" ? 1.4 : 0);
      if (b.id !== "moon" || mode === "geo") {
        ctx.fillStyle = "rgba(235,233,228,0.78)";
        ctx.fillText(b.name, b.p.x, b.p.y + r + 14);
      }
    }

    if (overlay) {
      const yrs = days / 365.256;
      overlay.innerHTML = `<span class="viz__big">Day ${Math.floor(days).toLocaleString()}</span>${yrs.toFixed(2)} Earth years · ${Math.round(daysPerSecond())} days per second`;
    }
  }

  function ring(ctx, P, centre3, radius, color, dash) {
    ctx.strokeStyle = color;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      const q = P([centre3[0] + Math.cos(a) * radius, centre3[1], centre3[2] - Math.sin(a) * radius]);
      i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /* ---------- controls ---------- */
  function setMode(m, resetView = true) {
    mode = m;
    trails = new Map();
    sampleAcc = 0;
    modeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
    if (resetView) Object.assign(stage.cam, VIEWS[m]);
    if (caption) caption.innerHTML = CAPTIONS[m];
    stage.redraw();
  }
  modeBtns.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));

  function syncPlay() {
    if (!playBtn) return;
    playBtn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="${document.body.dataset.root}assets/img/icons.svg#${stage.playing ? "pause" : "play"}"/></svg>${stage.playing ? "Pause" : "Play"}`;
  }
  playBtn?.addEventListener("click", () => { stage.setPlaying(!stage.playing); syncPlay(); });
  root.querySelector("[data-reset]")?.addEventListener("click", () => { days = 0; setMode(mode); });
  trailsInput?.addEventListener("change", () => { trails = new Map(); stage.redraw(); });
  speedInput?.addEventListener("input", () => stage.redraw());

  setMode(mode);
  syncPlay();
  if (reducedMotion) { days = 120; stage.redraw(); }
}

