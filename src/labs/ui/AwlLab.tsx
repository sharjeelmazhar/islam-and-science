import { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { awl, MINBARIYYA } from "../inheritance";
import { Panel } from "./parts";

const { base, sum, excess, rows } = awl(MINBARIYYA);
/** Share of the bar track the whole estate occupies: the track is `sum` units wide, the estate `base`. */
const ESTATE = (base / sum) * 100;

const COLOR = {
  Wife: "var(--gold)",
  "Two daughters": "var(--ink)",
  Father: "var(--ink-2)",
  Mother: "var(--ink-3)",
} as const satisfies Record<(typeof MINBARIYYA)[number]["name"], string>;

const segment = "grid h-full place-items-center overflow-hidden border-e border-paper font-mono text-[0.72rem] font-medium whitespace-nowrap";
const rowLabel = "mb-1.5 font-mono text-[0.68rem] tracking-[0.08em] text-ink-3 uppercase";

const noopSubscribe = () => () => undefined;

/**
 * al-Minbariyya: inheritance shares before/after proportional reduction (ʿawl).
 * The top row is the Qur'anic shares over 24, overrunning the estate by 3. The bottom row starts the same and shrinks
 * to fit (shares over 27) when it scrolls into view. Server HTML shows the reduced state, so it is correct without JS.
 */
export function AwlLab() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  const reduced = !hydrated || inView;

  return (
    <Panel>
      <p className="font-mono text-[0.8rem] text-ink-2">
        {rows.map((r) => r.part).join(" + ")} = {sum} parts of {base}, which is {excess} more than the whole estate
      </p>

      <div ref={ref} className="relative space-y-4">
        <div aria-hidden className="flex font-mono text-[0.68rem] tracking-[0.08em] uppercase">
          <span style={{ width: `${ESTATE}%` }} className="pe-2 text-end text-gold">
            Whole estate
          </span>
          <span className="ps-2 text-caution">+{excess}</span>
        </div>

        <div>
          <p className={rowLabel}>Shares over {base}</p>
          <div
            role="img"
            aria-label={`Shares before reduction: ${rows.map((r) => `${r.name} ${r.share.join("/")}`).join(", ")}; together ${sum}/${base}`}
            className="flex h-11"
          >
            {rows.map((r) => (
              <span
                key={r.name}
                title={`${r.name}: ${r.share.join("/")} = ${r.part}/${base}`}
                className={segment}
                style={{ width: `${(r.part / sum) * 100}%`, background: COLOR[r.name], color: "var(--paper)" }}
              >
                {r.share.join("/")}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className={rowLabel}>
            After <span className="tr normal-case">ʿawl</span>, over {sum}
          </p>
          <div
            role="img"
            aria-label={`Shares after reduction: ${rows.map((r) => `${r.name} ${r.part}/${sum}`).join(", ")}`}
            className="flex h-11"
          >
            {rows.map((r) => (
              <motion.span
                key={r.name}
                title={`${r.name}: ${r.part}/${sum}`}
                className={segment}
                style={{ background: COLOR[r.name], color: "var(--paper)" }}
                initial={false}
                animate={{ width: `${(r.part / sum) * (reduced ? ESTATE : 100)}%` }}
                transition={reduced && reduceMotion !== true ? { duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] } : { duration: 0 }}
              >
                {r.part}/{sum}
              </motion.span>
            ))}
          </div>
        </div>

        <span aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-gold" style={{ left: `${ESTATE}%` }} />
      </div>

      <ul className="grid gap-x-8 gap-y-1.5 text-[0.88rem] text-ink-2 sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-2 tabular-nums">
            <i aria-hidden className="inline-block size-2.5 shrink-0 outline outline-rule-2" style={{ background: COLOR[r.name] }} />
            {r.name}: {r.share.join("/")} → {r.part}/{base} → <strong className="font-medium text-ink">{r.part}/{sum}</strong>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
