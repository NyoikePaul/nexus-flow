FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./

RUN npx tsc --project tsconfig.json

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]
