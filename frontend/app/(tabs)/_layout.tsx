import { Tabs } from "expo-router";

import { ThemeToggle } from "~/components/features/ThemeToggle";
import { BrandIcon, HomeIcon, SettingIcon } from "~/lib/icons";
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
          title: "Acme",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: "Poppins-Medium",
          },
          tabBarIcon: ({ color }) => (
            <HomeIcon className="h-9 w-9" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerTitle: "Settings",
          tabBarIcon: ({ color }) => (
            <SettingIcon className="h-9 w-9" color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
