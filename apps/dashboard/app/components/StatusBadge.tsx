import { cn, STATUS } from "../lib/utils";
import type { ShipmentStatus } from "../types";
export function StatusBadge({ status }: { status: ShipmentStatus }) {
  const s = STATUS[status] ?? STATUS.PENDING;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", s.bg, s.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot, status === "IN_TRANSIT" && "live")} />
      {s.label}
    </span>
  );
}
