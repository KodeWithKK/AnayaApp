import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import { connectDb } from "@repo/db";
import * as schema from "@repo/db";

import { envConfig } from "@/config/env.config";
import type { MailService } from "./modules/mail/mail.service";

let mailServiceInstance: MailService | null = null;

export const setMailService = (ms: MailService) => {
  mailServiceInstance = ms;
};

export const auth = betterAuth({
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
      if (mailServiceInstance) {
        await mailServiceInstance.sendResetPasswordEmail(
          user.email,
          user.name,
          url,
        );
      }
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: envConfig.googleClientId,
      clientSecret: envConfig.googleClientSecret,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        if (mailServiceInstance) {
          await mailServiceInstance.sendOTPEmail(email, "Anaya Member", otp);
        }
      },
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
    }),
    expo(),
  ],
  trustedOrigins: [
    "anaya://*",
    "exp://*",
    "http://192.168.29.43:8000",
    ...(envConfig.nodeEnv === "dev"
      ? ["exp://192.168.*.*:*/**", "http://localhost:19006"]
      : []),
  ],
});
