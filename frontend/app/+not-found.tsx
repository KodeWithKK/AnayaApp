import React from "react";
import { Link, Redirect, Stack, usePathname } from "expo-router";

import { Text, View } from "~/components/core";

export default function NotFoundScreen() {
  const pathname = usePathname();

  if (pathname === "/sso-callback") {
    console.log("Redirecting to authenticated home...");
    return <Redirect href="/(authenticated)/(tabs)/home" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">This screen doesn't exist.</Text>

        <Link href="/(authenticated)/(tabs)/home">
          <Text className="font-semibold text-xl text-blue-500">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
