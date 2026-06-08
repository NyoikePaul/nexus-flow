FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json .npmrc ./

# Copy API package files
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api

# Build
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/main.js"]
