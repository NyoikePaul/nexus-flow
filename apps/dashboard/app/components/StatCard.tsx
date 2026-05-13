import { cn } from "../lib/utils";
import type { ReactNode } from "react";
const ACCENT: Record<string,string> = {
  blue:  "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  red:   "bg-red-50 text-red-600 border-red-100",
};
export function StatCard({ title,value,sub,icon,accent="blue" }:
  { title:string; value:string|number; sub?:string; icon:ReactNode; accent?:string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <div className={cn("p-2 rounded-lg border text-sm", ACCENT[accent]??ACCENT.blue)}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}
