FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && \
    npm install @nestjs/cli @nestjs/schematics --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/tsconfig.build.json ./
COPY apps/api/nest-cli.json ./
COPY apps/api/prisma ./prisma

RUN npx prisma generate && \
    ./node_modules/.bin/nest build --tsc

FROM node:20-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/main.js"]
