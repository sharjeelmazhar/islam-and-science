/**
 * Client-side search over a prebuilt index (assets/search-index.json).
 * Open with "/" or Ctrl/⌘+K. Arrow keys move, Enter opens.
 */
export function initSearch({ root }) {
  const wrap = document.querySelector("[data-search]");
  const input = document.querySelector("[data-search-input]");
  const list = document.querySelector("[data-search-results]");
  if (!wrap || !input || !list) return;

  let index = null;
  let items = [];
  let active = -1;
  let lastFocus = null;

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘`]/g, "'");
  const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  async function load() {
    if (index) return index;
    const res = await fetch(`${root}assets/search-index.json`);
    const pages = await res.json();
    index = [];
    for (const p of pages) {
      for (const s of p.sections) {
        index.push({
          page: p.title,
          title: s.heading || p.title,
          url: `${root}${p.url}${s.id ? "#" + s.id : ""}`,
          text: s.text,
          hay: norm(`${p.title} ${s.heading} ${s.text}`),
          head: norm(`${p.title} ${s.heading}`),
        });
      }
    }
    return index;
  }

  function snippet(text, terms) {
    const low = norm(text);
    let pos = -1;
    for (const t of terms) { pos = low.indexOf(t); if (pos >= 0) break; }
    const start = Math.max(0, pos - 60);
    let out = (start > 0 ? "…" : "") + text.slice(start, start + 190) + (text.length > start + 190 ? "…" : "");
    out = escapeHtml(out);
    for (const t of terms) {
      if (t.length < 2) continue;
      const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
      out = out.replace(re, "<mark>$1</mark>");
    }
    return out;
  }

  function run(q) {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) { list.innerHTML = ""; items = []; return; }
    const scored = [];
    for (const e of index) {
      let score = 0;
      let all = true;
      for (const t of terms) {
        const inHay = e.hay.includes(t);
        if (!inHay) { all = false; break; }
        score += e.head.includes(t) ? 10 : 1;
        score += Math.min(5, e.hay.split(t).length - 1) * 0.3;
      }
      if (all) scored.push({ e, score });
    }
    scored.sort((a, b) => b.score - a.score);
    items = scored.slice(0, 12).map((s) => s.e);
    active = items.length ? 0 : -1;
    list.innerHTML = items.length
      ? items.map((e, i) => `<li><a href="${e.url}" ${i === 0 ? 'aria-selected="true"' : ""}>
          <span class="r-page">${escapeHtml(e.page)}</span>
          <span class="r-title">${escapeHtml(e.title)}</span>
          <span class="r-snip">${snippet(e.text, terms)}</span></a></li>`).join("")
      : `<li class="search__empty">No results for “${escapeHtml(q)}”. Try a broader word such as “moon”, “water” or “embryo”.</li>`;
  }

  function highlight(i) {
    const links = [...list.querySelectorAll("a")];
    if (!links.length) return;
    active = (i + links.length) % links.length;
    links.forEach((a, j) => a.setAttribute("aria-selected", String(j === active)));
    links[active].scrollIntoView({ block: "nearest" });
  }

  async function open() {
    lastFocus = document.activeElement;
    wrap.hidden = false;
    document.body.style.overflow = "hidden";
    input.focus();
    input.select();
    try { await load(); if (input.value) run(input.value); }
    catch { list.innerHTML = `<li class="search__empty">Search needs the site to be served over http (e.g. python3 build.py --serve).</li>`; }
  }

  function close() {
    wrap.hidden = true;
    document.body.style.overflow = "";
    lastFocus?.focus?.();
  }

  document.querySelectorAll("[data-search-open]").forEach((b) => b.addEventListener("click", open));
  wrap.querySelectorAll("[data-search-close]").forEach((b) => b.addEventListener("click", close));
  input.addEventListener("input", () => index && run(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); highlight(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlight(active - 1); }
    else if (e.key === "Enter") {
      const a = list.querySelectorAll("a")[active];
      if (a) { e.preventDefault(); close(); location.href = a.href; }
    } else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  list.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
      if (wrap.hidden) { e.preventDefault(); open(); }
    }
  });
}
