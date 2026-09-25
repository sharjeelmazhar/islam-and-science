/**
 * Small interactive calculators. Each activates only if its markup is on the page.
 */
const $ = (s, el = document) => el.querySelector(s);
const fmt = (n, d = 2) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 });

/* ======================================================= prime helpers */
export function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}
export function factorise(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}
const factorString = (n) => {
  if (n < 2) return String(n);
  const f = factorise(n);
  const counts = f.reduce((m, p) => m.set(p, (m.get(p) || 0) + 1), new Map());
  return [...counts].map(([p, k]) => (k > 1 ? `${p}<sup>${k}</sup>` : p)).join(" × ");
};

/* ======================================================= abjad calculator */
// Standard (Mashriqi) abjad values.
const ABJAD = {
  "ا": 1, "أ": 1, "إ": 1, "آ": 1, "ٱ": 1, "ء": 1, "ب": 2, "ج": 3, "د": 4, "ه": 5, "ة": 5, "و": 6, "ؤ": 6, "ز": 7,
  "ح": 8, "ط": 9, "ي": 10, "ى": 10, "ئ": 10, "ك": 20, "ل": 30, "م": 40, "ن": 50, "س": 60, "ع": 70, "ف": 80,
  "ص": 90, "ق": 100, "ر": 200, "ش": 300, "ت": 400, "ث": 500, "خ": 600, "ذ": 700, "ض": 800, "ظ": 900, "غ": 1000,
};
function abjadLetters(text) {
  // Drop diacritics, Qur'anic annotation marks and tatweel; keep base letters.
  const clean = text.normalize("NFC").replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, "");
  return [...clean].filter((ch) => ABJAD[ch] !== undefined).map((ch) => ({ ch, v: ABJAD[ch] }));
}

const abjad = $("[data-abjad]");
if (abjad) {
  const input = $("input", abjad);
  const out = $("[data-abjad-out]", abjad);
  const chips = $("[data-abjad-chips]", abjad);
  const render = () => {
    const letters = abjadLetters(input.value);
    const total = letters.reduce((s, l) => s + l.v, 0);
    chips.innerHTML = letters.map((l) => `<span class="lab__chip"><b>${l.ch}</b><small>${l.v}</small></span>`).join("");
    out.innerHTML = letters.length
      ? `<div class="lab__big">${total.toLocaleString()}</div>
         <div class="lab__sub">${letters.length} letters · ${total > 1 ? `factors: ${factorString(total)}` : ""}${isPrime(total) ? " · <strong>prime</strong>" : ""} · ${total % 19 === 0 ? `<strong>divisible by 19</strong> (19 × ${total / 19})` : `not divisible by 19 (remainder ${total % 19})`}</div>`
      : `<div class="lab__sub">Type or paste Arabic text above.</div>`;
  };
  input.addEventListener("input", render);
  abjad.querySelectorAll("[data-preset]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.preset; render(); }));
  render();
}

/* ======================================================= solar ↔ lunar years */
const SOLAR = 365.2422, LUNAR = 354.36707;   // mean tropical year; 12 mean synodic months
const years = $("[data-years]");
if (years) {
  const input = $("input", years);
  const out = $("[data-years-out]", years);
  const render = () => {
    const y = Math.max(0, Number(input.value) || 0);
    const lunar = (y * SOLAR) / LUNAR;
    out.innerHTML = `<div class="lab__big">${fmt(y, 2)} solar = ${fmt(lunar, 2)} lunar years</div>
      <div class="lab__sub">Difference: ${fmt(lunar - y, 2)} years (${fmt(y * SOLAR, 0)} days). A lunar year of 12 months is ${fmt(SOLAR - LUNAR, 2)} days shorter than a solar year.</div>`;
  };
  input.addEventListener("input", render);
  render();
}

/* ======================================================= inheritance: al-Minbariyya */
const awl = $("[data-awl]");
if (awl) {
  const heirs = [
    { name: "Wife", share: [1, 8], color: "#111111", ink: "#ffffff" },
    { name: "Two daughters", share: [2, 3], color: "#4a4a4a", ink: "#ffffff" },
    { name: "Father", share: [1, 6], color: "#8c8c8c", ink: "#000000" },
    { name: "Mother", share: [1, 6], color: "#c8c8c8", ink: "#000000" },
  ];
  const base = 24;
  const parts = heirs.map((h) => (h.share[0] * base) / h.share[1]);   // 3, 16, 4, 4
  const sum = parts.reduce((a, b) => a + b, 0);                       // 27
  const before = $("[data-awl-before]", awl);
  const after = $("[data-awl-after]", awl);
  before.innerHTML = heirs.map((h, i) => `<span style="flex-basis:${(parts[i] / sum) * 100}%;background:${h.color};color:${h.ink}" title="${h.name}: ${h.share.join("/")} = ${parts[i]}/24">${h.share.join("/")}</span>`).join("");
  after.innerHTML = heirs.map((h, i) => `<span style="flex-basis:${(parts[i] / sum) * 100}%;background:${h.color};color:${h.ink}" title="${h.name}: ${parts[i]}/27">${parts[i]}/27</span>`).join("");
  $("[data-awl-legend]", awl).innerHTML = heirs.map((h, i) => `<span><i style="background:${h.color};outline:1px solid var(--border-strong)"></i>${h.name}: ${h.share.join("/")} → ${parts[i]}/24 → <strong>${parts[i]}/27</strong></span>`).join("");
  $("[data-awl-sum]", awl).textContent = `${parts.join(" + ")} = ${sum} parts of 24, which is ${sum - base} more than the whole estate`;
}

/* ======================================================= prime checker */
const primeTool = $("[data-prime]");
if (primeTool) {
  const input = $("input", primeTool);
  const out = $("[data-prime-out]", primeTool);
  const render = () => {
    const n = Math.floor(Number(input.value));
    if (!Number.isFinite(n) || n < 1 || n > 1e12) { out.innerHTML = `<div class="lab__sub">Enter a whole number from 1 to 10<sup>12</sup>.</div>`; return; }
    out.innerHTML = `<div class="lab__big">${n.toLocaleString()} ${isPrime(n) ? "is prime" : n === 1 ? "is neither prime nor composite" : "is composite"}</div>
      <div class="lab__sub">${n > 1 ? `Prime factorisation: ${factorString(n)}` : ""}${n % 19 === 0 ? ` · divisible by 19 (19 × ${(n / 19).toLocaleString()})` : ""}</div>`;
  };
  input.addEventListener("input", render);
  render();
}
document.querySelectorAll("[data-mark-primes] span").forEach((s) => {
  const n = Number(s.dataset.n || s.firstChild.textContent.replace(/,/g, ""));
  if (isPrime(n)) { s.classList.add("is-prime"); s.title = "Prime"; }
});

/* ======================================================= isostasy (Airy) */
const iso = $("[data-iso]");
if (iso) {
  const hIn = $("[data-iso-h]", iso), rcIn = $("[data-iso-rc]", iso), rmIn = $("[data-iso-rm]", iso);
  const svg = $("svg", iso);
  const out = $("[data-iso-out]", iso);
  const K = 5, SEA = 80, CRUST = 35, CX = 400;
  const draw = () => {
    const h = Number(hIn.value) / 10, rc = Number(rcIn.value) / 100, rm = Number(rmIn.value) / 100;
    const root = (h * rc) / (rm - rc);
    const crustBase = SEA + CRUST * K;
    const base = 70 + h * 20, halfRoot = base * 0.55;
    const peak = SEA - h * K, bottom = crustBase + root * K;
    svg.innerHTML = `
      <rect class="iso-mantle" x="0" y="0" width="800" height="600"/>
      <rect class="iso-sea" x="0" y="0" width="800" height="${SEA}"/>
      <path class="iso-crust" d="M0 ${SEA} L${CX - base} ${SEA} L${CX} ${peak} L${CX + base} ${SEA} L800 ${SEA} L800 ${crustBase} L${CX + halfRoot + 60} ${crustBase} Q${CX + halfRoot * .5} ${bottom} ${CX} ${bottom} Q${CX - halfRoot * .5} ${bottom} ${CX - halfRoot - 60} ${crustBase} L0 ${crustBase} Z"/>
      <line class="iso-dim" x1="${CX + base + 16}" y1="${peak}" x2="${CX + base + 16}" y2="${SEA}"/>
      <line class="iso-dim" x1="${CX + 4}" y1="${peak}" x2="${CX + base + 22}" y2="${peak}" stroke-dasharray="3 4"/>
      <text class="iso-label" x="${CX + base + 26}" y="${Math.max(peak, SEA - 30) + 4}">height ${h.toFixed(1)} km</text>
      <line class="iso-dim" x1="${CX + 18}" y1="${crustBase}" x2="${CX + 18}" y2="${bottom}"/>
      <text class="iso-label" x="${CX + 28}" y="${(crustBase + bottom) / 2 + 5}">root ≈ ${root.toFixed(1)} km</text>
      <line class="iso-dim" x1="60" y1="${SEA}" x2="60" y2="${crustBase}"/>
      <text x="70" y="${(SEA + crustBase) / 2 + 5}">normal crust ≈ ${CRUST} km</text>
      <text x="20" y="${SEA - 12}">surface</text>
      <text x="20" y="${Math.min(590, Math.max(crustBase + 40, 360))}">mantle (denser, ${rm.toFixed(2)} g/cm³)</text>
      <text x="${CX + halfRoot + 90}" y="${crustBase - 20}">crust (${rc.toFixed(2)} g/cm³)</text>`;
    out.innerHTML = `<div class="lab__big">Root ≈ ${root.toFixed(1)} km · ${(root / Math.max(h, 0.01)).toFixed(1)}× the height</div>
      <div class="lab__sub">Airy isostasy: root = h × ρ<sub>crust</sub> / (ρ<sub>mantle</sub> − ρ<sub>crust</sub>). A simplified model; real mountain belts vary.</div>`;
  };
  [hIn, rcIn, rmIn].forEach((el) => el.addEventListener("input", draw));
  draw();
}

/* ======================================================= time dilation */
const td = $("[data-dilation]");
if (td) {
  const input = $("input[type=range]", td);
  const out = $("[data-dilation-out]", td);
  const C = 299792.458;
  let beta = 0.8;
  const render = () => {
    const g = 1 / Math.sqrt(1 - beta * beta);
    const kms = beta * C;
    const perYear = (g - 1) * 365.25 * 86400;      // seconds of Earth time gained per traveller-year
    const human = perYear < 1e-3 ? `${fmt(perYear * 1e6, 3)} microseconds`
      : perYear < 1 ? `${fmt(perYear * 1e3, 3)} milliseconds`
      : perYear < 86400 * 2 ? `${fmt(perYear / 3600, 2)} hours` : `${fmt(perYear / 86400 / 365.25, 2)} years`;
    out.innerHTML = `<div class="lab__big">γ = ${g < 1e4 ? fmt(g, 6) : g.toExponential(3)}</div>
      <div class="lab__sub">At ${fmt(kms, kms < 100 ? 3 : 0)} km/s (${beta < 0.001 ? beta.toExponential(2) : fmt(beta, 9)} c), for each year that passes for the traveller, an extra <strong>${human}</strong> pass on Earth. This is the special-relativity effect only.</div>`;
  };
  input.addEventListener("input", () => { beta = Math.min(0.9999, Number(input.value) / 10000); render(); });
  td.querySelectorAll("[data-beta]").forEach((b) => b.addEventListener("click", () => { beta = Number(b.dataset.beta); input.value = String(Math.round(beta * 10000)); render(); }));
  render();
}

/* ======================================================= light travel time */
const lt = $("[data-light]");
if (lt) {
  const sel = $("select", lt);
  const out = $("[data-light-out]", lt);
  const render = () => {
    const o = sel.selectedOptions[0];
    out.innerHTML = `<div class="lab__big">${o.dataset.time}</div><div class="lab__sub">${o.dataset.note}</div>`;
  };
  sel.addEventListener("change", render);
  render();
}
