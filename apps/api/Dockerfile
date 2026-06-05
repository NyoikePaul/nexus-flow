FROM node:20-alpine AS builder

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && \
    npm install @nestjs/cli @nestjs/schematics --save-dev && \
    npm install prisma@5 @prisma/client@5 --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/tsconfig.build.json ./
COPY apps/api/nest-cli.json ./
COPY apps/api/prisma ./prisma

RUN npx prisma@5 generate && \
    ./node_modules/.bin/nest build --tsc

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/main.js"]
