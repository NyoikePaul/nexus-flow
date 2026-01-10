"use client";

import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, CheckCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NexusDashboard() {
  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: In a real enterprise app, we'd use an environment variable for the URL
    fetch('http://localhost:4000/shipments')
      .then(res => res.json())
      .then(data => {
        setShipments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const filtered = shipments.filter((s: any) => 
    s.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    s.origin?.toLowerCase().includes(search.toLowerCase()) ||
    s.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <nav className="border-b bg-white px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Package className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">NexusFlow</span>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Search global shipments..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold">Logistics Command Center</h1>
            <p className="text-slate-500 text-sm">Monitoring {shipments.length} active fleet units</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-100">
               System Online
             </span>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm font-mono tracking-widest">SYNCING SATELLITE DATA...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.length > 0 ? filtered.map((shipment: any) => (
              <div key={shipment.id} className="bg-white border border-slate-200 p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex gap-6 items-center">
                  <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <MapPin className="text-slate-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {shipment.trackingId}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{shipment.origin} &rarr; {shipment.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", shipment.aiRiskScore > 70 ? "bg-red-500" : "bg-blue-500")}
                        style={{ width: `${shipment.aiRiskScore || 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8">{Math.round(shipment.aiRiskScore || 0)}%</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-widest">AI Risk Factor</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-400">No shipments found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
