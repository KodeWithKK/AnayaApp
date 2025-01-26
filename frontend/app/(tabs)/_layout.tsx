import { Tabs } from "expo-router";

import { View } from "~/components/core";
import { ThemeToggle } from "~/components/features/theme-toggle";
import {
  CartOutlineIcon,
  CartSolidIcon,
  HeartOutlineIcon,
  HeartSolidIcon,
  HomeOutlineIcon,
  HomeSolidIcon,
  NotificationOutlineIcon,
  ProfileOutlineIcon,
  ProfileSolidIcon,
  SearchOutlineIcon,
  SearchSolidIcon,
} from "~/lib/icons";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabLayout() {
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
          headerTitle: "Anaya",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: "Poppins-Medium",
          },
          headerRight: () => (
            <View className="mr-4 flex-row gap-3">
              <View className="rounded-full border border-border-darker p-2">
                <SearchOutlineIcon className="h-6 w-6 text-foreground" />
              </View>
              <View className="rounded-full border border-border-darker p-2">
                <NotificationOutlineIcon className="h-6 w-6 text-foreground" />
              </View>
            </View>
          ),
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
          headerTitle: "Search",
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
          headerTitle: "Wishlist",
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <HeartSolidIcon className="h-9 w-9" color={color} />;
            return <HeartOutlineIcon className="h-9 w-9" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerTitle: "Cart",
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <CartSolidIcon className="h-9 w-9" color={color} />;
            return <CartOutlineIcon className="h-9 w-9" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          tabBarIcon: ({ color, focused }) => {
            if (focused)
              return <ProfileSolidIcon className="h-9 w-9" color={color} />;
            return <ProfileOutlineIcon className="h-9 w-9" color={color} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
