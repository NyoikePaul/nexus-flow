FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/tsconfig.build.json ./
COPY apps/api/nest-cli.json ./
COPY apps/api/prisma ./prisma

RUN npm run build || true
RUN find . -name "main.js" 2>/dev/null || echo "NO main.js found anywhere"

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main.js"]
