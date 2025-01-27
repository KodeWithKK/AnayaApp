import { Image } from "react-native";

import { Text, View } from "~/components/core";

interface CateforyChipProps {
  title: string;
  uri: string;
}

const CategoryChip: React.FC<CateforyChipProps> = ({ title, uri }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={{ uri }}
        className="h-20 w-20 rounded-full border border-border"
      />
      <Text className="mt-1 text-sm">{title}</Text>
    </View>
  );
};

export default CategoryChip;
