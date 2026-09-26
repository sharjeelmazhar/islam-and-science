#!/usr/bin/env python3
"""Rebuild the Arabic text in src/data/quran.json in the IndoPak script.

Source text: DigitalKhatt IndoPak Qur'an text (15-line layout), MIT licence,
https://github.com/DigitalKhatt/digitalkhatt-js (apps/site-angular/src/app/services/quran_text_indopak_15.ts).
It is the text the bundled OFL font (assets/fonts/indopak.woff2, DigitalKhatt IndoPak) is built to render.

Verse keys stay in the Kufan numbering used across the site (6,236 verses). The IndoPak text leaves
the basmala of al-Fatihah unnumbered, so Kufan 1:1 is the basmala, 1:2–1:6 are IndoPak 1:1–1:5, and
Kufan 1:7 is IndoPak 1:6 + 1:7.

The script refuses to write anything unless every surah has exactly the expected number of verses.
"""
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "quran.json"
URL = ("https://raw.githubusercontent.com/DigitalKhatt/digitalkhatt-js/main/"
       "apps/site-angular/src/app/services/quran_text_indopak_15.ts")

DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")
PAUSE = "ۖۗۘۙۚۛۜؕࣖ"                        # pause marks written after the ayah number
END = re.compile(r"(?:۝|‮)([٠-٩]+)࣢?([" + PAUSE + r"]*)")
LETTERS = {"ی": "ي", "ى": "ي", "آ": "ا", "أ": "ا", "إ": "ا",
           "ٱ": "ا", "ؤ": "و", "ئ": "ي", "ہ": "ه"}


def skeleton(text: str) -> str:
    """Bare letters only, for comparing texts regardless of vowels, marks and spelling style."""
    return "".join(LETTERS.get(c, c) for c in text if "ء" <= LETTERS.get(c, c) <= "ي" and c != "ـ")


BASMALA = "بسماللهالرحمنالرحيم"


def parse(source: str) -> tuple[dict, str]:
    """Return (verses in IndoPak numbering, the basmala as written in this text)."""
    lines = re.findall(r"'((?:[^'\\]|\\.)*)'", source)
    surah, pending, verses, basmala = 0, [], {}, ""
    for line in lines:
        if line.startswith("سُورَةُ") or line.startswith("سورة"):
            surah, pending = surah + 1, []
            continue
        pos = 0
        for m in END.finditer(line):
            pending.append(line[pos:m.start()])
            text = " ".join(p.strip() for p in pending if p.strip()) + m.group(2)
            verses[f"{surah}:{int(m.group(1).translate(DIGITS))}"] = text.strip()
            pending, pos = [], m.end()
        rest = line[pos:]
        # an unnumbered basmala line ends in a bare ۝; drop it
        if rest.strip().endswith("۝") and skeleton(rest) == BASMALA:
            basmala = basmala or rest.strip()[:-1].strip()
            continue
        pending.append(rest)
    return verses, basmala


def strip_basmala(text: str) -> str:
    if "۝" in text:
        head, rest = text.split("۝", 1)
        if skeleton(head) == BASMALA:
            return rest.strip()
    return text.strip()


def main() -> None:
    with urllib.request.urlopen(URL, timeout=120) as r:
        ip, basmala = parse(r.read().decode("utf8"))
    data = json.loads(OUT.read_text(encoding="utf8"))
    counts = {s["n"]: s["ayahs"] for s in data["surahs"]}
    for n, total in counts.items():
        found = max((int(k.split(":")[1]) for k in ip if int(k.split(":")[0]) == n), default=0)
        if found != total:
            raise SystemExit(f"surah {n}: expected {total} verses, parsed {found}; nothing written")

    if skeleton(basmala) != BASMALA:
        raise SystemExit("basmala not found in source text; nothing written")
    verses = {}
    for n, total in counts.items():
        for a in range(1, total + 1):
            if n != 1:
                verses[f"{n}:{a}"] = strip_basmala(ip[f"{n}:{a}"])
            elif a == 1:
                verses["1:1"] = basmala
            elif a <= 6:
                verses[f"1:{a}"] = strip_basmala(ip[f"1:{a - 1}"])
            else:
                verses["1:7"] = ip["1:6"] + " " + ip["1:7"]
    data["verses"] = verses
    data["meta"] = {
        "arabic": "IndoPak script: DigitalKhatt IndoPak Qur'an text (MIT), Hafs 'an 'Asim; keys in Kufan numbering",
        "source": URL,
    }
    OUT.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    print(f"wrote {OUT} — {len(verses)} verses in IndoPak script")


if __name__ == "__main__":
    main()
