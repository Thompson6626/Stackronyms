import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    emptyStringAsUndefined: true,
    server: {
        NODE_ENV: z.enum(["development", "production", "test"])
    },
    experimental__runtimeEnv: process.env
});