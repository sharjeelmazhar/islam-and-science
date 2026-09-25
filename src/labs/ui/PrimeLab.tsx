import { useState } from "react";
import { fmt } from "../format";
import { checkNumber, type NumberCheck } from "../numbers";
import { Factors, Field, numberInput, Panel, Readout } from "./parts";

const VERDICT = {
  prime: "is prime",
  composite: "is composite",
  unit: "is neither prime nor composite",
} as const satisfies Record<Extract<NumberCheck, { ok: true }>["kind"], string>;

/** Prime checker with factors and multiple-of-19 check. */
export function PrimeLab() {
  const [value, setValue] = useState("6236");
  const r = checkNumber(value);
  return (
    <Panel>
      <Field label="Number">
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Number to check"
          className={numberInput}
        />
      </Field>
      {r.ok ? (
        <Readout
          big={
            <>
              {fmt(r.n, 0)} <span className={r.kind === "prime" ? "text-gold" : undefined}>{VERDICT[r.kind]}</span>
            </>
          }
        >
          {r.n > 1 ? (
            <>
              Prime factorisation: <Factors powers={r.factors} />
            </>
          ) : null}
          {r.nineteen === null ? null : ` · divisible by 19 (19 × ${fmt(r.nineteen, 0)})`}
        </Readout>
      ) : (
        <Readout>
          Enter a whole number from 1 to 10<sup>12</sup>.
        </Readout>
      )}
    </Panel>
  );
}
