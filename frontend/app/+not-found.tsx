import React from "react";
import { Link, Stack } from "expo-router";

import { Text, View } from "~/components/core";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">This screen doesn't exist.</Text>

        <Link href={"/"}>
          <Text className="font-semibold text-xl text-primary">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
