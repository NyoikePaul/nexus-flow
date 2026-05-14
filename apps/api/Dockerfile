FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx nest build && echo "BUILD OK" || echo "BUILD FAILED"
RUN find /app -name "main.js" 2>/dev/null || echo "NO main.js FOUND"
RUN ls -la /app/ && ls -la /app/dist/ 2>/dev/null || echo "NO DIST FOLDER"
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
