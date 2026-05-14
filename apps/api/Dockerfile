FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx tsc --outDir dist --rootDir src --module commonjs --target ES2021 \
    --experimentalDecorators --emitDecoratorMetadata \
    --esModuleInterop --skipLibCheck src/main.ts
RUN find dist -name "*.js" | head -20
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
