# ==========================================
# Builder Stage
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (including devDependencies for the build)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/

# Enable corepack and install everything
RUN corepack enable && pnpm install --no-frozen-lockfile

# Copy source code
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
ENV PNPM_CONFIG_APPROVE_BUILDS=true

# Copy root workspace files so pnpm resolves onlyBuiltDependencies
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml

# Copy api package.json and install prod deps
COPY apps/api/package.json ./package.json
RUN corepack enable && pnpm install --prod --no-frozen-lockfile

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/main.js"]
