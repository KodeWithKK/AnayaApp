import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";

const HEADER_MAX_HEIGHT = 172;
const HEADER_MIN_HEIGHT = 62;
const STATUS_BAR_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function useHomePageHeader() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT + STATUS_BAR_HEIGHT],
    extrapolate: "clamp",
  });

  const locationOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [
      0,
      -HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT + STATUS_BAR_HEIGHT,
    ],
    extrapolate: "clamp",
  });

  useEffect(() => {
    setStatusBarStyle("light");
  }, []);

  return {
    scrollY,
    headerHeight,
    locationOpacity,
    searchBarTranslateY,
    HEADER_MAX_HEIGHT,
  };
}

export default useHomePageHeader;
