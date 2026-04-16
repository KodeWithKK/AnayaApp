import { type FC, type PropsWithChildren } from "react";
import { View } from "react-native";
import { Dialog } from "heroui-native";

import { AppText } from "../../app-text";

export const DialogHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <AppText className="text-muted text-lg font-semibold">{children}</AppText>
      <Dialog.Close variant="ghost" className="-mr-2" />
    </View>
  );
};
