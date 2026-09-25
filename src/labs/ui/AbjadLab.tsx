import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fmt } from "../format";
import { abjad } from "../numbers";
import { Factors, Field, Panel, Preset, Presets, Readout } from "./parts";

const PRESETS = [
  { text: "الحديد", arabic: true },
  { text: "حديد", arabic: true },
  { text: "الله", arabic: true },
  { text: "محمد", arabic: true },
  { text: "بسم الله الرحمن الرحيم", label: "Basmala", arabic: false },
] as const;

/** Abjad letter-value calculator with presets. Each counted letter appears as a chip with its value. */
export function AbjadLab() {
  const [text, setText] = useState("الحديد");
  const { letters, total, factors, prime, remainder19 } = abjad(text);
  return (
    <Panel>
      <Presets label="Examples">
        {PRESETS.map((p) => (
          <Preset key={p.text} on={text === p.text} onClick={() => setText(p.text)}>
            {p.arabic ? (
              <span lang="ar" className="text-[1.05rem] leading-tight">
                {p.text}
              </span>
            ) : (
              p.label
            )}
          </Preset>
        ))}
      </Presets>

      <Field label="Arabic text">
        <input
          type="text"
          dir="rtl"
          lang="ar"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Arabic text"
          className="w-full border-0 border-b border-rule-2 bg-transparent py-1 font-arabic text-3xl leading-relaxed text-ink hover:border-ink-3"
        />
      </Field>

      {letters.length > 0 ? (
        <ol dir="rtl" aria-label="Letter values" className="flex flex-wrap gap-x-1.5 gap-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {letters.map((l, i) => (
              <motion.li
                key={`${i}${l.ch}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex min-w-10 flex-col items-center border-b border-rule-2 pb-1"
              >
                <b lang="ar" className="font-arabic text-2xl leading-snug font-normal text-ink">
                  {l.ch}
                </b>
                <small dir="ltr" className="font-mono text-[0.7rem] text-ink-3 tabular-nums">
                  {l.v}
                </small>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      ) : null}

      {letters.length > 0 ? (
        <Readout big={fmt(total, 0)}>
          {letters.length} letters · {total > 1 ? <>factors: <Factors powers={factors} /></> : null}
          {prime ? (
            <>
              {" · "}
              <strong>prime</strong>
            </>
          ) : null}
          {" · "}
          {remainder19 === 0 ? (
            <>
              <strong>divisible by 19</strong> (19 × {total / 19})
            </>
          ) : (
            `not divisible by 19 (remainder ${remainder19})`
          )}
        </Readout>
      ) : (
        <Readout>Type or paste Arabic text above.</Readout>
      )}
    </Panel>
  );
}
