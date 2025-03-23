import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  SplashScreen,
  Stack,
  useNavigationContainerRef,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";

import { View } from "~/components/core";
import { useColorScheme } from "~/lib/use-color-scheme";
import RootProvider from "~/context";

import "~/global.css";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true, // Only in native builds, not in Expo Go.
});

Sentry.init({
  dsn: "https://0c7faf3b446a6801a9048a83ec62f984@o4508993843429376.ingest.de.sentry.io/4508993853325392",
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0, // Adjust this value in production
  _experiments: {
    profilesSampleRate: 1.0, // Only during debugging, change to lower value in production
    replaysSessionSampleRate: 1.0, // Only during debugging, change to lower value in production
    replaysOnErrorSampleRate: 1.0,
  },
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: false,
      maskAllVectors: false,
    }),
    Sentry.spotlightIntegration(),
    navigationIntegration,
  ],
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading keeps a back button present.
export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding
// before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const router = useRouter();
  const { colors } = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!isSignedIn && pathname !== "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (!isLoaded) return;
    if (["/home", "/profile"].includes(pathname)) setStatusBarStyle("light");
    else setStatusBarStyle("dark");
  }, [isLoaded, pathname]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Poppins-SemiBold",
          fontSize: 18,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootNavLayout() {
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <RootProvider>
      <InitialLayout />
    </RootProvider>
  );
}

export default Sentry.wrap(RootNavLayout);
