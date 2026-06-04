FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY apps/api/package.json apps/api/package-lock.json* ./

# Install ALL deps (including devDeps needed for build)
RUN npm install --legacy-peer-deps

# Copy prisma schema and generate client
COPY apps/api/prisma ./prisma
RUN npx prisma generate

# Copy source and build
COPY apps/api/src ./src
COPY apps/api/tsconfig.json apps/api/tsconfig.build.json* ./

RUN npx tsc --project tsconfig.json

# Set runtime env
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]
