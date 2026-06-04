FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json ./
COPY apps/api/package.json ./apps/api/

# Install only API dependencies using npm (no pnpm needed)
WORKDIR /app/apps/api
RUN npm install --legacy-peer-deps

# Copy source
WORKDIR /app
COPY apps/api/ ./apps/api/

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build
RUN npm run build

EXPOSE 3001
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:3001/api/v1/health/liveness || exit 1

CMD ["node", "dist/main"]
