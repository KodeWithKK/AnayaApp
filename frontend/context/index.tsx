import { Suspense } from "react";
import { ActivityIndicator, LogBox } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { NAV_THEME } from "~/lib/constants/nav-theme";
import { useColorScheme } from "~/lib/use-color-scheme";

import AppProvider from "./app-provider";
import ClerkProvider from "./clerk-provider";
import ReactQueryProvider from "./react-query-provider";
import ThemeConfigProvider from "./theme-config-provider";

LogBox.ignoreLogs([
  /Support for defaultProps will be removed/,
  "Clerk: Clerk has been loaded with development keys",
]);

function Loading() {
  const { colorScheme } = useColorScheme();
  return (
    <ActivityIndicator size="large" color={NAV_THEME[colorScheme].primary} />
  );
}

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ThemeConfigProvider>
        <Suspense fallback={<Loading />}>
          <ReactQueryProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <AppProvider>
                <Toaster />
                <PortalHost />
                {children}
              </AppProvider>
            </GestureHandlerRootView>
          </ReactQueryProvider>
        </Suspense>
      </ThemeConfigProvider>
    </ClerkProvider>
  );
};

export default ContextProviders;
