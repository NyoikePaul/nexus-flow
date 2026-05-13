export type ShipmentStatus = "PENDING"|"IN_TRANSIT"|"CUSTOMS"|"DELIVERED"|"DELAYED"|"CANCELLED";
export interface Shipment {
  id: string; trackingId: string; origin: string; destination: string;
  status: ShipmentStatus; aiRiskScore: number; createdAt: string; updatedAt: string;
}
export interface PaginatedShipments {
  data: Shipment[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
export interface KPI { total:number; inTransit:number; delivered:number; highRisk:number; avgRisk:number; onTime:number; }
