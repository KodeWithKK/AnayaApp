import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000",
  basePath: "/api/v1/auth",
  plugins: [
    expoClient({
      scheme: Linking.parse(Linking.createURL("/")).scheme ?? "anaya",
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});
