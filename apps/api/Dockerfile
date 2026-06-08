FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache openssl

# Copy root files for pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json .npmrc ./

# Copy package.json files
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/ 2>/dev/null || true

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api
COPY packages ./packages 2>/dev/null || true

# Generate Prisma Client + Build
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN pnpm build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

# Copy built app and necessary files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/main.js"]
