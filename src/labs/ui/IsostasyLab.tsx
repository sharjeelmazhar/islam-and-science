import { useState } from "react";
import { crossSection, isostasy, SECTION } from "../earth";
import { Field, Panel, rangeInput, Readout } from "./parts";

/** Isostasy: mountain root depth from height (earth). Sliders hold tenths of a km and hundredths of g/cm³. */
export function IsostasyLab() {
  const [hRaw, setH] = useState(88);
  const [rcRaw, setRc] = useState(280);
  const [rmRaw, setRm] = useState(330);
  const h = hRaw / 10;
  const rc = rcRaw / 100;
  const rm = rmRaw / 100;
  const { root, ratio } = isostasy(h, rc, rm);
  const { crustBase, base, halfRoot, peak, bottom, crustPath } = crossSection(h, root);
  const { width, height, sea, crust, cx } = SECTION;

  return (
    <Panel>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Cross-section of a mountain and its root"
        className="h-auto w-full font-mono text-[18px]"
      >
        <rect className="fill-gold-2/20" x="0" y="0" width={width} height={height} />
        <rect className="fill-paper" x="0" y="0" width={width} height={sea} />
        <path className="fill-paper-3 stroke-ink-2" d={crustPath} />
        <g className="fill-none stroke-gold" strokeWidth={1.2}>
          <line x1={cx + base + 16} y1={peak} x2={cx + base + 16} y2={sea} />
          <line x1={cx + 4} y1={peak} x2={cx + base + 22} y2={peak} strokeDasharray="3 4" />
          <line x1={cx + 18} y1={crustBase} x2={cx + 18} y2={bottom} />
          <line x1={60} y1={sea} x2={60} y2={crustBase} />
        </g>
        <g className="fill-ink font-medium">
          <text x={cx + base + 26} y={Math.max(peak, sea - 30) + 4}>
            height {h.toFixed(1)} km
          </text>
          <text x={cx + 28} y={(crustBase + bottom) / 2 + 5}>
            root ≈ {root.toFixed(1)} km
          </text>
        </g>
        <g className="fill-ink-2">
          <text x={70} y={(sea + crustBase) / 2 + 5}>
            normal crust ≈ {crust} km
          </text>
          <text x={20} y={sea - 12}>
            surface
          </text>
          <text x={20} y={Math.min(590, Math.max(crustBase + 40, 360))}>
            mantle (denser, {rm.toFixed(2)} g/cm³)
          </text>
          <text x={cx + halfRoot + 90} y={crustBase - 20}>
            crust ({rc.toFixed(2)} g/cm³)
          </text>
        </g>
      </svg>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Mountain height" value={`${h.toFixed(1)} km`}>
          <input
            type="range"
            min={5}
            max={90}
            value={hRaw}
            onChange={(e) => setH(Number(e.target.value))}
            aria-label="Mountain height in tenths of a kilometre"
            aria-valuetext={`${h.toFixed(1)} km`}
            className={rangeInput}
          />
        </Field>
        <Field label="Crust density" value={`${rc.toFixed(2)} g/cm³`}>
          <input
            type="range"
            min={260}
            max={290}
            value={rcRaw}
            onChange={(e) => setRc(Number(e.target.value))}
            aria-label="Crust density"
            aria-valuetext={`${rc.toFixed(2)} grams per cubic centimetre`}
            className={rangeInput}
          />
        </Field>
        <Field label="Mantle density" value={`${rm.toFixed(2)} g/cm³`}>
          <input
            type="range"
            min={320}
            max={340}
            value={rmRaw}
            onChange={(e) => setRm(Number(e.target.value))}
            aria-label="Mantle density"
            aria-valuetext={`${rm.toFixed(2)} grams per cubic centimetre`}
            className={rangeInput}
          />
        </Field>
      </div>

      <Readout big={`Root ≈ ${root.toFixed(1)} km · ${ratio.toFixed(1)}× the height`}>
        Airy isostasy: root = h × ρ<sub>crust</sub> / (ρ<sub>mantle</sub> − ρ<sub>crust</sub>). A simplified model; real mountain belts
        vary.
      </Readout>
    </Panel>
  );
}
