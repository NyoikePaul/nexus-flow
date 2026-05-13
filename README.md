# NexusFlow — Enterprise Logistics Command Center

> Real-time shipment tracking, AI risk scoring, and logistics orchestration — built from Nairobi, Kenya 🇰🇪

[![CI](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml/badge.svg)](https://github.com/NyoikePaul/nexus-flow/actions)

## Architecture

```
nexus-flow/
├── apps/
│   ├── dashboard/   # Next.js 16  — deployed on Vercel (port 3000)
│   ├── api/         # NestJS 11   — deployed on Railway (port 4000)
│   └── docs/        # Next.js docs (port 3001)
└── packages/
    ├── ui/          # Shared React components
    ├── database/    # Shared Prisma schema
    ├── eslint-config/
    └── typescript-config/
```

## Quick Start

```bash
git clone https://github.com/NyoikePaul/nexus-flow.git && cd nexus-flow
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/dashboard/.env.example apps/dashboard/.env.local
docker compose up -d
sleep 5
cd apps/api && npx prisma generate && npx prisma migrate deploy && npx ts-node prisma/seed.ts && cd ../..
pnpm dev
```

Dashboard → http://localhost:3000  
API       → http://localhost:4000/api/v1  
Swagger   → http://localhost:4000/api/docs  

## Vercel Deploy

1. Import `NyoikePaul/nexus-flow` on vercel.com
2. Set Root Directory → `apps/dashboard`
3. Add env var: `NEXT_PUBLIC_API_URL=https://your-api.railway.app`
4. Deploy ✅

## API Reference

| Method   | Endpoint               | Description              |
|----------|------------------------|--------------------------|
| `GET`    | /api/v1/shipments      | List (paginated+filtered)|
| `POST`   | /api/v1/shipments      | Create shipment          |
| `GET`    | /api/v1/shipments/:id  | Get by UUID              |
| `PATCH`  | /api/v1/shipments/:id  | Update shipment          |
| `DELETE` | /api/v1/shipments/:id  | Delete shipment          |
| `GET`    | /api/v1/health         | Health check             |

Query params: `page`, `limit`, `search`, `status`

## Stack

| Layer    | Tech                                     |
|----------|------------------------------------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4     |
| Backend  | NestJS 11, TypeScript, Prisma 5          |
| Database | PostgreSQL 16                            |
| Monorepo | TurboRepo 2, pnpm workspaces             |
| CI/CD    | GitHub Actions → Vercel                  |
