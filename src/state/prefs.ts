import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Prefs = {
  theme: Theme;
  size: "s" | "m" | "l" | "xl";
  font: "sans" | "serif" | "legible";
  arabic: "m" | "l";
};

export const PREFS_KEY = "ias-prefs";

/** Reading preferences, persisted to localStorage and mirrored onto <html data-*> (see applyPrefs). */
export const usePrefs = create<Prefs & { set: (patch: Partial<Prefs>) => void }>()(
  persist(
    (set) => ({ theme: "dark", size: "m", font: "sans", arabic: "m", set: (patch) => set(patch) }),
    { name: PREFS_KEY, partialize: ({ theme, size, font, arabic }) => ({ theme, size, font, arabic }) },
  ),
);

export function applyPrefs({ theme, size, font, arabic }: Prefs) {
  const d = document.documentElement.dataset;
  d.theme = theme;
  d.size = size;
  d.font = font;
  d.arabic = arabic;
}

/**
 * Runs in <head> before first paint (inlined as a string), so the stored theme never flashes.
 * Dark is the default. Also marks <html class="js"> so JS-only reveal styles apply.
 */
export const PREFS_BOOT = `(function(){var d=document.documentElement;d.classList.add("js");try{var p=(JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}").state)||{};d.dataset.theme=p.theme==="light"?"light":"dark";if(p.size)d.dataset.size=p.size;if(p.font)d.dataset.font=p.font;if(p.arabic)d.dataset.arabic=p.arabic}catch(e){}})()`;
