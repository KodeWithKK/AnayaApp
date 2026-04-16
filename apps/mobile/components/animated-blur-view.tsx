import { type FC } from "react";
import { BlurView, type BlurViewProps } from "expo-blur";
import Animated, {
  useAnimatedProps,
  type SharedValue,
} from "react-native-reanimated";

const RBlurView = Animated.createAnimatedComponent(BlurView);

interface Props extends BlurViewProps {
  blurIntensity: SharedValue<number>;
}

export const AnimatedBlurView: FC<Props> = ({ blurIntensity, ...props }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.get(),
    };
  });

  return <RBlurView animatedProps={animatedProps} {...props} />;
};
