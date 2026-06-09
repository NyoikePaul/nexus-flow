# Nexus Flow

> **Production-ready Shipment Tracking System** — NestJS · PostgreSQL · Redis · M-Pesa Daraja 2.0

[![CI](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml/badge.svg)](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🚀 Live Status

**✅ Backend API (Render)** — Live & Healthy  
**Live URL**: [https://nexus-flow-api-2pty.onrender.com](https://nexus-flow-api-2pty.onrender.com)

**Frontend Dashboard (Vercel)**: [https://nexus-flow-dashboard-alpha.vercel.app](https://nexus-flow-dashboard-alpha.vercel.app)

**API Health Check**: [`/api/v1/health`](https://nexus-flow-api-2pty.onrender.com/api/v1/health)

---

## Stack

| Layer           | Technology                          |
|-----------------|-------------------------------------|
| Runtime         | Node.js 20, NestJS 10               |
| Language        | TypeScript 5                        |
| Database        | PostgreSQL 16 (Prisma ORM)          |
| Cache / Queue   | Redis 7 (Upstash)                   |
| Payments        | M-Pesa Daraja 2.0 STK Push          |
| Auth            | JWT + Refresh Tokens                |
| Deployment      | Render (API) + Vercel (Dashboard)   |
| CI/CD           | GitHub Actions                      |

---

## Quick Start

``bash
# 1. Clone
git clone https://github.com/NyoikePaul/nexus-flow.git
cd nexus-flow

# 2. Install dependencies
pnpm install

# 3. Environment variables
cp .env.example .env
# → Fill in your DATABASE_URL, REDIS credentials, M-Pesa keys, etc.

# 4. Run API
cd apps/api
pnpm dev

API EndpointsMethod
Path
Description
POST
/api/v1/shipments
Create new shipment
GET
/api/v1/shipments
List shipments (with filters)
GET
/api/v1/shipments/:id
Get single shipment
PATCH
/api/v1/shipments/:id
Update status
GET
/api/v1/health
Health check

Example filter: ?status=IN_TRANSIT&origin=Nairobi&page=1&limit=10Environment VariablesSee `.env.example` (.env.example) for full list.Key variables:DATABASE_URL
REDIS_HOST, REDIS_PASSWORD, REDIS_TLS
M-Pesa credentials (MPESA_*)
JWT_SECRET & JWT_REFRESH_SECRET

DeploymentRender (API) — RecommendedThis repo includes render.yaml — just connect your GitHub repo on Render → New Blueprint.Vercel (Dashboard)Set environment variable:env

NEXT_PUBLIC_API_URL=https://nexus-flow-api-2pty.onrender.com

Project Structurebash

nexus-flow/

├── apps/
│   ├── api/           # NestJS Backend
│   └── dashboard/     # Next.js Frontend
├── packages/          # Shared utilities
├── prisma/            # Database schema
├── render.yaml        # Render Blueprint
├── vercel.json
└── .github/workflows/ # CI pipeline

ContributingSee CONTRIBUTING.md. Pull requests are welcome!LicenseMIT © 2026 NyoikePaulMade with  for East African Logistics

<img width="1366" height="590" alt="image" src="https://github.com/user-attachments/assets/60999741-e623-4080-8db6-07cd4d1436ec" />

