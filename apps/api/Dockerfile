FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
RUN npx nest build
RUN ls -la dist/ || echo "dist contents above"
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
