/**
 * Expanding space. Galaxies sit on a comoving grid that is scaled by a(t).
 * Click or tap any galaxy to stand on it: every other galaxy recedes, with
 * speed proportional to distance (the Hubble–Lemaître law). Galaxies themselves
 * do not grow, because gravity holds them together.
 */
import { rng, starfield, reducedMotion } from "./engine.js";

document.querySelectorAll("[data-expansion]").forEach((root) => {
  const stageEl = root.querySelector(".viz__stage");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Galaxies moving apart as space expands. Click a galaxy to view from it.");
  stageEl.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const overlay = root.querySelector("[data-overlay]");
  const slider = root.querySelector("[data-scale]");
  const playBtn = root.querySelector("[data-play]");
  const arrowsInput = root.querySelector("[data-arrows]");

  const rand = rng(2024);
  const gal = [];
  for (let i = 0; i < 70; i++) {
    const r = Math.sqrt(rand()) * 0.95;
    const a = rand() * Math.PI * 2;
    gal.push({ x: Math.cos(a) * r, y: Math.sin(a) * r * 0.62, tilt: rand() * Math.PI, e: 0.35 + rand() * 0.6, size: 3 + rand() * 4, warm: rand() < 0.4 });
  }
  gal[0].x = 0; gal[0].y = 0; gal[0].size = 6;
  let ref = 0;
  let a = 1;
  let playing = !reducedMotion;
  let w = 0, h = 0, dpr = 1, bg = null, visible = false, last = 0, raf = 0;

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bg = starfield(w, h, dpr, Math.round((w * h) / 2600), 5);
    draw();
  }
  new ResizeObserver(resize).observe(canvas);

  const unit = () => Math.min(w, h * 1.5) * 0.36;
  const toScreen = (g) => {
    const R = gal[ref];
    return { x: w / 2 + (g.x - R.x) * a * unit(), y: h / 2 + (g.y - R.y) * a * unit() };
  };

  function draw() {
    ctx.clearRect(0, 0, w, h);
    if (bg) ctx.drawImage(bg, 0, 0, w, h);

    // comoving grid stretches with space
    const R = gal[ref];
    ctx.strokeStyle = "rgba(255,255,255,0.055)";
    ctx.lineWidth = 1;
    const step = 0.2;
    for (let gx = -3; gx <= 3; gx += step) {
      const x = w / 2 + (gx - R.x) * a * unit();
      if (x < -2 || x > w + 2) continue;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let gy = -3; gy <= 3; gy += step) {
      const y = h / 2 + (gy - R.y) * a * unit();
      if (y < -2 || y > h + 2) continue;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // recession arrows: v ∝ d
    if (arrowsInput?.checked !== false) {
      const k = 0.22;
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1.3;
      for (let i = 0; i < gal.length; i++) {
        if (i === ref) continue;
        const p = toScreen(gal[i]);
        const dx = (p.x - w / 2) * k, dy = (p.y - h / 2) * k;
        const len = Math.hypot(dx, dy);
        if (len < 4) continue;
        const ex = p.x + dx, ey = p.y + dy;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(ex, ey); ctx.stroke();
        const ang = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - 6 * Math.cos(ang - 0.4), ey - 6 * Math.sin(ang - 0.4));
        ctx.lineTo(ex - 6 * Math.cos(ang + 0.4), ey - 6 * Math.sin(ang + 0.4));
        ctx.closePath(); ctx.fill();
      }
    }

    // galaxies: constant physical size
    for (let i = 0; i < gal.length; i++) {
      const g = gal[i];
      const p = toScreen(g);
      if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) continue;
      const s = g.size * (w < 600 ? 0.8 : 1);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 2.2);
      const col = i === ref ? "255,255,255" : g.warm ? "255,226,176" : "205,218,255";
      grad.addColorStop(0, `rgba(${col},0.95)`);
      grad.addColorStop(0.35, `rgba(${col},0.35)`);
      grad.addColorStop(1, `rgba(${col},0)`);
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(g.tilt); ctx.scale(1, g.e);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(0, 0, s * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      if (i === ref) {
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, s * 2.8, 0, Math.PI * 2); ctx.stroke();
        ctx.font = "600 12px Inter, system-ui, sans-serif";
        ctx.fillStyle = "rgba(240,238,232,.92)";
        ctx.textAlign = "center";
        ctx.fillText("You are here", p.x, p.y - s * 2.8 - 8);
      }
    }

    if (overlay) {
      const when = a < 0.995 ? "Earlier: " : a > 1.005 ? "Later: " : "Today: ";
      overlay.innerHTML = `<span class="viz__big">Scale factor a = ${a.toFixed(2)}</span>${when}every distance between galaxies is ${a.toFixed(2)}× its present value. Click any galaxy to stand on it. The view looks the same from everywhere.`;
    }
    if (slider && document.activeElement !== slider) slider.value = String(Math.round(a * 100));
  }

  function loop(now) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (playing) {
      a += dt * 0.12 * a;               // exponential-style growth, for illustration
      if (a > 1.8) a = 0.35;
    }
    draw();
    raf = requestAnimationFrame(loop);
  }
  const sync = () => {
    cancelAnimationFrame(raf);
    if (visible && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); }
  };
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; sync(); }, { threshold: 0.02 }).observe(canvas);
  document.addEventListener("visibilitychange", sync);

  canvas.addEventListener("click", (e) => {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    let best = -1, bd = 1e9;
    gal.forEach((g, i) => { const p = toScreen(g); const d = Math.hypot(p.x - mx, p.y - my); if (d < bd) { bd = d; best = i; } });
    if (best >= 0 && bd < 40) { ref = best; draw(); }
  });

  slider?.addEventListener("input", () => { a = Number(slider.value) / 100; draw(); });
  function syncPlay() {
    if (!playBtn) return;
    playBtn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="${document.body.dataset.root}assets/img/icons.svg#${playing ? "pause" : "play"}"/></svg>${playing ? "Pause" : "Play"}`;
  }
  playBtn?.addEventListener("click", () => { playing = !playing; syncPlay(); });
  arrowsInput?.addEventListener("change", draw);
  root.querySelector("[data-reset]")?.addEventListener("click", () => { ref = 0; a = 1; draw(); });
  syncPlay();
});
