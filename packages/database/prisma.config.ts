import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  datasource: {
    // This allows the CLI (db push) to find your database
    url: process.env.DATABASE_URL,
  },
});
