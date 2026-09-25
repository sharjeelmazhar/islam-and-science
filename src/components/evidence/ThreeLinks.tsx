import { STATUSES, type LinkShape, type Status } from "@/domain/statuses";

const X = [10, 150, 290] as const;
const Y = 16;

/**
 * The evidence grade drawn as a chain: Text → Reading → Science.
 * "A claim is only as strong as the weakest of those three links." The shape of each link is the grade.
 * `drawn` is how many links are visible (0–2); topics draw them as the reader scrolls through the steps.
 */
export function ThreeLinks({ status, drawn = 2, className = "" }: { status: Status; drawn?: 0 | 1 | 2; className?: string }) {
  const [l1, l2] = STATUSES[status].links;
  const color = `var(--st-${status})`;
  const hollow = status === "unseen" ? [2] : status === "caution" ? [1, 2] : [];
  return (
    <svg viewBox="0 0 300 40" className={`h-auto w-full max-w-[300px] overflow-visible ${className}`} role="img" aria-label={`Evidence: ${STATUSES[status].label}`}>
      <Link shape={l1} from={X[0]} to={X[1]} color={color} on={drawn >= 1} />
      <Link shape={l2} from={X[1]} to={X[2]} color={color} on={drawn >= 2} />
      {(["Text", "Reading", "Science"] as const).map((name, i) => {
        const isHollow = hollow.includes(i);
        const lit = i === 0 || drawn >= i;
        return (
          <g key={name} style={{ opacity: lit ? 1 : 0.25, transition: "opacity .6s" }}>
            <circle
              cx={X[i]}
              cy={Y}
              r={5}
              fill={isHollow ? "var(--paper)" : color}
              stroke={color}
              strokeWidth={1.4}
              strokeDasharray={status === "unseen" && i === 2 ? "2 2" : undefined}
              opacity={status === "caution" && i === 2 ? 0.4 : 1}
            />
            <text x={X[i]} y={37} textAnchor="middle" className="fill-ink-3 font-mono text-[8.5px] tracking-[0.08em] uppercase">
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Link({ shape, from, to, color, on }: { shape: LinkShape; from: number; to: number; color: string; on: boolean }) {
  const a = from + 9;
  const b = to - 9;
  const m = (a + b) / 2;
  // pathLength=1 lets every link draw with the same dash animation regardless of its real length.
  const draw = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    style: { transition: "stroke-dashoffset .9s var(--ease-rise)" },
  } as const;
  const common = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round" } as const;
  switch (shape) {
    case "solid":
      return <path d={`M${a} ${Y}H${b}`} {...common} {...draw} />;
    case "faded":
      return <path d={`M${a} ${Y}H${b}`} {...common} {...draw} opacity={0.25} />;
    case "dashed":
      return <path d={`M${a} ${Y}H${b}`} {...common} strokeDasharray="4 5" style={{ opacity: on ? 1 : 0, transition: "opacity .9s" }} />;
    case "forked":
      return (
        <>
          <path d={`M${a} ${Y}Q${m} ${Y - 15} ${b} ${Y}`} {...common} {...draw} />
          <path d={`M${a} ${Y}Q${m} ${Y + 15} ${b} ${Y}`} {...common} {...draw} />
        </>
      );
    case "void":
      return <path d={`M${a} ${Y}H${b}`} {...common} strokeDasharray="1 6" style={{ opacity: on ? 0.7 : 0, transition: "opacity .9s" }} />;
    case "broken":
      return (
        <>
          <path d={`M${a} ${Y}H${m - 12}`} {...common} {...draw} />
          <path d={`M${m + 12} ${Y}H${b}`} {...common} opacity={0.3} />
          <path d={`M${m - 5} ${Y - 5}L${m + 5} ${Y + 5}M${m + 5} ${Y - 5}L${m - 5} ${Y + 5}`} {...common} style={{ opacity: on ? 1 : 0, transition: "opacity .6s .4s" }} />
        </>
      );
  }
}
