import type { PaginatedShipments } from "../types";

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(msg: string, public status: number) { super(msg); this.name = "ApiError"; }
}

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!r.ok) { const b = await r.json().catch(() => ({})); throw new ApiError(b.message ?? `HTTP ${r.status}`, r.status); }
  return r.json();
}

export const fetchShipments = (p: { page?:number; limit?:number; search?:string; status?:string }) => {
  const q = new URLSearchParams();
  if (p.page)   q.set("page",   String(p.page));
  if (p.limit)  q.set("limit",  String(p.limit));
  if (p.search) q.set("search", p.search);
  if (p.status) q.set("status", p.status);
  return get<PaginatedShipments>(`/shipments${q.size ? `?${q}` : ""}`);
};

