FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY src ./src
RUN npx nest build
RUN ls dist/
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
