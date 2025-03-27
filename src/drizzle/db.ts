// File: drizzle.server.ts

import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';
import { env } from "@/data/env/server";
import * as schema from './schema';

const connectionString =
    env.NODE_ENV === 'production' ? env.NEON_DATABASE_URL : env.LOCAL_DATABASE_URL;

if (env.NODE_ENV === 'production') {
    neonConfig.webSocketConstructor = WebSocket;
    neonConfig.poolQueryViaFetch = true;
} else { // Development
    neonConfig.wsProxy = (host) => `${host}:5433/v1`;
    neonConfig.useSecureWebSocket = false;
    neonConfig.pipelineTLS = false;
    neonConfig.pipelineConnect = false;
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool,{schema});