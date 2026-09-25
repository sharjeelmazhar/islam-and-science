import { useState } from "react";
import { LUNAR, SOLAR, solarToLunar } from "../calendar";
import { fmt } from "../format";
import { Field, numberInput, Panel, Readout } from "./parts";

/** Solar ↔ lunar years (mathematics: 300 solar years = 309 lunar). */
export function YearsLab() {
  const [value, setValue] = useState("300");
  const r = solarToLunar(Number(value));
  return (
    <Panel>
      <div className="grid gap-6 md:grid-cols-[11rem_minmax(0,1fr)] md:items-end md:gap-10">
        <Field label="Solar years">
          <input
            type="number"
            min={0}
            max={100000}
            step={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Number of solar years"
            className={numberInput}
          />
        </Field>
        <Readout
          big={
            <>
              {fmt(r.solar)} solar = <span className="text-gold">{fmt(r.lunar)}</span> lunar years
            </>
          }
        >
          Difference: {fmt(r.gain)} years ({fmt(r.days, 0)} days). A lunar year of 12 months is {fmt(SOLAR - LUNAR)} days shorter
          than a solar year.
        </Readout>
      </div>
    </Panel>
  );
}
