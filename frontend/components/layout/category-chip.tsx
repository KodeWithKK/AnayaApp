import { Text, View } from "~/components/core";
import { type IconFC } from "~/lib/icons";

interface CateforyChipProps {
  title: string;
  Icon: IconFC;
}

const CategoryChip: React.FC<CateforyChipProps> = ({ title, Icon }) => {
  return (
    <View className="items-center justify-center">
      <View className="h-20 w-20 items-center justify-center rounded-full border border-border bg-primary/10">
        <Icon className="h-10 w-10 text-primary" />
      </View>
      <Text className="mt-1 text-sm">{title}</Text>
    </View>
  );
};

export default CategoryChip;
