import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  port: z
    .string()
    .default("8000")
    .transform((v) => parseInt(v, 10)),
  nodeEnv: z.enum(["dev", "staging", "prod"]).default("dev"),
  databaseUrl: z.string(),
  betterAuthSecret: z.string(),
  betterAuthUrl: z.string(),
  googleClientId: z.string(),
  googleClientSecret: z.string(),
  smtpHost: z.string(),
  smtpPort: z.string().transform((v) => parseInt(v, 10)),
  smtpUser: z.string(),
  smtpPass: z.string(),
  smtpFrom: z.string(),
});

const _envConfig = envSchema.safeParse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET,
  betterAuthUrl: process.env.BETTER_AUTH_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM,
});

if (!_envConfig.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(_envConfig.error.flatten().fieldErrors, null, 2),
  );
  throw new Error("Invalid environment variables");
}

export const envConfig = _envConfig.data;
