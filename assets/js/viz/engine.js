/**
 * Tiny 3D canvas engine shared by the visualisations.
 *  - crisp rendering on high-DPI screens
 *  - drag to orbit the camera (mouse, pen, touch); pinch to zoom
 *  - animation pauses when the canvas is off-screen or the tab is hidden
 *  - honours prefers-reduced-motion (starts paused)
 */
export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function createStage(canvas, opts = {}) {
  const ctx = canvas.getContext("2d");
  const cam = {
    yaw: opts.yaw ?? 0,
    pitch: opts.pitch ?? 0.45,
    zoom: opts.zoom ?? 1,
    minPitch: opts.minPitch ?? -1.45,
    maxPitch: opts.maxPitch ?? 1.45,
    minZoom: opts.minZoom ?? 0.4,
    maxZoom: opts.maxZoom ?? 4,
    fov: opts.fov ?? 900,          // focal length in "world" px at zoom 1
    distance: opts.distance ?? 1400,
    cx: 0.5, cy: 0.5,              // screen centre as a fraction of width/height
  };
  const stage = {
    canvas, ctx, cam, w: 0, h: 0, dpr: 1, t: 0, running: false, playing: !reducedMotion,
    onFrame: opts.onFrame || (() => {}),
    onResize: opts.onResize || (() => {}),
    interacting: false,
  };

  /* ---------- sizing ---------- */
  function resize() {
    const r = canvas.getBoundingClientRect();
    stage.dpr = Math.min(window.devicePixelRatio || 1, 2);
    stage.w = Math.max(1, r.width);
    stage.h = Math.max(1, r.height);
    canvas.width = Math.round(stage.w * stage.dpr);
    canvas.height = Math.round(stage.h * stage.dpr);
    ctx.setTransform(stage.dpr, 0, 0, stage.dpr, 0, 0);
    stage.onResize(stage);
    if (!stage.running) draw(0);
  }
  new ResizeObserver(resize).observe(canvas);

  /* ---------- projection ---------- */
  // World: x right, y up, z towards the viewer. Returns screen x/y, scale and depth.
  stage.project = (x, y, z) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const y2 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    const unit = Math.min(stage.w, stage.h) / 1000;      // resolution independent
    const s = (cam.fov / (cam.distance - z2)) * cam.zoom * unit;
    return { x: stage.w * cam.cx + x1 * s, y: stage.h * cam.cy - y2 * s, s, z: z2 };
  };

  /* ---------- pointer: drag to rotate, pinch to zoom ---------- */
  const pointers = new Map();
  let pinchStart = 0, zoomStart = 1;
  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stage.interacting = true;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
      zoomStart = cam.zoom;
    }
  });
  canvas.addEventListener("pointermove", (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    if (pointers.size === 1 && opts.rotate !== false) {
      cam.yaw += (e.clientX - p.x) * 0.006;
      cam.pitch = Math.max(cam.minPitch, Math.min(cam.maxPitch, cam.pitch + (e.clientY - p.y) * 0.005));
    }
    p.x = e.clientX; p.y = e.clientY;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart > 0) stage.setZoom(zoomStart * (d / pinchStart));
    }
    if (!stage.running) draw(0);
  });
  const end = (e) => {
    pointers.delete(e.pointerId);
    if (!pointers.size) stage.interacting = false;
    pinchStart = 0;
  };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);

  // Keyboard: arrows rotate, +/- zoom (canvas is focusable)
  canvas.tabIndex = 0;
  canvas.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === "ArrowLeft") cam.yaw -= 0.08;
    else if (k === "ArrowRight") cam.yaw += 0.08;
    else if (k === "ArrowUp") cam.pitch = Math.max(cam.minPitch, cam.pitch - 0.06);
    else if (k === "ArrowDown") cam.pitch = Math.min(cam.maxPitch, cam.pitch + 0.06);
    else if (k === "+" || k === "=") stage.setZoom(cam.zoom * 1.12);
    else if (k === "-") stage.setZoom(cam.zoom / 1.12);
    else return;
    e.preventDefault();
    if (!stage.running) draw(0);
  });

  stage.setZoom = (z) => { cam.zoom = Math.max(cam.minZoom, Math.min(cam.maxZoom, z)); if (!stage.running) draw(0); };

  /* ---------- loop ---------- */
  let last = 0, visible = false, raf = 0;
  function draw(dt) { stage.onFrame(stage, dt); }
  function loop(now) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (stage.playing) stage.t += dt;
    draw(stage.playing ? dt : 0);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (stage.running) return; stage.running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { stage.running = false; cancelAnimationFrame(raf); }
  function sync() { (visible && !document.hidden) ? start() : stop(); }

  new IntersectionObserver((en) => { visible = en[0].isIntersecting; sync(); }, { threshold: 0.02 }).observe(canvas);
  document.addEventListener("visibilitychange", sync);

  stage.redraw = () => draw(0);
  stage.setPlaying = (p) => { stage.playing = p; };
  resize();
  return stage;
}

/* ---------- drawing helpers ---------- */
export function sphere(ctx, x, y, r, color, lightX = -0.4, lightY = -0.45, glow = 0) {
  if (r <= 0.15) return;
  if (glow > 0) {
    const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * (1 + glow));
    g.addColorStop(0, hexA(color, 0.55));
    g.addColorStop(1, hexA(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * (1 + glow), 0, Math.PI * 2); ctx.fill();
  }
  const g = ctx.createRadialGradient(x + r * lightX, y + r * lightY, r * 0.08, x, y, r);
  g.addColorStop(0, shade(color, 0.45));
  g.addColorStop(0.55, color);
  g.addColorStop(1, shade(color, -0.55));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}

export function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return `rgb(${r},${g},${b})`;
}

/** Deterministic pseudo-random numbers so layouts are stable between visits. */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Static background stars rendered once into an offscreen canvas. */
export function starfield(w, h, dpr, count, seed = 7) {
  const c = document.createElement("canvas");
  c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
  const x = c.getContext("2d");
  x.scale(dpr, dpr);
  const rand = rng(seed);
  for (let i = 0; i < count; i++) {
    const px = rand() * w, py = rand() * h;
    const m = rand();
    const r = m > 0.985 ? 1.3 : m > 0.9 ? 0.9 : 0.55;
    x.fillStyle = `rgba(255,255,255,${0.15 + rand() * 0.55})`;
    x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
  }
  return c;
}
