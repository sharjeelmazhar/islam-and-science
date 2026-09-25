import { useId } from "react";
import type { Status } from "@/domain/statuses";

/** 8-point star path centred on (cx, cy). */
export function starPath(cx: number, cy: number, r: number) {
  const inner = r * 0.62;
  let d = "";
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    const rr = i % 2 ? inner : r;
    d += `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(2)} ${(cy + Math.sin(a) * rr).toFixed(2)}`;
  }
  return `${d}Z`;
}

/**
 * One claim as an eight-point star whose *shape* encodes its grade (so colour is never the only signal):
 * established = filled, interpretive = half filled, debated = double outline, unseen = dotted, caution = struck.
 */
export function ClaimStarShape({ status, cx = 12, cy = 12, r = 10 }: { status: Status; cx?: number; cy?: number; r?: number }) {
  const clip = useId();
  const c = `var(--st-${status})`;
  const d = starPath(cx, cy, r);
  switch (status) {
    case "established":
      return <path d={d} fill={c} stroke={c} />;
    case "interpretive":
      return (
        <g>
          <clipPath id={clip}>
            <rect x={cx - r} y={cy - r} width={r} height={2 * r} />
          </clipPath>
          <path d={d} fill={c} clipPath={`url(#${clip})`} />
          <path d={d} fill="none" stroke={c} />
        </g>
      );
    case "debated":
      return (
        <g fill="none" stroke={c}>
          <path d={d} />
          <path d={starPath(cx, cy, r * 0.58)} />
        </g>
      );
    case "unseen":
      return <path d={d} fill="none" stroke={c} strokeDasharray="1.5 2" />;
    case "caution":
      return (
        <g stroke={c} fill="none">
          <path d={d} opacity={0.5} />
          <path d={`M${cx - r * 0.8} ${cy + r * 0.8}L${cx + r * 0.8} ${cy - r * 0.8}`} strokeWidth={1.4} />
        </g>
      );
  }
}

export function ClaimStar({ status, size = 14, title }: { status: Status; size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className="shrink-0">
      {title ? <title>{title}</title> : null}
      <ClaimStarShape status={status} />
    </svg>
  );
}
