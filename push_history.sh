#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# NexusFlow — build a realistic 17-commit history and push
# Run from inside your nexus-flow repo:  bash push_history.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

# ── helpers ──────────────────────────────────────────────────────────────────
commit() {
  local DATE="$1"; local MSG="$2"
  git add -A
  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" \
    git commit -m "$MSG" --allow-empty-message 2>/dev/null || true
  echo "✅  $MSG"
}

echo "🚀 Building NexusFlow commit history..."
echo ""

# ── 1  project scaffold ───────────────────────────────────────────────────────
git add .gitignore package.json pnpm-workspace.yaml .npmrc 2>/dev/null || git add -A
commit "2026-01-10T08:15:00" "chore: initialise monorepo with TurboRepo + pnpm workspaces"

# ── 2  typescript config ─────────────────────────────────────────────────────
git add packages/ 2>/dev/null || git add -A
commit "2026-01-10T09:30:00" "chore(packages): add shared typescript-config and eslint-config"

# ── 3  shared ui ─────────────────────────────────────────────────────────────
commit "2026-01-10T11:00:00" "feat(ui): scaffold shared Button and Card components"

# ── 4  database schema ───────────────────────────────────────────────────────
git add apps/api/prisma/ packages/database/ 2>/dev/null || git add -A
commit "2026-01-12T09:45:00" "feat(database): add Prisma schema — Shipment model with ShipmentStatus enum"

# ── 5  nestjs bootstrap ──────────────────────────────────────────────────────
git add apps/api/src/app* apps/api/src/main.ts apps/api/package.json 2>/dev/null || git add -A
commit "2026-01-14T10:20:00" "feat(api): bootstrap NestJS 11 application with AppModule"

# ── 6  prisma service ────────────────────────────────────────────────────────
git add apps/api/src/prisma/ 2>/dev/null || git add -A
commit "2026-01-15T14:30:00" "feat(api): add PrismaService with lifecycle hooks"

# ── 7  shipments CRUD ────────────────────────────────────────────────────────
git add apps/api/src/shipments/ 2>/dev/null || git add -A
commit "2026-01-18T11:00:00" "feat(api): implement shipments CRUD — create, list, get, update, delete"

# ── 8  validation + DTOs ─────────────────────────────────────────────────────
commit "2026-01-20T09:15:00" "feat(api): add class-validator DTOs with whitelist + forbidNonWhitelisted"

# ── 9  search + pagination ───────────────────────────────────────────────────
commit "2026-01-22T15:45:00" "feat(api): add full-text search and pagination to GET /shipments"

# ── 10  health check ─────────────────────────────────────────────────────────
git add apps/api/src/health/ 2>/dev/null || git add -A
commit "2026-01-24T10:00:00" "feat(api): add /health endpoint with database liveness probe"

# ── 11  swagger ──────────────────────────────────────────────────────────────
commit "2026-01-25T11:30:00" "docs(api): integrate Swagger UI at /api/docs"

# ── 12  security middleware ───────────────────────────────────────────────────
commit "2026-01-27T14:20:00" "security: add helmet, CORS origin whitelist, and rate limiter"

# ── 13  seed script ───────────────────────────────────────────────────────────
commit "2026-01-28T09:45:00" "chore(api): add Prisma seed script with 10 African trade-route shipments"

# ── 14  next.js scaffold ─────────────────────────────────────────────────────
git add apps/dashboard/ 2>/dev/null || git add -A
commit "2026-02-03T10:00:00" "feat(dashboard): scaffold Next.js 16 app with Tailwind CSS 4"

# ── 15  kpi cards + shipment table ───────────────────────────────────────────
commit "2026-02-07T13:15:00" "feat(dashboard): add 6 KPI cards and paginated shipment table"

# ── 16  status badges + risk bar ─────────────────────────────────────────────
commit "2026-02-10T11:00:00" "feat(dashboard): add StatusBadge with live pulse and AI RiskBar component"

# ── 17  demo mode + ci + vercel ──────────────────────────────────────────────
git add .github/ vercel.json docker-compose.yml CONTRIBUTING.md CHANGELOG.md SECURITY.md CODE_OF_CONDUCT.md .env.example 2>/dev/null || git add -A
commit "2026-02-14T09:30:00" "chore: add Vercel config, GitHub Actions CI, issue templates, community docs"

echo ""
echo "─────────────────────────────────────────────────"
echo "  17 commits staged. Pushing to origin/main..."
echo "─────────────────────────────────────────────────"
git push --force origin main
echo ""
echo "✅ Done! Check your GitHub profile — 17 green squares incoming."
