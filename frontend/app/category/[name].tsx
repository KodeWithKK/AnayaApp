import { FlatList, ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from "~/components/core";
import { HeartOutlineIcon } from "~/lib/icons";

import { bestSellers, expertChoices, newArrivals } from "~/data";

const categoryDataMap = {
  "new-arrivals": newArrivals,
  "best-sellers": bestSellers,
  "expert-choices": expertChoices,
};

const Category: React.FC = () => {
  const { name } = useLocalSearchParams() as {
    name: keyof typeof categoryDataMap;
  };

  return (
    <FlatList
      data={categoryDataMap[name]}
      keyExtractor={(item) => item.id}
      numColumns={2}
      className="px-4"
      columnWrapperClassName="justify-between gap-3"
      contentContainerClassName="gap-2 pb-4"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <Text className="mb-2 mt-4">
          {categoryDataMap[name].length} Products found
        </Text>
      )}
      renderItem={({ item }) => (
        <View className="flex-1">
          <ImageBackground
            source={{ uri: item.images[0] }}
            className="aspect-square w-full overflow-hidden rounded-lg border border-border/50"
            resizeMode="cover"
          >
            <View className="ml-auto mr-1.5 mt-1.5 rounded-full bg-white p-1">
              <HeartOutlineIcon className="h-6 text-primary" />
            </View>
          </ImageBackground>
          <Text className="mt-2 text-left">{item.name}</Text>
          <Text className="font-semibold">{item.price}</Text>
        </View>
      )}
    />
  );
};

export default Category;
