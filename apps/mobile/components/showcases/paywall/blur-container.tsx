import { type FC, type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { cn } from "heroui-native";

type Props = {
  className?: string;
};

export const BlurContainer: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <View className={cn("h-20 overflow-hidden rounded-full", className)}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="systemThinMaterialDark"
        intensity={100}
      />
      {children}
    </View>
  );
};
