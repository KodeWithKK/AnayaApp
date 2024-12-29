import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "~/lib/useColorScheme";
import ContextProviders from "~/context";

import "~/global.css";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView>
      <ContextProviders>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontFamily: "Poppins-SemiBold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(home)/report-person"
            options={{
              title: "Report a Missing Person",
            }}
          />
          <Stack.Screen name="(home)/sos" options={{ title: "Raise a SOS" }} />
          <Stack.Screen
            name="(home)/founded-persons"
            options={{ title: "View Founded Persons" }}
          />
          <Stack.Screen
            name="(home)/missing-persons"
            options={{ title: "View Missing Persons" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <PortalHost />
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      </ContextProviders>
    </GestureHandlerRootView>
  );
}
