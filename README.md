# Nexus Flow

> **Shipment tracking API** — NestJS · PostgreSQL · Redis · M-Pesa Daraja 2.0

[![CI](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml/badge.svg)](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live API: **https://nexus-flow-api-2pty.onrender.com**
Dashboard: **https://nexus-flow-dashboard-alpha.vercel.app**

---

## Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js 20, NestJS 10 |
| Language | TypeScript 5 |
| Database | PostgreSQL 16 (Prisma ORM) |
| Cache / Queue | Redis 7 (Upstash) |
| Payments | M-Pesa Daraja 2.0 STK Push |
| Auth | JWT access + refresh tokens |
| Deploy | Render (API) · Vercel (Dashboard) |
| CI | GitHub Actions |

---

## Quick Start

```bash
# Clone
git clone https://github.com/NyoikePaul/nexus-flow.git
cd nexus-flow/apps/api

# Install
npm install

# Environment
cp .env.example .env
# Fill in DATABASE_URL, REDIS_HOST, JWT_SECRET etc.

# Dev
npm run dev
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/shipments` | Create shipment |
| `GET` | `/shipments` | List with filters |
| `GET` | `/shipments/:id` | Get by ID |
| `PATCH` | `/shipments/:id` | Update status |
| `DELETE` | `/shipments/:id` | Remove |
| `GET` | `/api/v1/health` | Health check |

**Query filters:** `?status=PENDING&origin=Nairobi&page=1&limit=10`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `REDIS_HOST` | ✅ | Redis host (e.g. Upstash) |
| `REDIS_PORT` | ✅ | Redis port (6379) |
| `REDIS_PASSWORD` | ✅ | Redis auth token |
| `REDIS_TLS` | ✅ | `true` for Upstash |
| `JWT_SECRET` | ✅ | Access token secret |
| `JWT_REFRESH_SECRET` | ✅ | Refresh token secret |
| `JWT_EXPIRES_IN` | ✅ | e.g. `15m` |
| `MPESA_ENV` | ✅ | `sandbox` or `production` |
| `MPESA_CONSUMER_KEY` | ✅ | From Safaricom portal |
| `MPESA_CONSUMER_SECRET` | ✅ | From Safaricom portal |
| `MPESA_SHORTCODE` | ✅ | Paybill/Till number |
| `MPESA_PASSKEY` | ✅ | From Safaricom portal |
| `API_BASE_URL` | ✅ | Public URL of this API |
| `ALLOWED_ORIGINS` | ✅ | CORS origin whitelist |
| `PORT` | — | Default `3001` |
| `NODE_ENV` | — | Default `development` |

---

## Deployment

### Render (API)

1. Fork or use this repo
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect `NyoikePaul/nexus-flow` — Render reads `render.yaml` automatically
4. Fill in the `sync: false` env vars (Redis, M-Pesa keys)
5. Render creates the Postgres DB + web service and deploys

### Upstash Redis (free)

1. Go to [upstash.com](https://upstash.com) → Create Database
2. Region: `af-south-1` (Cape Town — closest to Kenya)
3. Copy **Endpoint** → `REDIS_HOST`, **Token** → `REDIS_PASSWORD`, Port `6379`, TLS `true`

### Vercel (Dashboard)

```
NEXT_PUBLIC_API_URL = https://nexus-flow-api-2pty.onrender.com
```

---

## Project Structure

```
nexus-flow/
├── apps/
│   └── api/                  # NestJS API
│       ├── src/
│       │   ├── shipments/    # CRUD + filtering
│       │   ├── health/       # /health endpoint
│       │   ├── common/       # Filters, interceptors, Prisma
│       │   └── main.ts
│       ├── prisma/
│       │   └── schema.prisma # Shipment model
│       └── Dockerfile
├── render.yaml               # Render Blueprint
├── railway.toml              # Railway config
└── .github/workflows/        # CI pipeline
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome.

---

## License

MIT © 2026 NyoikePaul
