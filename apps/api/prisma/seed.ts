import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const SEED = [
  { trackingId:'NF-KE-001', origin:'Nairobi, Kenya',       destination:'Dubai, UAE',         status:'IN_TRANSIT', aiRiskScore:22 },
  { trackingId:'NF-TZ-002', origin:'Dar es Salaam, TZ',    destination:'Rotterdam, NL',      status:'CUSTOMS',    aiRiskScore:61 },
  { trackingId:'NF-UG-003', origin:'Kampala, Uganda',      destination:'London, UK',         status:'DELIVERED',  aiRiskScore:8  },
  { trackingId:'NF-NG-004', origin:'Lagos, Nigeria',       destination:'New York, US',       status:'DELAYED',    aiRiskScore:87 },
  { trackingId:'NF-ZA-005', origin:'Cape Town, SA',        destination:'Singapore',          status:'IN_TRANSIT', aiRiskScore:34 },
  { trackingId:'NF-ET-006', origin:'Addis Ababa, ETH',     destination:'Frankfurt, DE',      status:'PENDING',    aiRiskScore:45 },
  { trackingId:'NF-GH-007', origin:'Accra, Ghana',         destination:'Paris, France',      status:'IN_TRANSIT', aiRiskScore:19 },
  { trackingId:'NF-SN-008', origin:'Dakar, Senegal',       destination:'Marseille, France',  status:'DELIVERED',  aiRiskScore:5  },
  { trackingId:'NF-EG-009', origin:'Cairo, Egypt',         destination:'Mumbai, India',      status:'CUSTOMS',    aiRiskScore:72 },
  { trackingId:'NF-MA-010', origin:'Casablanca, Morocco',  destination:'Toronto, Canada',    status:'IN_TRANSIT', aiRiskScore:28 },
];
async function main() {
  console.log('Seeding...');
  for (const s of SEED) {
    await prisma.shipment.upsert({ where:{ trackingId:s.trackingId }, create:s as any, update:{} });
  }
  console.log(`Done — ${SEED.length} shipments`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
