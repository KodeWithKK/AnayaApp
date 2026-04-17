import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { connectDb } from "@repo/db";
import * as schema from "@repo/db";

import { envConfig } from "@/config/env.config";
import { MailService } from "./modules/mail/mail.service";

export const createAuth = (mailService: MailService) => {
  return betterAuth({
    database: drizzleAdapter(connectDb(), {
      provider: "pg",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      async sendResetPassword({ user, url }) {
        await mailService.sendResetPasswordEmail(user.email, user.name, url);
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      async sendVerificationEmail({ user, url }) {
        await mailService.sendVerificationEmail(user.email, user.name, url);
      },
    },
    socialProviders: {
      google: {
        clientId: envConfig.googleClientId,
        clientSecret: envConfig.googleClientSecret,
      },
    },
    plugins: [expo()],
    trustedOrigins: [
      "anaya://*",
      "exp://*",
      ...(envConfig.nodeEnv === "dev"
        ? ["exp://192.168.*.*:*/**", "http://localhost:19006"]
        : []),
    ],
  });
};
