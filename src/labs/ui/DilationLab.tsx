import { useState } from "react";
import { BETA_MAX, DILATION_PRESETS, dilation } from "../physics";
import { Field, Panel, Preset, Presets, rangeInput, Readout } from "./parts";

/** Time dilation calculator (physics). The slider moves in steps of 0.0001 c; presets can be finer. */
export function DilationLab() {
  const [beta, setBeta] = useState(0.8);
  const d = dilation(beta);
  return (
    <Panel>
      <Presets label="Presets">
        {DILATION_PRESETS.map((p) => (
          <Preset key={p.label} on={beta === p.beta} onClick={() => setBeta(p.beta)}>
            {p.label}
          </Preset>
        ))}
      </Presets>
      <Field label="Speed (fraction of light speed)" value={`${d.betaText} c`}>
        <input
          type="range"
          min={0}
          max={9999}
          value={Math.round(beta * 10000)}
          onChange={(e) => setBeta(Math.min(BETA_MAX, Number(e.target.value) / 10000))}
          aria-label="Speed as a fraction of the speed of light"
          aria-valuetext={`${d.betaText} c`}
          className={rangeInput}
        />
      </Field>
      <Readout big={`γ = ${d.gammaText}`}>
        At {d.speedText} ({d.betaText} c), for each year that passes for the traveller, an extra <strong>{d.extra}</strong> pass on
        Earth. This is the special-relativity effect only.
      </Readout>
    </Panel>
  );
}
