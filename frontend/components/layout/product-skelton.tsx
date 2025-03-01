import { memo, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { View } from "~/components/core";

const ProductSkeleton: React.FC = memo(() => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Infinite repetitions
      true, // Reverse direction
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View className="mb-3 flex-1">
      <Animated.View
        style={animatedStyle}
        className="aspect-[478/639] w-full overflow-hidden rounded-lg border border-border/50 bg-gray-200"
      />
      <Animated.View
        style={animatedStyle}
        className="my-1 h-4 w-full rounded-md bg-gray-200"
      />
      <Animated.View
        style={animatedStyle}
        className="my-1 h-4 w-2/3 rounded-md bg-gray-200"
      />
    </View>
  );
});

ProductSkeleton.displayName = "ProductSkeleton";

export default ProductSkeleton;
