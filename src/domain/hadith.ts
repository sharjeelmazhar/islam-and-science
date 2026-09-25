import data from "@/data/hadith.json";

/** Every hadith the site quotes, e.g. "bukhari:5678". */
export type HadithKey = keyof typeof data;
export type Hadith = { source: string; url: string; narrator: string; text: string; grade?: string; note?: string };

export const hadith = (key: HadithKey): Hadith => data[key];
