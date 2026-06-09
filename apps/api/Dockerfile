FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# Copy API package files
COPY apps/api/package.json ./apps/api/

# 1. Install workspace dependencies
RUN corepack enable && pnpm install --frozen-lockfile


# 2. BRUTE FORCE: Install production dependencies locally in the API folder


# Added --ignore-scripts to prevent Husky/postinstall scripts from crashing the build
# This ensures that even if pnpm linking fails, the modules are physically here.
WORKDIR /app/apps/api
RUN npm install --legacy-peer-deps

# Copy source code
COPY apps/api .

# 3. Build
RUN npx prisma generate
RUN npm run build

# ==========================================
# Production stage
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

# Copy only what we need from the builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/main.js"]
