# ==========================================
# Builder Stage
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/

RUN corepack enable && pnpm install --no-frozen-lockfile

COPY apps/api ./apps/api

ENV HUSKY=0
ENV PNPM_CONFIG_APPROVE_BUILDS=true
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN npx nest build --tsc && ls dist/

# ==========================================
# Production Stage
# ==========================================
FROM node:22-alpine AS production
WORKDIR /app/apps/api
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=4000
ENV HUSKY=0

# Copy entire workspace node_modules (includes hoisted @prisma, .prisma, @nestjs etc)
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api/node_modules ./node_modules

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/main.js"]
