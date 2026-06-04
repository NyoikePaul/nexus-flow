FROM node:20-alpine

WORKDIR /app/apps/api

# Copy and install deps
COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps

# Copy full source
COPY apps/api/ ./

# Build TypeScript (skip prisma generate - done at startup)
RUN npm run build

EXPOSE 3001
ENV NODE_ENV=production

CMD ["node", "dist/main"]
