import { Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";

import { Text, View } from "~/components/core";
import {
  ArrowLeft,
  CartOutlineIcon,
  HeartOutlineIcon,
  HomeOutlineIcon,
  HomeSolidIcon,
  ProfileOutlineIcon,
  ProfileSolidIcon,
  SearchOutlineIcon,
  SearchSolidIcon,
} from "~/lib/icons";
import { useColorScheme } from "~/lib/useColorScheme";

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
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <HomeSolidIcon className="h-9 w-9" color={color} />;
            return <HomeOutlineIcon className="h-9 w-9" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <SearchSolidIcon className="h-9 w-9" color={color} />;
            return <SearchOutlineIcon className="h-9 w-9" color={color} />;
          },
        }}
      />
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
            <HeartOutlineIcon className="h-9 w-9 text-muted-foreground" />
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
            <CartOutlineIcon className="h-9 w-9 text-muted-foreground" />
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
              return <ProfileSolidIcon className="h-9 w-9" color={color} />;
            return <ProfileOutlineIcon className="h-9 w-9" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
