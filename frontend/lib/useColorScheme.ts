import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { NAV_THEME } from "./constants";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  return {
    colorScheme: colorScheme ?? "dark",
    colors: NAV_THEME[colorScheme ?? "dark"],
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
