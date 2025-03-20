import { Stack } from "expo-router";

import { Text, View } from "~/components/core";
import { IconShare } from "~/lib/icons";

const Layout = () => {
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="category/[title]/[apiUrl]"
        options={({ route }: any) => ({
          headerTitle: () => (
            <Text className="mt-0.5 font-semibold text-xl">
              {route.params.title}
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
            <View className="border-border-darker rounded-full border p-2 pl-1.5">
              <IconShare className="h-6 w-6 text-foreground" />
            </View>
          ),
        })}
      />
    </Stack>
  );
};
export default Layout;
