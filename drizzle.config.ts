import { env } from '@/data/env/server';
import { defineConfig } from "drizzle-kit";

const url = env.NODE_ENV === 'production' ? env.NEON_DATABASE_URL: env.LOCAL_DATABASE_URL;

if (!url)
    throw new Error(
        `Connection string to ${process.env.NODE_ENV ? 'Neon' : 'local'} Postgres not found.`
    );

export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    strict: true,
    verbose: true,
    dbCredentials: {
        url
    }
});