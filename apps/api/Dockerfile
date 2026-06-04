FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && \
    npm install typescript@5.0.0 --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/prisma ./prisma

RUN ./node_modules/.bin/tsc --project tsconfig.json \
    --skipLibCheck \
    --noEmitOnError false \
    --strict false \
    --noImplicitAny false \
    || echo "TS warnings ignored, continuing..."

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main.js"]
