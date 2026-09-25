# Islam & Science

A careful, referenced guide to the Qur’an, the Hadith and modern science (cosmology, physics, mathematics, earth science and biology), written for curious minds of every background.

The site is one journey through scale, after Qur’an 41:53: *“We shall now show them Our signs in the entire universe and within their own selves.”* It starts at the observable universe (10²⁶ m) and zooms through the galaxy, the Solar System, the Earth and a mountain, down to the reader (10⁰ m), a honeycomb, an embryo and an atom. Each chapter lives at its own scale, and every claim is graded for how well the text and the science actually match.

## Run locally

Requires Node 22+ and pnpm (the version is pinned in `package.json`).

```bash
pnpm install
pnpm dev          # http://localhost:5173/islam-and-science/
pnpm check        # types, lint, lab tests, then a full static build into dist/client
```

## Stack

Vite, React 19, TanStack Start (every route is prerendered to static HTML), strict TypeScript, Tailwind CSS 4, Motion, and three.js through React Three Fiber. There is no backend.

## Project structure

```
src/
  data/              Source of truth, unchanged from the original site
    quran.json         Full Qur’an in Arabic (Tanzil Uthmani); build-time only, never shipped
    translation.json   English meanings of the verses quoted on the site (Kanz-ul-Iman)
    hadith.json        Every hadith quoted on the site, with source, link and grading
    site.json          Name, URL, base path, contact email
  generated/         Written by `pnpm gen` (gitignored): only the quoted verses
  domain/            Typed access to the data: VerseRef, HadithKey, Status
  content/
    define.ts          The Page / Topic / Step types every page is written in
    pages/*.tsx        One file per page; each ends with `satisfies Page`
    registry.ts        All pages in journey order
    journey.ts         The home page's stops
  routes/            TanStack file routes: home, /$slug/, /claims/, 404
  components/        Scripture (Verse, Hadith), evidence (ThreeLinks, ClaimStar), topic layout, chrome, visualisations
  scene/             The persistent 3D sky: one point cloud per stop of the journey
  labs/              Calculators: pure maths in *.ts (tested), UI in ui/
  styles/app.css     Design tokens (dark and light), type, the dawn/dusk theme transition
scripts/gen-data.ts  Validates the JSON and writes src/generated/verses.json
tools/fetch_quran.py Regenerates src/data/quran.json from api.alquran.cloud (one-off)
```

## Writing content

A page is data plus prose. The prose is JSX; the structure is typed:

```tsx
{
  kind: "topic",
  id: "smoke",
  status: "interpretive",            // established | interpretive | debated | unseen | caution
  title: "“The heaven… and it was smoke”",
  scripture: [{ verse: "41:11" }],   // or { verse: "23:12", to: "23:14" } or { hadith: "bukhari:5678" }
  steps: [
    { heading: "What the words say", gist: <p>…</p>, more: <p>…</p> },
    { heading: "What science says", gist: <p>…</p> },
    { heading: "How close is the match?", gist: <p>…</p> },
  ],
}
```

`gist` is always shown and `more` sits behind “Read more”, so pages stay light without losing any text.

**Verse and hadith references are checked by the compiler.** `VerseRef` is the set of verses in `translation.json`, so `{ verse: "21:31" }` does not compile until that verse’s English is added. To quote a new verse, add its English to `src/data/translation.json` exactly as printed, then run `pnpm gen`.

## Deploying

`.github/workflows/deploy.yml` runs `pnpm check` on every pull request. On every push to `main` it also publishes `dist/client` to GitHub Pages (**Settings → Pages → Source: GitHub Actions**). If the repository name or owner changes, update `url` and `base` in `src/data/site.json`.

## Sources

Qur’an text: [Tanzil Project](https://tanzil.net) (Uthmani). English: *Kanz-ul-Iman*, English rendering by Mufti Abdun Nabi Hamidi (Maktaba-tul-Madinah); only the verses discussed are quoted. Hadith numbering: [sunnah.com](https://sunnah.com). Full bibliography on the *Sources & References* page.

## Contact

Corrections are welcome: sharjeelmazhar@gmail.com
