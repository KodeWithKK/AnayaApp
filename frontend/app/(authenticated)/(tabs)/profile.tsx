import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SvgProps } from "react-native-svg";

import { Text, View } from "~/components/core";
import {
  ChevronDown,
  IconClipboard,
  IconHome,
  IconLogout,
  IconPayment,
  IconProfile,
  IconSetting,
} from "~/lib/icons";
import { cn } from "~/lib/utils";

export default function SettingScreen() {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <View className="bg-primary px-4 pb-16 pt-14">
        <View className="flex-row items-center gap-4">
          <View className="rounded-full bg-white p-1">
            <Image
              source={{ uri: "https://avatar.iran.liara.run/public/12" }}
              className="aspect-square w-[60px] rounded-full border border-primary"
            />
          </View>
          <View>
            <Text className="font-semibold text-xl text-background">
              Krishnakant Kumar
            </Text>
            <Text className="mt-0.5 text-muted">kodewithkk@gmail.com</Text>
          </View>
        </View>
      </View>

      <View className="mx-4 -translate-y-10 flex-row rounded-lg border border-border bg-background py-3">
        <View className="flex-1">
          <Text className="text-center font-semibold text-2xl">5</Text>
          <Text className="text-center text-muted-foreground">Orders</Text>
        </View>
        <View className="flex-1 border-l border-r border-border/60">
          <Text className="text-center font-semibold text-2xl">4</Text>
          <Text className="text-center text-muted-foreground">Wishlist</Text>
        </View>
        <View className="flex-1">
          <Text className="text-center font-semibold text-2xl">2</Text>
          <Text className="text-center text-muted-foreground">Reviews</Text>
        </View>
      </View>

      <View className="-translate-y-6 px-4">
        <SettingItem label="Edit Profile" Icon={IconProfile} />
        <SettingItem label="My Orders" Icon={IconClipboard} />
        <SettingItem label="Shipping Address" Icon={IconHome} />
        <SettingItem label="Payment Methods" Icon={IconPayment} />
        <SettingItem label="Settings" Icon={IconSetting} />
        <SettingItem label="Logout" Icon={IconLogout} isADangerAction={true} />
      </View>
    </View>
  );
}

interface SettingItemProps {
  label: string;
  Icon: React.FC<SvgProps>;
  isADangerAction?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  label,
  Icon,
  isADangerAction = false,
}) => {
  return (
    <View className="flex-row items-center gap-3.5 border-b border-border/60 px-3 py-4">
      <View className="rounded-full bg-primary/10 p-2.5">
        <Icon className="h-5 w-5 text-primary" />
      </View>
      <Text className={cn("text-lg", isADangerAction && "text-destructive")}>
        {label}
      </Text>
      <ChevronDown className="ml-auto h-6 w-6 -rotate-90 text-muted-foreground" />
    </View>
  );
};
