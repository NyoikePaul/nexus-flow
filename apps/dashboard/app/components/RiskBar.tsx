import { cn, RISK } from "../lib/utils";
export function RiskBar({ score }: { score: number }) {
  const { label, color, bar } = RISK(score);
  return (
    <div className="flex flex-col items-end gap-0.5">
      <div className="flex items-center gap-2">
        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full", bar)} style={{ width: `${Math.min(100, score)}%` }} />
        </div>
        <span className={cn("text-sm font-bold tabular-nums w-7 text-right", color)}>{Math.round(score)}</span>
      </div>
      <p className={cn("text-[10px] font-bold uppercase tracking-widest", color)}>{label}</p>
    </div>
  );
}
