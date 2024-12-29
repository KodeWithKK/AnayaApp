import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Text, View } from "~/components/core";
import { XIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

import { toastMap } from "./constants";
import { ToastOptions } from "./index";

interface ToastProps {
  message: string;
  type: "success" | "info" | "warning" | "error";
  options?: ToastOptions;
  onRemove: () => void;
}

const Toast = ({ message, type, options, onRemove }: ToastProps) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(50);
  const toast = toastMap[type];
  const Icon = toast.icon;

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });

    let timeoutId = null;

    if (options?.autoRemove ?? true) {
      timeoutId = setTimeout(() => {
        translateY.value = withTiming(-50, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        opacity.value = withSpring(0, { duration: 300 });

        setTimeout(() => {
          onRemove();
        }, 300);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        return clearTimeout(timeoutId);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      opacity.value = Math.min(1 - Math.max(e.translationX / 100, 0), 1);
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        translateY.value = withSpring(-50, { duration: 300 }, () => {
          onRemove && runOnJS(onRemove)();
        });
      } else {
        translateX.value = withSpring(0);
        opacity.value = withSpring(1);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View className="rounded-xl bg-zinc-800" style={[animatedStyle]}>
        <View
          className={cn(
            "flex-row items-center gap-3 rounded-xl px-3 py-2",
            toast.toastBg,
          )}
        >
          <View className={cn("rounded-full p-1", toast.toastBg)}>
            <View className={cn("rounded-full p-1", toast.iconBg)}>
              <Icon
                className={"h-[16px] w-[16px] text-white/80"}
                strokeWidth={2.5}
              />
            </View>
          </View>

          <Text className="w-[80%] text-sm text-white">{message}</Text>

          <TouchableOpacity className="ml-auto" onPress={() => onRemove()}>
            <XIcon
              className={"h-[18px] w-[18px] text-white/80"}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Toast;
