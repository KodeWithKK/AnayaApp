import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text } from "~/components/core";
import ProductCard from "~/components/features/product-card";

import { bestSellers, expertChoices, newArrivals } from "~/data";

const categoryDataMap = {
  "new-arrivals": newArrivals,
  "best-sellers": bestSellers,
  "expert-choices": expertChoices,
};

const CategoryScreen: React.FC = () => {
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
      renderItem={({ item }) => <ProductCard item={item} />}
    />
  );
};

export default CategoryScreen;
