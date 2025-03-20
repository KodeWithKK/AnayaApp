import { Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";

import { Text, View } from "~/components/core";
import {
  ArrowLeft,
  IconCart,
  IconHeart,
  IconHome,
  IconHomeFilled,
  IconProfile,
  IconProfileFilled,
  IconSearch,
  IconSearchFilled,
} from "~/lib/icons";
import { useColorScheme } from "~/lib/use-color-scheme";

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerBackgroundContainerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerStyle: {
          height: 90,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          borderTopWidth: 1,
          borderColor: colors.border,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <IconHomeFilled className="h-9 w-9" color={color} />;
            return <IconHome className="h-9 w-9" color={color} />;
          },
        }}
      />
      {/* <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <IconSearchFilled className="h-9 w-9" color={color} />;
            return <IconSearch className="h-9 w-9" color={color} />;
          },
        }}
      /> */}
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerTitle: () => (
            <View className="relative flex-row items-center gap-2">
              <Pressable
                className="absolute z-10"
                onPress={() => router.back()}
              >
                <ArrowLeft className="h-8 text-foreground" />
              </Pressable>
              <Text className="w-full text-center font-semibold text-xl">
                Wishlist
              </Text>
            </View>
          ),
          tabBarIcon: () => (
            <IconHeart className="h-9 w-9 text-muted-foreground" />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerTitle: () => (
            <View className="relative flex-row items-center gap-2">
              <Pressable
                className="absolute z-10"
                onPress={() => router.back()}
              >
                <ArrowLeft className="h-8 text-foreground" />
              </Pressable>
              <Text className="w-full text-center font-semibold text-xl">
                Cart
              </Text>
            </View>
          ),
          tabBarIcon: () => (
            <IconCart className="h-9 w-9 text-muted-foreground" />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <IconProfileFilled className="h-9 w-9" color={color} />;
            return <IconProfile className="h-9 w-9" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
