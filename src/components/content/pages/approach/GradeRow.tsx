import type { ReactNode } from "react";
import type { Status } from "@/domain/statuses";
import { Grade } from "@/components/evidence/Grade";
import { ThreeLinks } from "@/components/evidence/ThreeLinks";

/** One evidence grade explained: its Text → Reading → Science chain and label beside the explanation. Used on the approach page legend. */
export function GradeRow({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <div className="reveal grid gap-4 border-t border-rule py-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12">
      <div className="space-y-3">
        <ThreeLinks status={status} />
        <Grade status={status} long />
      </div>
      <div className="max-w-[60ch] text-[1.08rem]">{children}</div>
    </div>
  );
}
