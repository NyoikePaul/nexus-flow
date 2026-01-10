# Changelog

All notable changes to NexusFlow are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com).

---

## [Unreleased]

### Planned
- Real-time WebSocket updates
- Email alerts for high-risk shipments
- Multi-tenant support

---

## [1.1.0] — 2026-04-20

### Added
- AI risk score bar with colour-coded thresholds
- Status filter tabs (All / In Transit / Pending / Customs / Delivered / Delayed)
- Auto-refresh every 30 seconds
- Demo mode fallback when API is unreachable
- 6 KPI cards (total, in-transit, delivered, high-risk, avg-risk, on-time)

### Changed
- Migrated from plain fetch to typed API client
- Replaced `any` types with strict TypeScript interfaces

---

## [1.0.0] — 2026-01-10

### Added
- Initial monorepo setup with TurboRepo + pnpm workspaces
- Next.js 16 dashboard
- NestJS 11 REST API
- Prisma 5 + PostgreSQL data layer
- Docker Compose for local development
- GitHub Actions CI pipeline
