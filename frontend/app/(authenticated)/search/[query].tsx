import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "~/components/core";
import SearchInput from "~/components/layout/search-input";
import { ChevronDown, IconRecent, IconSearch, XIcon } from "~/lib/icons";

const SearchScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View className="border-b border-border px-4 py-2">
        <SearchInput />
      </View>
      <View className="px-4">
        {/* Recent Searches */}
        <View className="mt-6 flex-row justify-between">
          <Text className="font-semibold text-lg">Recent Searches</Text>
          <Text className="text-primary">Clear All</Text>
        </View>
        <View className="mt-2">
          <SearchItem>Men's T-Shirts</SearchItem>
          <SearchItem>Women's Dresses</SearchItem>
        </View>
        {/* Popular Category */}
        <Text className="mt-6 font-semibold text-lg">Popular Categories</Text>
        <View className="mt-4 gap-3">
          <View className="flex-row gap-3">
            <PopularCategoryItem>Men's Wear</PopularCategoryItem>
            <PopularCategoryItem>Women's Wear</PopularCategoryItem>
          </View>
          <View className="flex-row gap-3">
            <PopularCategoryItem>Kids' Wear</PopularCategoryItem>
            <PopularCategoryItem>Accessories</PopularCategoryItem>
          </View>
        </View>
        {/* Trending Searches */}
        <Text className="mt-6 font-semibold text-lg">Trending Searches</Text>
        <View className="mt-4 flex-row flex-wrap gap-3">
          <TredingSearchChip>Summer Collection</TredingSearchChip>
          <TredingSearchChip>Formal Shirts</TredingSearchChip>
          <TredingSearchChip>Casual Dresses</TredingSearchChip>
          <TredingSearchChip>Winter Jackets</TredingSearchChip>
          <TredingSearchChip>Sportswear</TredingSearchChip>
          <TredingSearchChip>Denim Jeans</TredingSearchChip>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SearchItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View className="flex-row items-center py-1">
      <IconRecent className="h-5 text-muted-foreground" />
      <Text className="ml-1">{children}</Text>
      <XIcon className="ml-auto h-5 text-muted-foreground" />
    </View>
  );
};

const PopularCategoryItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View className="flex-1 flex-row items-center gap-2.5 rounded-lg border border-border/60 p-3">
      <View className="rounded-lg bg-primary/10 p-2">
        <ChevronDown className="-rotate-90 text-primary" />
      </View>
      <Text>{children}</Text>
    </View>
  );
};

const TredingSearchChip: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View className="self-start rounded-full bg-muted px-4 py-2">
      <Text className="text-sm">{children}</Text>
    </View>
  );
};

export default SearchScreen;
