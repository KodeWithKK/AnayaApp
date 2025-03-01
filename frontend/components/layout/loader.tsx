import { memo, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { View } from "~/components/core";
import { LoaderIcon } from "~/lib/icons";

const Loader: React.FC = memo(() => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <View className="w-full flex-1 items-center justify-center">
      <Animated.View style={[animatedStyle]}>
        <LoaderIcon className="h-12 w-12 text-primary" />
      </Animated.View>
    </View>
  );
});

Loader.displayName = "Loader";

export default Loader;
