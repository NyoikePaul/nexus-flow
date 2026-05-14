FROM node:20-alpine
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

# Copy everything
COPY . .

# Install deps
RUN npm install

# Generate prisma
RUN npx prisma generate

# Compile TypeScript manually
RUN ./node_modules/.bin/tsc \
  --module commonjs \
  --target ES2021 \
  --outDir dist \
  --experimentalDecorators \
  --emitDecoratorMetadata \
  --esModuleInterop \
  --skipLibCheck \
  --strict false \
  src/main.ts

RUN echo "=== dist contents ===" && find dist -type f | head -30

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js || node dist/main.js"]
