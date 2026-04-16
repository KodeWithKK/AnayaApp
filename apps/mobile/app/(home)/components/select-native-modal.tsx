import { View } from "react-native";
import { Label } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SelectButtonTrigger } from "../../../components/select/select-button-trigger";

export default function SelectNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="px-5 pt-24">
      <Label className="mb-1 ml-1.5" isRequired>
        State
      </Label>
      <SelectButtonTrigger contentOffset={insets.top + 10} />
    </View>
  );
}
