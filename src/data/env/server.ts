import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    emptyStringAsUndefined: true,
    server: {
        NEON_DATABASE_URL: z.string().url(),
        LOCAL_DATABASE_URL: z.string().url(),
        NODE_ENV: z.enum(["development", "production", "test"])
    },
    experimental__runtimeEnv: process.env
});