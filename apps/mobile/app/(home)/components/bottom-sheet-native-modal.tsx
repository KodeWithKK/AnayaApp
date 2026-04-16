import { View } from "react-native";

import { BasicBottomSheetContent } from "../../../components/bottom-sheet/basic";

export default function BottomSheetNativeModalScreen() {
  return (
    <View className="px-5 pt-24">
      <View className="mt-8">
        <BasicBottomSheetContent />
      </View>
    </View>
  );
}
