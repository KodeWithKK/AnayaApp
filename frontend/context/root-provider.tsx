import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import * as SystemUI from "expo-system-ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const RootContext = createContext<null>(null);

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colorScheme, colors, setColorScheme, isDarkColorScheme } =
    useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  const [loadedFonts, error] = useFonts({
    "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "NotoSerif-Light": require("../assets/fonts/noto-serif/NotoSerif-Light.ttf"),
    "NotoSerif-Regular": require("../assets/fonts/noto-serif/NotoSerif-Regular.ttf"),
    "NotoSerif-Medium": require("../assets/fonts/noto-serif/NotoSerif-Medium.ttf"),
    "NotoSerif-SemiBold": require("../assets/fonts/noto-serif/NotoSerif-SemiBold.ttf"),
    "NotoSerif-Bold": require("../assets/fonts/noto-serif/NotoSerif-Bold.ttf"),
  });

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedFonts]);

  useEffect(() => {
    if (isColorSchemeLoaded) {
      SystemUI.setBackgroundColorAsync(colors.background);
    }
  }, [isColorSchemeLoaded, colors]);

  if (!isColorSchemeLoaded || !loadedFonts) {
    return null;
  }

  return (
    <RootContext.Provider value={null}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        {children}
      </ThemeProvider>
    </RootContext.Provider>
  );
};
export default RootProvider;
