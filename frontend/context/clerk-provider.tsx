import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import * as dotenv from "dotenv";

import { tokenCache } from "~/lib/token-cache";

dotenv.config();

interface ProviderProps {
  children: React.ReactNode;
}
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}
