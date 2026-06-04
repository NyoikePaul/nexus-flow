FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install --legacy-peer-deps && npm install @nestjs/cli @nestjs/schematics --save-dev

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/tsconfig.build.json ./
COPY apps/api/nest-cli.json ./
COPY apps/api/prisma ./prisma

# THE FIX: Generate the Prisma client for the Alpine Linux environment
RUN npx prisma generate

# Build the application
RUN ./node_modules/.bin/nest build --tsc && ls dist/

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/main.js"]
