import { usePrefs } from "@/state/prefs";
import { sweepTheme } from "@/lib/theme";

/** Dawn / dusk: a sun on the horizon. The sweep itself lives in lib/theme.ts. */
export function ThemeToggle() {
  const theme = usePrefs((s) => s.theme);
  const set = usePrefs((s) => s.set);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => sweepTheme(next, (t) => set({ theme: t }))}
      aria-label={next === "light" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 items-center gap-2 rounded-full border border-rule-2 px-3 font-mono text-[0.7rem] tracking-[0.08em] text-ink uppercase hover:border-gold"
    >
      <svg viewBox="0 0 22 14" className="h-3.5 w-5" aria-hidden="true">
        <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.2" />
        <path d={theme === "dark" ? "M6 11a5 5 0 0 1 10 0" : "M6 11a5 5 0 0 0 10 0"} fill={theme === "dark" ? "none" : "var(--gold)"} stroke="var(--gold)" strokeWidth="1.4" />
      </svg>
      <span className="hidden sm:inline">{next === "light" ? "Dawn" : "Dusk"}</span>
    </button>
  );
}
