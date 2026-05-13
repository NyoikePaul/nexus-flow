import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ShipmentStatus, Shipment, KPI } from "../types";

export const cn = (...i: ClassValue[]) => twMerge(clsx(i));

export const STATUS: Record<ShipmentStatus, { label:string; bg:string; text:string; dot:string }> = {
  PENDING:    { label:"Pending",    bg:"bg-amber-50 border-amber-200",   text:"text-amber-700",  dot:"bg-amber-500"  },
  IN_TRANSIT: { label:"In Transit", bg:"bg-blue-50 border-blue-200",     text:"text-blue-700",   dot:"bg-blue-500"   },
  CUSTOMS:    { label:"Customs",    bg:"bg-purple-50 border-purple-200", text:"text-purple-700", dot:"bg-purple-500" },
  DELIVERED:  { label:"Delivered",  bg:"bg-green-50 border-green-200",   text:"text-green-700",  dot:"bg-green-500"  },
  DELAYED:    { label:"Delayed",    bg:"bg-red-50 border-red-200",       text:"text-red-700",    dot:"bg-red-500"    },
  CANCELLED:  { label:"Cancelled",  bg:"bg-slate-50 border-slate-200",   text:"text-slate-600",  dot:"bg-slate-400"  },
};

export const RISK = (s: number) =>
  s >= 75 ? { label:"Critical", color:"text-red-600",    bar:"bg-red-500"    } :
  s >= 50 ? { label:"High",     color:"text-orange-600", bar:"bg-orange-500" } :
  s >= 25 ? { label:"Medium",   color:"text-amber-600",  bar:"bg-amber-400"  } :
            { label:"Low",      color:"text-green-600",  bar:"bg-green-500"  };

export function kpi(list: Shipment[]): KPI {
  const n = list.length;
  return {
    total:     n,
    inTransit: list.filter(s => s.status === "IN_TRANSIT").length,
    delivered: list.filter(s => s.status === "DELIVERED").length,
    highRisk:  list.filter(s => s.aiRiskScore >= 75).length,
    avgRisk:   n ? Math.round(list.reduce((a,s) => a + s.aiRiskScore, 0) / n) : 0,
    onTime:    n ? Math.round(list.filter(s => !["DELAYED","CANCELLED"].includes(s.status)).length / n * 100) : 0,
  };
}

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }).format(new Date(iso));
