/**
 * Site-wide behaviour: theme, reading settings, navigation drawer,
 * table-of-contents highlighting, search, verse copying and small niceties.
 */
import { initSearch } from "./search.js";

const root = document.documentElement;
const body = document.body;
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

/* ------------------------------------------------------------------ theme */
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(pref) {
  const dark = pref === "dark" || (pref === "system" && darkQuery.matches);
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.themePref = pref;
  const toggle = $("[data-theme-toggle]");
  if (toggle) {
    const label = { system: "Theme: follows system", light: "Theme: light", dark: "Theme: dark" }[pref];
    toggle.setAttribute("aria-label", `${label}. Click to change.`);
    toggle.title = label;
  }
  syncSegmented("[data-set-theme]", "setTheme", pref);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { dark } }));
}

function setTheme(pref) {
  store.set("theme", pref);
  applyTheme(pref);
}

darkQuery.addEventListener("change", () => {
  if ((root.dataset.themePref || "system") === "system") applyTheme("system");
});

$("[data-theme-toggle]")?.addEventListener("click", () => {
  const order = ["system", "light", "dark"];
  const cur = root.dataset.themePref || "system";
  setTheme(order[(order.indexOf(cur) + 1) % order.length]);
});

/* ------------------------------------------------------- reading settings */
function syncSegmented(selector, key, value) {
  $$(selector).forEach((b) => b.setAttribute("aria-checked", String(b.dataset[key] === value)));
}

let legibleLoaded = false;
function loadLegibleFont() {
  if (legibleLoaded) return;
  legibleLoaded = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap";
  document.head.appendChild(link);
}

const settings = {
  size: { attr: "textSize", key: "textSize", sel: "[data-set-size]", data: "setSize", def: "m" },
  font: { attr: "font", key: "readingFont", sel: "[data-set-font]", data: "setFont", def: "sans" },
  arabic: { attr: "arabicSize", key: "arabicSize", sel: "[data-set-arabic]", data: "setArabic", def: "m" },
};

function applySetting(s, value) {
  if (value === s.def) delete root.dataset[s.attr];
  else root.dataset[s.attr] = value;
  if (s.attr === "font" && value === "legible") loadLegibleFont();
  syncSegmented(s.sel, s.data, value);
}

Object.values(settings).forEach((s) => {
  applySetting(s, store.get(s.key) || s.def);
  $$(s.sel).forEach((b) => b.addEventListener("click", () => {
    store.set(s.key, b.dataset[s.data]);
    applySetting(s, b.dataset[s.data]);
  }));
});
$$("[data-set-theme]").forEach((b) => b.addEventListener("click", () => setTheme(b.dataset.setTheme)));
applyTheme(root.dataset.themePref || "system");

const settingsPanel = $("#settings");
const settingsBtn = $("[data-settings-open]");
function toggleSettings(open) {
  const show = open ?? settingsPanel.hidden;
  settingsPanel.hidden = !show;
  settingsBtn.setAttribute("aria-expanded", String(show));
  if (show) settingsPanel.querySelector('[aria-checked="true"]')?.focus();
}
settingsBtn?.addEventListener("click", (e) => { e.stopPropagation(); toggleSettings(); });
document.addEventListener("click", (e) => {
  if (!settingsPanel.hidden && !settingsPanel.contains(e.target)) toggleSettings(false);
});

/* ------------------------------------------------------ navigation drawer */
const navBtn = $("[data-nav-toggle]");
const scrim = $(".scrim");
function setNav(open) {
  body.classList.toggle("nav-open", open);
  navBtn?.setAttribute("aria-expanded", String(open));
  navBtn?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  if (scrim) scrim.hidden = !open;
  if (open) $(".sidenav a[aria-current]")?.focus({ preventScroll: true });
}
navBtn?.addEventListener("click", () => setNav(!body.classList.contains("nav-open")));
scrim?.addEventListener("click", () => setNav(false));
window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => { if (e.matches) setNav(false); });

// Keep the current page visible in a long sidebar
$(".sidenav a[aria-current]")?.scrollIntoView({ block: "center", behavior: "instant" });

/* --------------------------------------------------------------- keyboard */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!settingsPanel.hidden) { toggleSettings(false); settingsBtn.focus(); }
    if (body.classList.contains("nav-open")) { setNav(false); navBtn.focus(); }
  }
});

/* ------------------------------------------------------------ table of contents */
const tocLinks = $$(".toc a");
if (tocLinks.length) {
  // Inline copy for medium screens, placed before the page body
  const inline = document.createElement("details");
  inline.className = "toc-inline";
  inline.innerHTML = `<summary>On this page</summary><ol>${tocLinks.map((a) => `<li><a href="${a.getAttribute("href")}">${a.textContent}</a></li>`).join("")}</ol>`;
  $(".page-body")?.before(inline);
  inline.addEventListener("click", (e) => { if (e.target.closest("a")) inline.open = false; });

  const targets = tocLinks.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.28;
    let current = targets[0];
    for (const t of targets) { if (t.getBoundingClientRect().top <= line) current = t; else break; }
    tocLinks.forEach((a) => a.classList.toggle("is-active", a.hash.slice(1) === current?.id));
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ------------------------------------------------------------- copy verse */
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const fig = btn.closest(".verse");
  const ar = fig.querySelector(".verse__ar").innerText.trim();
  const en = fig.querySelector(".verse__en").innerText.trim();
  const text = `${ar}\n\n${en}\n— Qur’an ${fig.dataset.ref} (English: ${document.body.dataset.translation || ""})`;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = "Copied";
  } catch {
    btn.textContent = "Copy failed";
  }
  btn.classList.add("is-done");
  setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("is-done"); }, 1800);
});

/* ------------------------------------------------------------ email links */
// On computers, open a Gmail compose window in the browser instead of a desktop mail client.
// On phones and tablets, keep mailto: so the phone's mail app opens (Gmail on Android).
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));   // iPadOS
$$('a[href^="mailto:"]').forEach((a) => {
  const [addr, query = ""] = a.getAttribute("href").slice(7).split("?");
  const subject = new URLSearchParams(query).get("subject") || "Islam & Science website";
  if (isMobile) {
    a.href = `mailto:${addr}?subject=${encodeURIComponent(subject)}`;
  } else {
    a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(addr)}&su=${encodeURIComponent(subject)}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "Opens Gmail in a new tab";
  }
});

/* ------------------------------------------------------------ back to top */
const toTop = $("[data-to-top]");
if (toTop) {
  const onScroll = () => { toTop.hidden = window.scrollY < 900; };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
    $("#main")?.focus({ preventScroll: true });
  });
}

/* ------------------------------------------------------ reveal on scroll */
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("is-in"));
}

/* ----------------------------------------------------------------- search */
initSearch({ root: body.dataset.root || "" });
