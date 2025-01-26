import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { categoryTitleMap } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import ContextProviders from "~/context";

import "~/global.css";

import { Text, View } from "~/components/core";
import { ShareIcon } from "~/lib/icons";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal`
// keeps a back button present.
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding
// before getting the color scheme.
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
            name="category/[name]"
            options={({ route }: any) => ({
              headerTitle: () => (
                <Text className="mt-0.5 font-semibold text-xl">
                  {(categoryTitleMap as any)[route.params.name]}
                </Text>
              ),
            })}
          />
          <Stack.Screen
            name="product/[id]"
            options={() => ({
              title: "Product Details",
              headerTitle: () => (
                <Text className="mt-0.5 font-semibold text-xl">
                  Product Details
                </Text>
              ),
              headerRight: () => (
                <View className="rounded-full border border-border-darker p-2 pl-1.5">
                  <ShareIcon className="h-6 w-6 text-foreground" />
                </View>
              ),
            })}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <PortalHost />
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      </ContextProviders>
    </GestureHandlerRootView>
  );
}
