import { flushSync } from "react-dom";
import type { Theme } from "@/state/prefs";

/**
 * Flip the theme with a horizon sweep: dawn rises from the bottom, dusk falls from the top.
 * One view-transition snapshot plus one mask animation (styles/app.css). The sky watches
 * <html data-theme> and repaints as soon as it changes, so the new state never shows the old sky.
 */
export function sweepTheme(next: Theme, flip: (t: Theme) => void): void {
  const root = document.documentElement;
  const run = () => {
    flip(next);
    root.dataset.theme = next;
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("startViewTransition" in document)) {
    run();
    return;
  }
  root.dataset.sweep = next === "light" ? "dawn" : "dusk";
  const vt = document.startViewTransition(() => flushSync(run));
  void vt.finished.finally(() => {
    delete root.dataset.sweep;
  });
}
