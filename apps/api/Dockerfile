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

# Disable Husky globally so it doesn't crash the build
ENV HUSKY=0

# Build

ENV PNPM_CONFIG_APPROVE_BUILDS=true
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN npx nest build --tsc && ls dist/

# ==========================================
# Production Stage
# ==========================================
FROM node:22-alpine AS production
WORKDIR /app
RUN apk add --no-cache openssl
RUN corepack enable
# Set environment to production
ENV PNPM_CONFIG_APPROVE_BUILDS=true
ENV NODE_ENV=production
ENV PORT=4000
ENV HUSKY=0

# Copy necessary files from builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install ONLY production dependencies
COPY apps/api/package.json ./apps/api/package.json
WORKDIR /app/apps/api
ENV PNPM_CONFIG_APPROVE_BUILDS=true
RUN corepack enable && pnpm install --prod --no-frozen-lockfile

EXPOSE 4000

CMD ["node", "dist/main.js"]
