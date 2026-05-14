FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx tsc -p tsconfig.build.json --outDir dist || npx tsc -p tsconfig.json --outDir dist
RUN ls -la dist/
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js || node dist/main.js"]
