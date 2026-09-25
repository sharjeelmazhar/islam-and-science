import { STATUSES, type Status } from "@/domain/statuses";
import { ClaimStar } from "./ClaimStar";

/** Inline grade label with its star glyph. Used where a full chain would be too big. */
export function Grade({ status, long = false }: { status: Status; long?: boolean }) {
  const s = STATUSES[status];
  return (
    <span className="inline-flex items-center gap-2 align-middle font-mono text-[0.72rem] tracking-[0.08em] uppercase" style={{ color: `var(--st-${status})` }} title={s.tip}>
      <ClaimStar status={status} size={13} />
      {long ? s.label : s.short}
    </span>
  );
}
