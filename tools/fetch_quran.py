#!/usr/bin/env python3
"""Download the Qur'an text used by the site (one-time; output is committed).

Source: api.alquran.cloud, which serves the Tanzil project's Uthmani text (quran-uthmani).

Writes src/data/quran.json as:
  {"meta": {...}, "surahs": [{n, name, english, meaning, ayahs, type}], "verses": {"s:a": arabic}}

The English meanings shown on the site live separately in src/data/translation.json.
"""
import json, pathlib, urllib.request

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "quran.json"


def get(edition):
    with urllib.request.urlopen(f"https://api.alquran.cloud/v1/quran/{edition}", timeout=120) as r:
        return json.load(r)["data"]["surahs"]


def main():
    ar = get("quran-uthmani")
    surahs, verses = [], {}
    basmala = ar[0]["ayahs"][0]["text"].strip().lstrip("\ufeff")  # 1:1, exactly as the API encodes it
    for sa in ar:
        n = sa["number"]
        surahs.append({"n": n, "name": sa["name"], "english": sa["englishName"],
                       "meaning": sa["englishNameTranslation"], "ayahs": len(sa["ayahs"]),
                       "type": sa["revelationType"]})
        for va in sa["ayahs"]:
            a = va["numberInSurah"]
            text = va["text"].strip().lstrip("﻿")
            # The API prefixes the basmala to verse 1 of every surah except 1 and 9.
            if a == 1 and n != 1 and text.startswith(basmala):
                text = text[len(basmala):].strip()
            verses[f"{n}:{a}"] = text
    OUT.write_text(json.dumps({
        "meta": {"arabic": "Tanzil Uthmani text (tanzil.net), Ḥafṣ ʿan ʿĀṣim, Kufan verse numbering",
                 "source": "api.alquran.cloud"},
        "surahs": surahs, "verses": verses}, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    print(f"wrote {OUT} — {len(surahs)} surahs, {len(verses)} verses")


if __name__ == "__main__":
    main()
