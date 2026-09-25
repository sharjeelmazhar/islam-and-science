import { usePrefs, type Prefs } from "@/state/prefs";

type Choice<K extends keyof Prefs> = { key: K; label: string; options: readonly { value: Prefs[K]; label: string }[] };

const ROWS = [
  { key: "size", label: "Text size", options: [{ value: "s", label: "S" }, { value: "m", label: "M" }, { value: "l", label: "L" }, { value: "xl", label: "XL" }] },
  { key: "font", label: "Reading font", options: [{ value: "sans", label: "Sans" }, { value: "serif", label: "Serif" }, { value: "legible", label: "Legible" }] },
  { key: "arabic", label: "Arabic size", options: [{ value: "m", label: "Normal" }, { value: "l", label: "Large" }] },
] as const satisfies readonly [Choice<"size">, Choice<"font">, Choice<"arabic">];

/** Reading settings in a native popover (no JS positioning, Esc and light-dismiss for free). */
export function Settings() {
  const prefs = usePrefs();
  return (
    <>
      <button
        type="button"
        popoverTarget="reading-settings"
        aria-label="Reading settings"
        className="grid size-9 place-items-center rounded-full border border-rule-2 font-serif text-sm text-ink hover:border-gold"
      >
        Aa
      </button>
      <div
        id="reading-settings"
        popover="auto"
        className="fixed inset-auto top-16 right-4 m-0 w-72 border border-rule-2 bg-paper-2 p-5 text-ink shadow-2xl"
      >
        {ROWS.map((row) => (
          <fieldset key={row.key} className="mb-4 last:mb-0">
            <legend className="eyebrow mb-2">{row.label}</legend>
            <div className="grid auto-cols-fr grid-flow-col border border-rule-2">
              {row.options.map((o) => {
                const on = prefs[row.key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => prefs.set({ [row.key]: o.value })}
                    className={`py-2 text-sm ${on ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"}`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </>
  );
}
