#!/usr/bin/env python3
"""
Static site builder for "Islam & Science".

Zero dependencies (Python 3.9+ standard library only).

    python3 build.py            # build into ./dist
    python3 build.py --serve    # build, then serve ./dist at http://localhost:8000

Pages live in src/pages/*.html. Each begins with a small front-matter block:

    ---
    title: Origin & Expansion
    slug: cosmology
    description: One-sentence summary used for SEO and the page header.
    scripts: viz/expansion.js
    ---

and may use these shortcodes in their body:

    {{verse 51:47}}          Qur'an verse(s) — text pulled from src/data/quran.json
    {{verse 23:12-14}}       a range of consecutive verses
    {{ar 3:190}} {{en 3:190}} just the Arabic / English text of a verse ({{ar 41:53 5}}: first 5 words)
    {{hadith bukhari:5678}}  a hadith from src/data/hadith.json
    {{status interpretive}}  an evidence badge (see STATUSES)
    {{link 67:3}}            URL of the verse on dawateislami.net
    {{root}}                 relative path back to the site root

Every Qur'an reference is validated at build time; an unknown reference stops the build.
"""
from __future__ import annotations

import html
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
ASSETS = ROOT / "assets"

SITE = json.loads((SRC / "data" / "site.json").read_text(encoding="utf8"))
NAV = json.loads((SRC / "data" / "nav.json").read_text(encoding="utf8"))
QURAN = json.loads((SRC / "data" / "quran.json").read_text(encoding="utf8"))
HADITH = json.loads((SRC / "data" / "hadith.json").read_text(encoding="utf8"))
# English meanings of the verses quoted on the site (Arabic comes from quran.json).
TRANSLATION = json.loads((SRC / "data" / "translation.json").read_text(encoding="utf8"))
LAYOUT = (SRC / "layouts" / "base.html").read_text(encoding="utf8")
LOGO = (ASSETS / "img" / "logo.svg").read_text(encoding="utf8")
SURAHS = {s["n"]: s for s in QURAN["surahs"]}

STATUSES = {
    "established": ("Consistent with established science",
                    "The plain meaning of the text matches a well-established scientific finding."),
    "interpretive": ("A possible reading",
                     "A modern reading that the Arabic allows, but not the only meaning. Classical scholars often read it differently."),
    "debated": ("Scholarly debate",
                "Serious scholars disagree on how to read the text or on what science shows."),
    "unseen": ("Beyond empirical science",
               "Concerns the unseen (al-ghayb). Science can neither confirm nor refute it."),
    "caution": ("Not supported",
                "A popular claim that does not hold up to careful checking."),
}

ARABIC_DIGITS = str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩")
errors: list[str] = []


# ---------------------------------------------------------------- helpers
def esc(s: str) -> str:
    return html.escape(s, quote=True)


def slugify(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text).lower()
    text = re.sub(r"[’'`]", "", text)
    text = re.sub(r"[^a-z0-9ā-ž]+", "-", text)
    return text.strip("-") or "section"


def parse_page(path: Path) -> tuple[dict, str]:
    raw = path.read_text(encoding="utf8")
    m = re.match(r"---\n(.*?)\n---\n", raw, re.S)
    if not m:
        raise SystemExit(f"{path}: missing front matter")
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    return meta, raw[m.end():]


def page_url(slug: str) -> str:
    return "" if slug == "home" else f"{slug}/"


# ---------------------------------------------------------------- shortcodes
def verse_url(s: int, a: int) -> str:
    """Link to the verse on dawateislami.net (Kanz-ul-Iman). Their Al-Fatihah numbering leaves the
    basmala unnumbered, so Kufan 1:n is their 1:(n-1); the basmala itself links to the surah page."""
    meta = TRANSLATION["meta"]
    slug = meta["slugs"][str(s)]
    if s == 1:
        a -= 1
        if a == 0:
            return f"https://www.dawateislami.net/quran/{slug}/translation-4"
    return meta["verse_url"].format(slug=slug, ayah=a)


def render_verse(ref: str, page: str) -> str:
    m = re.fullmatch(r"(\d+):(\d+)(?:-(\d+))?", ref.strip())
    if not m:
        errors.append(f"{page}: bad verse reference '{ref}'")
        return ""
    s, a1 = int(m.group(1)), int(m.group(2))
    a2 = int(m.group(3) or a1)
    ar_parts, en_parts = [], []
    for a in range(a1, a2 + 1):
        key = f"{s}:{a}"
        if key not in QURAN["verses"]:
            errors.append(f"{page}: unknown verse {key}")
            return ""
        ar = QURAN["verses"][key]
        en = TRANSLATION["verses"].get(key)
        if en is None:
            errors.append(f"{page}: no English translation for {key} in src/data/translation.json")
            return ""
        ar_parts.append(f'{esc(ar)} <span class="verse__num">۝{str(a).translate(ARABIC_DIGITS)}</span>')
        num = f'<sup class="verse__sup">{a}</sup>' if a2 > a1 else ""
        en_parts.append(f"{num}{esc(en)}")
    surah = SURAHS[s]
    label = f"{s}:{a1}" + (f"–{a2}" if a2 > a1 else "")
    url = verse_url(s, a1)
    return (
        f'<figure class="verse" data-ref="{label}">'
        f'<blockquote cite="{url}">'
        f'<p class="verse__ar" lang="ar" dir="rtl">{" ".join(ar_parts)}</p>'
        f'<p class="verse__en">{" ".join(en_parts)}</p>'
        f"</blockquote>"
        f'<figcaption><a href="{url}" target="_blank" rel="noopener">Qur’an {label}</a>'
        f'<span class="verse__surah">Sūrat {esc(surah["english"])} · {esc(surah["meaning"])}</span>'
        f'<button class="verse__copy" type="button" data-copy aria-label="Copy verse {label}">Copy</button>'
        f"</figcaption></figure>"
    )


def render_hadith(key: str, page: str) -> str:
    h = HADITH.get(key.strip())
    if not h:
        errors.append(f"{page}: unknown hadith '{key}'")
        return ""
    grade = f'<span class="hadith__grade">{esc(h["grade"])}</span>' if h.get("grade") else ""
    note = f'<p class="hadith__note">{h["note"]}</p>' if h.get("note") else ""
    return (
        f'<figure class="hadith">'
        f'<blockquote cite="{h["url"]}"><p>{h["text"]}</p></blockquote>'
        f"{note}"
        f'<figcaption><span class="hadith__by">Narrated by {esc(h["narrator"])}</span>'
        f'<a href="{h["url"]}" target="_blank" rel="noopener">{esc(h["source"])}</a>{grade}</figcaption>'
        f"</figure>"
    )


def render_status(kind: str, page: str) -> str:
    kind = kind.strip()
    if kind not in STATUSES:
        errors.append(f"{page}: unknown status '{kind}'")
        return ""
    label, tip = STATUSES[kind]
    return f'<span class="status status--{kind}" title="{esc(tip)}"><i aria-hidden="true"></i>{label}</span>'


def apply_shortcodes(body: str, slug: str, root: str) -> str:
    def sub(m: re.Match) -> str:
        name, arg = m.group(1), (m.group(2) or "").strip()
        if name == "verse":
            return render_verse(arg, slug)
        if name == "hadith":
            return render_hadith(arg, slug)
        if name == "status":
            return render_status(arg, slug)
        if name == "root":
            return root
        if name == "link":
            s_, a_ = (int(x) for x in arg.split(":"))
            return verse_url(s_, a_)
        if name in ("ar", "en"):
            ref = arg.split()[0]
            if ref not in QURAN["verses"]:
                errors.append(f"{slug}: unknown verse {ref}")
                return ""
            text = QURAN["verses"][ref] if name == "ar" else TRANSLATION["verses"].get(ref)
            if text is None:
                errors.append(f"{slug}: no English translation for {ref}")
                return ""
            words = arg.split()[1:]
            if name == "ar" and words:          # {{ar 41:53 5}} → first five words only
                text = " ".join(text.split()[: int(words[0])])
            return esc(text)
        errors.append(f"{slug}: unknown shortcode '{name}'")
        return m.group(0)

    return re.sub(r"\{\{\s*(verse|hadith|status|root|ar|en|link)\b\s*([^}]*)\}\}", sub, body)


# ---------------------------------------------------------------- headings / toc / search
def add_heading_ids(body: str) -> tuple[str, list[tuple[str, str]]]:
    # ids already used by non-heading elements must not be reused by headings
    toc = []
    seen = set(re.findall(r'<(?!h2)\w+[^>]*\bid="([^"]+)"', body))

    def sub(m: re.Match) -> str:
        attrs, inner = m.group(1), m.group(2)
        idm = re.search(r'\bid="([^"]+)"', attrs)
        hid = idm.group(1) if idm else slugify(inner)
        base, n = hid, 2
        while hid in seen:
            hid, n = f"{base}-{n}", n + 1
        seen.add(hid)
        if not idm:
            attrs = f' id="{hid}"' + attrs
        text = re.sub(r"<[^>]+>", "", inner).strip()
        if 'data-toc="false"' not in attrs:
            toc.append((hid, text))
        return f'<h2{attrs}><a class="anchor" href="#{hid}" aria-hidden="true" tabindex="-1">#</a>{inner}</h2>'

    return re.sub(r"<h2([^>]*)>(.*?)</h2>", sub, body, flags=re.S), toc


def plain_text(fragment: str) -> str:
    fragment = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", fragment, flags=re.S)
    fragment = re.sub(r'<p class="verse__ar".*?</p>', " ", fragment, flags=re.S)
    fragment = re.sub(r"<[^>]+>", " ", fragment)
    return re.sub(r"\s+", " ", html.unescape(fragment)).strip()


def search_sections(body: str, toc: list[tuple[str, str]]) -> list[dict]:
    parts = re.split(r'(<h2 id="[^"]+")', body)
    out, current = [], {"id": "", "heading": "", "text": plain_text(parts[0])}
    for i in range(1, len(parts), 2):
        out.append(current)
        hid = re.search(r'id="([^"]+)"', parts[i]).group(1)
        chunk = parts[i + 1] if i + 1 < len(parts) else ""
        heading = next((t for h, t in toc if h == hid), "")
        current = {"id": hid, "heading": heading, "text": plain_text(chunk)[:1600]}
    out.append(current)
    return [s for s in out if s["text"] or s["heading"]]


# ---------------------------------------------------------------- nav
def flat_nav() -> list[dict]:
    return [item for group in NAV for item in group["items"]]


def render_sidebar(active: str, root: str) -> str:
    out = ['<nav class="sidenav" aria-label="Topics">']
    for group in NAV:
        out.append(f'<div class="sidenav__group"><p class="sidenav__title">{esc(group["group"])}</p><ul>')
        for item in group["items"]:
            cur = ' aria-current="page"' if item["slug"] == active else ""
            out.append(
                f'<li><a href="{root}{page_url(item["slug"])}"{cur}>'
                f'<svg class="icon" aria-hidden="true"><use href="{root}assets/img/icons.svg#{item["icon"]}"/></svg>'
                f'<span>{esc(item["title"])}</span></a></li>'
            )
        out.append("</ul></div>")
    out.append("</nav>")
    return "".join(out)


def render_pager(slug: str, root: str) -> str:
    items = flat_nav()
    idx = next((i for i, it in enumerate(items) if it["slug"] == slug), None)
    if idx is None:
        return ""
    cells = []
    if idx > 0:
        p = items[idx - 1]
        cells.append(f'<a class="pager__link pager__prev" href="{root}{page_url(p["slug"])}"><small>Previous</small><span>{esc(p["title"])}</span></a>')
    else:
        cells.append("<span></span>")
    if idx < len(items) - 1:
        n = items[idx + 1]
        cells.append(f'<a class="pager__link pager__next" href="{root}{page_url(n["slug"])}"><small>Next</small><span>{esc(n["title"])}</span></a>')
    return f'<nav class="pager" aria-label="Previous and next page">{"".join(cells)}</nav>'


def inline_logo(cls: str) -> str:
    """The logo inlined so it inherits the text colour in both themes; ids made unique per use."""
    svg = LOGO.replace('role="img" aria-label="Islam &amp; Science"', f'class="{cls}" aria-hidden="true" focusable="false"')
    return svg.replace("crescent-cut", f"crescent-cut-{cls}").replace("orbit-gap", f"orbit-gap-{cls}").strip()


def render_toc(toc: list[tuple[str, str]]) -> str:
    if len(toc) < 2:
        return ""
    links = "".join(f'<li><a href="#{h}">{esc(t)}</a></li>' for h, t in toc)
    return f'<nav class="toc" aria-label="On this page"><p class="toc__title">On this page</p><ol>{links}</ol></nav>'


# ---------------------------------------------------------------- build
def build_page(path: Path, index: list[dict]) -> None:
    meta, body = parse_page(path)
    slug = meta["slug"]
    # 404.html is served from arbitrary URLs, so it needs absolute links.
    root = SITE["base"] if slug == "404" else ("" if slug == "home" else "../")
    body = apply_shortcodes(body, slug, root)
    body, toc = add_heading_ids(body)
    words = len(plain_text(body).split())
    minutes = max(1, round(words / 220))

    scripts = "".join(
        f'<script type="module" src="{root}assets/js/{s.strip()}?v={VERSION}"></script>'
        for s in meta.get("scripts", "").split(",") if s.strip()
    )
    title = meta["title"]
    full_title = SITE["name"] if slug == "home" else f'{title} · {SITE["name"]}'
    canonical = SITE["url"].rstrip("/") + "/" + page_url(slug)
    nav_item = next((it for it in flat_nav() if it["slug"] == slug), None)
    eyebrow = meta.get("eyebrow") or next((g["group"] for g in NAV for it in g["items"] if it["slug"] == slug), "")

    replacements = {
        "{{title}}": esc(full_title),
        "{{page_title}}": esc(title),
        "{{description}}": esc(meta.get("description", SITE["description"])),
        "{{canonical}}": esc(canonical),
        "{{root}}": root,
        "{{sidebar}}": render_sidebar(slug, root),
        "{{toc}}": render_toc(toc) if meta.get("toc", "true") != "false" else "",
        "{{pager}}": render_pager(slug, root) if nav_item else "",
        "{{content}}": body,
        "{{eyebrow}}": esc(eyebrow),
        "{{reading_time}}": f"{minutes} min read",
        "{{layout}}": meta.get("layout", "doc"),
        "{{scripts}}": scripts,
        "{{site_name}}": esc(SITE["name"]),
        "{{tagline}}": esc(SITE["tagline"]),
        "{{email}}": esc(SITE["email"]),
        "{{year}}": str(date.today().year),
        "{{updated}}": date.today().strftime("%B %Y"),
        "{{translation_credit}}": esc(TRANSLATION["meta"]["credit"]),
        "{{og_image}}": SITE["url"].rstrip("/") + "/assets/img/og-image.png",
    }
    out = apply_shortcodes(LAYOUT, slug, root)
    out = re.sub(r'((?:href|src)="[^"]*assets/(?:css|js)/[^"?]+\.(?:css|js))"', rf'\1?v={VERSION}"', out)
    out = re.sub(r"\{\{logo:([\w-]+)\}\}", lambda m: inline_logo(m.group(1)), out)
    for k, v in replacements.items():
        out = out.replace(k, v)
    if "{{" in re.sub(r"<script.*?</script>", "", out, flags=re.S):
        leftover = re.findall(r"\{\{[^}]*\}\}", out)
        if leftover:
            errors.append(f"{slug}: unresolved placeholders {leftover[:3]}")

    dest = DIST / page_url(slug) / "index.html" if slug != "404" else DIST / "404.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding="utf8")

    if slug != "404":
        index.append({"title": title, "url": page_url(slug), "description": meta.get("description", ""),
                      "sections": search_sections(body, toc)})


def asset_version() -> str:
    """Short hash of all CSS/JS so browsers fetch fresh files after every change."""
    import hashlib
    h = hashlib.sha1()
    for f in sorted(ASSETS.rglob("*")):
        if f.suffix in (".css", ".js", ".svg"):
            h.update(f.read_bytes())
    return h.hexdigest()[:10]


VERSION = asset_version()


def version_assets() -> None:
    """Append ?v=VERSION to module imports inside the copied JS files."""
    for f in (DIST / "assets" / "js").rglob("*.js"):
        text = f.read_text(encoding="utf8")
        text = re.sub(r'(from\s+"\.{1,2}/[^"?]+\.js)"', rf'\1?v={VERSION}"', text)
        f.write_text(text, encoding="utf8")


def build() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    shutil.copytree(ASSETS, DIST / "assets")
    version_assets()

    index: list[dict] = []
    pages = sorted((SRC / "pages").glob("*.html"))
    for p in pages:
        build_page(p, index)

    nav_slugs = {it["slug"] for it in flat_nav()}
    built = {parse_page(p)[0]["slug"] for p in pages}
    for missing in sorted(nav_slugs - built):
        errors.append(f"nav links to '{missing}' but src/pages has no such page")

    (DIST / "assets" / "search-index.json").write_text(
        json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf8")

    base = SITE["url"].rstrip("/")
    urls = "".join(f"<url><loc>{base}/{page_url(s)}</loc></url>" for s in sorted(built - {"404"}))
    (DIST / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>',
        encoding="utf8")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {base}/sitemap.xml\n", encoding="utf8")
    (DIST / ".nojekyll").write_text("", encoding="utf8")

    if errors:
        print("\n".join(f"  ✗ {e}" for e in errors), file=sys.stderr)
        raise SystemExit(f"Build failed with {len(errors)} error(s).")
    print(f"Built {len(pages)} pages into {DIST.relative_to(ROOT)}/")


def serve(port: int = 8000) -> None:
    import functools
    import http.server

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(DIST))
    with http.server.ThreadingHTTPServer(("", port), handler) as httpd:
        print(f"Serving on http://localhost:{port}  (Ctrl+C to stop)")
        httpd.serve_forever()


if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        serve()
