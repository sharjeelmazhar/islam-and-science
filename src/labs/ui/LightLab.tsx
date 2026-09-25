import { useState } from "react";
import { LIGHT_OBJECTS } from "../physics";
import { Field, Panel, Readout } from "./parts";

type LightObject = (typeof LIGHT_OBJECTS)[number];

/** Light travel time to astronomical objects (deep space). Opens on the Sun. */
export function LightLab() {
  const [object, setObject] = useState<LightObject>(LIGHT_OBJECTS[1]);
  return (
    <Panel>
      <Field label="Object">
        <select
          value={object.name}
          onChange={(e) => {
            const next = LIGHT_OBJECTS.find((o) => o.name === e.target.value);
            if (next) setObject(next);
          }}
          aria-label="Choose an object"
          className="w-full border border-rule-2 bg-paper px-3 py-2 text-ink hover:border-ink-3 md:w-auto md:min-w-72"
        >
          {LIGHT_OBJECTS.map((o) => (
            <option key={o.name} value={o.name}>
              {o.name}
            </option>
          ))}
        </select>
      </Field>
      <Readout big={object.time}>{object.note}</Readout>
    </Panel>
  );
}
