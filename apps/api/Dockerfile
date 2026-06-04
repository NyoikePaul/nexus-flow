FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && npm install typescript ts-node --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "--require", "ts-node/register", "src/main.ts"]
