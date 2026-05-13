"use client";
import React, { useState, useEffect, useCallback, useTransition, useDeferredValue } from "react";
import { Search, Package, MapPin, TrendingUp, Clock, AlertTriangle, CheckCircle2,
         RefreshCcw, ChevronLeft, ChevronRight, Filter, Activity } from "lucide-react";
import { fetchShipments } from "./lib/api";
import { cn, kpi, fmtDate, STATUS } from "./lib/utils";
import { StatCard }    from "./components/StatCard";
import { StatusBadge } from "./components/StatusBadge";
import { RiskBar }     from "./components/RiskBar";
import { ErrorBanner } from "./components/ErrorBanner";
import { StatsSk, RowSk } from "./components/Skeleton";
import type { Shipment, ShipmentStatus } from "./types";

const LIMIT = 10;

const MOCK: Shipment[] = [
  {id:"1",trackingId:"NF-KE-001",origin:"Nairobi, Kenya",      destination:"Dubai, UAE",          status:"IN_TRANSIT",aiRiskScore:22,createdAt:new Date(Date.now()-3*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"2",trackingId:"NF-TZ-002",origin:"Dar es Salaam, TZ",   destination:"Rotterdam, NL",       status:"CUSTOMS",   aiRiskScore:61,createdAt:new Date(Date.now()-7*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"3",trackingId:"NF-UG-003",origin:"Kampala, Uganda",     destination:"London, UK",          status:"DELIVERED", aiRiskScore:8, createdAt:new Date(Date.now()-14*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"4",trackingId:"NF-NG-004",origin:"Lagos, Nigeria",      destination:"New York, US",        status:"DELAYED",   aiRiskScore:87,createdAt:new Date(Date.now()-2*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"5",trackingId:"NF-ZA-005",origin:"Cape Town, SA",       destination:"Singapore",           status:"IN_TRANSIT",aiRiskScore:34,createdAt:new Date(Date.now()-5*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"6",trackingId:"NF-ET-006",origin:"Addis Ababa, ETH",    destination:"Frankfurt, DE",       status:"PENDING",   aiRiskScore:45,createdAt:new Date(Date.now()-1*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"7",trackingId:"NF-GH-007",origin:"Accra, Ghana",        destination:"Paris, France",       status:"IN_TRANSIT",aiRiskScore:19,createdAt:new Date(Date.now()-4*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"8",trackingId:"NF-SN-008",origin:"Dakar, Senegal",      destination:"Marseille, France",   status:"DELIVERED", aiRiskScore:5, createdAt:new Date(Date.now()-10*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"9",trackingId:"NF-EG-009",origin:"Cairo, Egypt",        destination:"Mumbai, India",       status:"CUSTOMS",   aiRiskScore:72,createdAt:new Date(Date.now()-6*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"10",trackingId:"NF-MA-010",origin:"Casablanca, Morocco",destination:"Toronto, Canada",     status:"IN_TRANSIT",aiRiskScore:28,createdAt:new Date(Date.now()-8*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"11",trackingId:"NF-MU-011",origin:"Port Louis, Mauritius",destination:"Sydney, Australia", status:"DELAYED",   aiRiskScore:91,createdAt:new Date(Date.now()-3*86400000).toISOString(),updatedAt:new Date().toISOString()},
  {id:"12",trackingId:"NF-CI-012",origin:"Abidjan, Côte d'Ivoire",destination:"Beijing, China",  status:"PENDING",   aiRiskScore:55,createdAt:new Date(Date.now()-2*86400000).toISOString(),updatedAt:new Date().toISOString()},
];

const FILTERS = [
  {v:"",          l:"All"},
  {v:"IN_TRANSIT",l:"In Transit"},
  {v:"PENDING",   l:"Pending"},
  {v:"CUSTOMS",   l:"Customs"},
  {v:"DELIVERED", l:"Delivered"},
  {v:"DELAYED",   l:"Delayed"},
];

export default function Page() {
  const [rows,    setRows]    = useState<Shipment[]>([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(true);
  const [spinning,setSpinning]= useState(false);
  const [err,     setErr]     = useState<string|null>(null);
  const [demo,    setDemo]    = useState(false);
  const [filter,  setFilter]  = useState("");
  const [raw,     setRaw]     = useState("");
  const [,        startTx]    = useTransition();
  const search = useDeferredValue(raw);
  const pages  = Math.max(1, Math.ceil(total / LIMIT));

  const load = useCallback(async (silent=false) => {
    silent ? setSpinning(true) : setLoading(true);
    setErr(null);
    try {
      const res = await fetchShipments({ page, limit: LIMIT, search: search||undefined, status: filter||undefined });
      setRows(res.data); setTotal(res.meta.total); setDemo(false);
    } catch {
      let list = MOCK;
      if (filter) list = list.filter(s => s.status === filter);
      if (search) list = list.filter(s =>
        [s.trackingId, s.origin, s.destination].some(v => v.toLowerCase().includes(search.toLowerCase()))
      );
      const start = (page-1)*LIMIT;
      setRows(list.slice(start, start+LIMIT)); setTotal(list.length); setDemo(true);
      setErr("API unavailable — showing demo data.");
    } finally { setLoading(false); setSpinning(false); }
  }, [page, search, filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const id = setInterval(() => load(true), 30000); return () => clearInterval(id); }, [load]);

  const stats = kpi(demo ? MOCK : rows);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-white border-b shadow-sm px-6 md:px-8 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <Package className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">NexusFlow</span>
            <span className="hidden md:inline text-xs text-slate-400 ml-2">Enterprise Logistics</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {demo && (
            <span className="hidden md:inline px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
              Demo Mode
            </span>
          )}
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 live" />
            Live
          </span>
          <button onClick={() => load(true)} disabled={spinning}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 disabled:opacity-50"
            aria-label="Refresh">
            <RefreshCcw className={cn("w-4 h-4", spinning && "animate-spin")} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {err && <ErrorBanner msg={err} onClose={() => setErr(null)} />}

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {loading ? Array.from({length:6}).map((_,i) => <StatsSk key={i} />) : <>
            <StatCard title="Total"       value={stats.total}          sub="All shipments"       icon={<Package className="w-4 h-4"/>}       accent="blue"  />
            <StatCard title="In Transit"  value={stats.inTransit}      sub="Moving now"          icon={<Activity className="w-4 h-4"/>}      accent="blue"  />
            <StatCard title="Delivered"   value={stats.delivered}      sub="Completed"           icon={<CheckCircle2 className="w-4 h-4"/>}  accent="green" />
            <StatCard title="High Risk"   value={stats.highRisk}       sub="Score ≥ 75"          icon={<AlertTriangle className="w-4 h-4"/>} accent="red"   />
            <StatCard title="Avg Risk"    value={`${stats.avgRisk}%`}  sub="All shipments"       icon={<TrendingUp className="w-4 h-4"/>}    accent="amber" />
            <StatCard title="On-Time"     value={`${stats.onTime}%`}   sub="Excl. cancelled"     icon={<Clock className="w-4 h-4"/>}         accent="green" />
          </>}
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <input type="search" placeholder="Search tracking ID, origin or destination…"
              value={raw} onChange={e => { setRaw(e.target.value); startTx(() => setPage(1)); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {FILTERS.map(f => (
              <button key={f.v} onClick={() => { setFilter(f.v); startTx(() => setPage(1)); }}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  filter===f.v ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600")}>
                {f.l}
              </button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-[1fr_1.2fr_auto_auto_auto] gap-4 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          <span>Tracking</span><span>Route</span><span>Status</span><span>Risk</span><span className="text-right">Created</span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {loading ? Array.from({length:LIMIT}).map((_,i) => <RowSk key={i} />) :
           rows.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No shipments match your filters</p>
              <button onClick={() => { setRaw(""); setFilter(""); setPage(1); }}
                className="mt-3 text-sm text-blue-600 hover:underline">Clear filters</button>
            </div>
          ) : rows.map((r,i) => <Row key={r.id} s={r} i={i} />)}
        </div>

        {/* Pagination */}
        {!loading && pages > 1 && (
          <div className="flex items-center justify-between mt-6 text-sm text-slate-500">
            <span>Showing {(page-1)*LIMIT+1}–{Math.min(page*LIMIT,total)} of {total}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({length:Math.min(5,pages)},(_,i)=>{
                const p=Math.max(1,Math.min(pages-4,page-2))+i;
                return <button key={p} onClick={()=>setPage(p)}
                  className={cn("w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                    p===page?"bg-blue-600 text-white":"hover:bg-slate-100 text-slate-600")}>{p}</button>;
              })}
              <button onClick={() => setPage(p => Math.min(pages,p+1))} disabled={page===pages}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t text-center py-6 text-xs text-slate-400">
        NexusFlow © {new Date().getFullYear()} — Built with Next.js 16 + NestJS 11 — Nairobi, Kenya 🇰🇪
      </footer>
    </div>
  );
}

function Row({ s, i }: { s: Shipment; i: number }) {
  return (
    <div className="fade-in bg-white border border-slate-200 rounded-xl p-4 md:p-5 hover:shadow-md hover:border-slate-300 transition-all"
      style={{ animationDelay: `${i*35}ms` }}>
      {/* Mobile */}
      <div className="flex items-start justify-between md:hidden mb-2">
        <div>
          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{s.trackingId}</span>
          <p className="font-semibold text-slate-800 mt-1 text-sm">{s.origin} <span className="text-slate-400">→</span> {s.destination}</p>
        </div>
        <StatusBadge status={s.status as ShipmentStatus} />
      </div>
      <div className="flex md:hidden items-center justify-between">
        <RiskBar score={s.aiRiskScore} />
        <p className="text-xs text-slate-400">{fmtDate(s.createdAt)}</p>
      </div>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[1fr_1.2fr_auto_auto_auto] gap-4 items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
            <MapPin className="text-slate-400 w-4 h-4" />
          </div>
          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{s.trackingId}</span>
        </div>
        <p className="font-semibold text-slate-800 text-sm truncate">{s.origin} <span className="text-slate-400">→</span> {s.destination}</p>
        <StatusBadge status={s.status as ShipmentStatus} />
        <RiskBar score={s.aiRiskScore} />
        <p className="text-xs text-slate-400 text-right whitespace-nowrap">{fmtDate(s.createdAt)}</p>
      </div>
    </div>
  );
}
