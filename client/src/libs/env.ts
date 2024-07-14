import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(32),
    BACKEND_URL: z.string().url().default("http://localhost:8000"),
  },
  client: {},
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  emptyStringAsUndefined: true,
});
