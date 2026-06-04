FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && \
    npm install @nestjs/cli @nestjs/schematics --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/tsconfig.build.json ./
COPY apps/api/nest-cli.json ./
COPY apps/api/prisma ./prisma

RUN ./node_modules/.bin/nest build || true
RUN find . -name "main.js" 2>/dev/null || echo "NO main.js found"

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main.js"]
