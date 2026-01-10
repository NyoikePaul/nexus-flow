# NexusFlow Logistics Dashboard

A full-stack logistics monitoring system built with **Next.js**, **NestJS**, and **PostgreSQL**.

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- pnpm (`npm install -g pnpm`)

### 2. Infrastructure (Database)
Start the PostgreSQL container:
```bash
docker run --name nexus-db -e POSTGRES_USER=nexus -e POSTGRES_PASSWORD=nexus_password -e POSTGRES_DB=nexus_db -p 5433:5432 -d postgres
```

### 3. Backend Setup (API)
```bash
cd apps/api
pnpm install
export DATABASE_URL="postgresql://nexus:nexus_password@localhost:5433/nexus_db?schema=public"
npx prisma db push
pnpm run start:dev
```
*API runs at: http://localhost:4000*

### 4. Frontend Setup (Dashboard)
Open a new terminal:
```bash
cd apps/dashboard
pnpm install
pnpm run dev
```
*Dashboard runs at: http://localhost:3000*

## 🛠 Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Lucide Icons
- **Backend:** NestJS, Prisma ORM
- **Database:** PostgreSQL (Docker)
- **Monorepo Tooling:** TurboRepo

## 📦 API Commands
Add a test shipment:
```bash
curl -X POST http://localhost:4000/shipments \
  -H "Content-Type: application/json" \
  -d '{"id": "NEXUS-1", "origin": "London", "destination": "New York", "status": "IN_TRANSIT"}'
```
