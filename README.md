# Islam & Science

A careful, referenced guide to the Qur’an, the Hadith and modern science (cosmology, physics, mathematics, earth science and biology), written for curious minds of every background.

Static website with no backend and no dependencies beyond Python’s standard library.

## Run locally

```bash
python3 build.py --serve      # builds into dist/ and serves http://localhost:8000
```

Search, the 3D models and the calculators need the site to be served over http (not opened as a file).

## Project structure

```
build.py                 Static site builder (stdlib only)
src/
  layouts/base.html      Shared page shell: top bar, sidebar, footer, search, settings
  pages/*.html           One file per page (front matter + content)
  data/
    site.json            Site name, URL, contact email
    nav.json             Sidebar navigation and page order
    quran.json           Full Qur’an in Arabic (Tanzil Uthmani), used for every verse card
    translation.json     English meanings of the verses quoted on the site (Kanz-ul-Iman, English rendering)
    hadith.json          Every hadith quoted on the site, with source, link and grading
assets/
  css/                   tokens → base → layout → components → content → viz
  js/app.js              Theme, reading settings, navigation, TOC, copy, search
  js/viz/                Canvas visualisations (galaxy, orbits, expansion) + shared engine
  js/tools/labs.js       Calculators (abjad, solar/lunar, ʿawl, primes, isostasy, relativity, light)
  img/                   Logo, favicons, social image, icon sprite
tools/fetch_quran.py     Regenerates src/data/quran.json from api.alquran.cloud
.github/workflows/       Builds and deploys to GitHub Pages on every push to main
```

## Writing content

Pages use shortcodes so scripture is never typed by hand:

| Shortcode | Output |
|---|---|
| `{{verse 51:47}}`, `{{verse 23:12-14}}` | Verse card: Arabic, translation, link to quran.com |
| `{{ar 3:190}}`, `{{en 3:190}}` | Just the Arabic or English text of a verse |
| `{{hadith bukhari:5678}}` | Hadith card from `src/data/hadith.json` |
| `{{status interpretive}}` | Evidence badge: `established`, `interpretive`, `debated`, `unseen`, `caution` |
| `{{root}}` | Relative path to the site root |

The build **fails** if a verse reference does not exist, its English is missing from `translation.json`, or a hadith key is missing.

To quote a new verse, add its English to `src/data/translation.json` exactly as printed, checked against the original page.

## Deploying

1. Push to a GitHub repository (branch `main`).
2. In the repository: **Settings → Pages → Source: GitHub Actions**.
3. If the repository name or user changes, update `url` and `base` in `src/data/site.json`.

## Sources

Qur’an text: [Tanzil Project](https://tanzil.net) (Uthmani). English: *Kanz-ul-Iman*, English rendering by Mufti Abdun Nabi Hamidi (Maktaba-tul-Madinah); only the verses discussed are quoted. Hadith numbering: [sunnah.com](https://sunnah.com). Full bibliography on the *Sources & References* page.

## Contact

Corrections are welcome: sharjeelmazhar@gmail.com
