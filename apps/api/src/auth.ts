import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { eq } from "drizzle-orm";

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
          const db = connectDb();
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          });
          const name = user?.name || "Anaya Member";
          await mailServiceInstance.sendOTPEmail(email, name, otp);
        }
      },
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
    }),
    expo(),
  ],
  baseURL: envConfig.betterAuthUrl,
  basePath: "/api/v1/auth",
  /*
  hooks: {
    before: async (context) => {
      console.log("[AuthHook] 🏁 Hook started");
      if (!context.request) {
        console.log("[AuthHook] ⚠️ No request in context");
        return;
      }
      const url = new URL(context.request.url);
      const isSignup = url.pathname.includes("/api/v1/auth/sign-up/email");
      const isSocial = url.pathname.includes("/api/v1/auth/sign-in/social");

      console.log("[AuthHook] 📍 Path:", url.pathname);

      if (isSignup || isSocial) {
        console.log("[AuthHook] 👤 Handling Signup/Social");
        const body = context.body as { email?: string } | undefined;
        const email = body?.email;
        if (!email) {
          console.log("[AuthHook] ⚠️ No email in body");
          return;
        }

        console.log("[AuthHook] 🔍 Checking user:", email);
        const db = connectDb();
        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email.toLowerCase()),
        });

        if (user && !user.emailVerified) {
          console.log("[AuthHook] 🗑️ Deleting unverified user:", user.id);
          await db.delete(schema.users).where(eq(schema.users.id, user.id));
        }
      }
      console.log("[AuthHook] ✅ Hook finished");
    },
  },
  */
  logger: {
    level: "debug",
  },
  trustedOrigins: [
    "anaya://*",
    "exp://*",
    envConfig.betterAuthUrl,
    "https://bpsigp5cd35izdeuljn7xzu76i0rvyfi.lambda-url.ap-south-1.on.aws",
    "http://192.168.29.43:8000",
    ...(envConfig.nodeEnv === "dev"
      ? ["exp://192.168.*.*:*/**", "http://localhost:19006"]
      : []),
  ],
});
