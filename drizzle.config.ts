import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './server/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.SQLITE_FILE_PATH!,
  },
});

