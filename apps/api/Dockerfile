FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx nest build
RUN ls -la dist/
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
