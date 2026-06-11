# <pre>NexusFlow</pre>

> **Production-ready Shipment Tracking & Workflow Engine** — NestJS · Next.js · PostgreSQL · M-Pesa Daraja 2.0

[![CI](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml/badge.svg)](https://github.com/NyoikePaul/nexus-flow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm)](https://pnpm.io)

---

## <pre>🚀 Live Deployments</pre>

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | [nexus-flow-api-2pty.onrender.com](https://nexus-flow-api-2pty.onrender.com) | ✅ Live |
| **Dashboard** | [nexus-flow-dashboard-alpha.vercel.app](https://nexus-flow-dashboard-alpha.vercel.app) | ✅ Live |
| **Health Check** | [/api/v1/health](https://nexus-flow-api-2pty.onrender.com/api/v1/health) | ✅ Healthy |

---

## <pre>🛠 Stack</pre>

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 22, NestJS 11 |
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Language | TypeScript 5 |
| Database | PostgreSQL 16 (Prisma ORM) |
| Cache / Queue | Redis 7 (Upstash) |
| Payments | M-Pesa Daraja 2.0 STK Push |
| Auth | JWT + Refresh Tokens |
| Monorepo | TurboRepo + pnpm workspaces |
| Deployment | Render (API) + Vercel (Dashboard) |
| CI/CD | GitHub Actions |

---

## <pre>⚡ Quick Start</pre>

```bash
# 1. Clone
git clone https://github.com/NyoikePaul/nexus-flow.git
cd nexus-flow

# 2. Install dependencies
pnpm install

# 3. Environment variables
cp .env.example .env
# Fill in DATABASE_URL, REDIS credentials, M-Pesa keys, JWT secrets

# 4. Run API
cd apps/api && pnpm dev

# 5. Run Dashboard (separate terminal)
cd apps/dashboard && pnpm dev
```

---

## <pre>📡 API Endpoints</pre>

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/shipments` | Create new shipment |
| `GET` | `/api/v1/shipments` | List shipments (with filters) |
| `GET` | `/api/v1/shipments/:id` | Get single shipment |
| `PATCH` | `/api/v1/shipments/:id` | Update status |
| `DELETE` | `/api/v1/shipments/:id` | Delete shipment |
| `GET` | `/api/v1/health` | Health check |

**Filter example:** `?status=IN_TRANSIT&origin=Nairobi&page=1&limit=10`

---

## 🔑 Environment Variables

See [`.env.example`](.env.example) for the full list. Key variables:

```env
DATABASE_URL=postgresql://...
REDIS_HOST=...
REDIS_PASSWORD=...
REDIS_TLS=true
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=...
MPESA_PASSKEY=...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
NEXT_PUBLIC_API_URL=https://nexus-flow-api-2pty.onrender.com


---

## <pre>🏗 Project Structure</pre>

nexus-flow/
├── apps/
│   ├── api/                        # NestJS Backend (port 4000)
│   └── dashboard/                  # Next.js Frontend (port 3000)
├── packages/                       # Shared utilities & types
├── .github/workflows/              # CI pipeline
├── render.yaml                     # Render Blueprint
└── turbo.json                      # TurboRepo config

---

## <pre>🚢 Deployment</pre>

**Render (API)** — Connect GitHub repo on Render → New Blueprint (uses `render.yaml`).

**Vercel (Dashboard)** — Set Root Directory to `apps/dashboard`, then add:
```env
NEXT_PUBLIC_API_URL=https://nexus-flow-api-2pty.onrender.com
```

---

## <pre>🤝 Contributing</pre>

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests are welcome!

---

## <pre>📄 License</pre>

MIT © 2026 [NyoikePaul](https://github.com/NyoikePaul) · Made with ❤️ for East African Logistics

<img width="1366" height="703" alt="NexusFlow Dashboard" src="https://github.com/user-attachments/assets/0b23e093-2939-439a-93d6-211a747e8582" />

<img width="1366" height="590" alt="NexusFlow API" src="https://github.com/user-attachments/assets/60999741-e623-4080-8db6-07cd4d1436ec" />
