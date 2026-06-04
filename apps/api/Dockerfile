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
RUN ls dist/ 2>/dev/null && echo "dist OK" || echo "dist MISSING - build failed silently"

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main.js"]
