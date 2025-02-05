import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "~/components/core";
import SearchInput from "~/components/layout/search-input";
import { ChevronDown, RecentOutlineIcon, XIcon } from "~/lib/icons";

const SearchScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View className="px-4 py-2">
        <SearchInput inputClassname="border" />
      </View>
      <View className="px-4">
        {/* RECENT SEARCHES */}
        <View className="mt-4 flex-row justify-between">
          <Text className="text-muted-foreground">Recent Searches</Text>
          <Text className="text-primary">Clear All</Text>
        </View>
        <View className="mt-2">
          <SearchItem>Diamand Ring</SearchItem>
          <SearchItem>Gold Necklace</SearchItem>
        </View>
        {/* Popular Category */}
        <Text className="mt-6 font-medium text-lg">Popular Categories</Text>
        <View className="mt-4 gap-3">
          <View className="flex-row gap-3">
            <PopularCategoryItem>Rings</PopularCategoryItem>
            <PopularCategoryItem>Necklaces</PopularCategoryItem>
          </View>
          <View className="flex-row gap-3">
            <PopularCategoryItem>Earrings</PopularCategoryItem>
            <PopularCategoryItem>Bracelets</PopularCategoryItem>
          </View>
        </View>
        {/* Trending Searches */}
        <Text className="mt-6 font-medium text-lg">Trending Searches</Text>
        <View className="mt-4 flex-row flex-wrap gap-3">
          <TredingSearchChip>Wedding Rings</TredingSearchChip>
          <TredingSearchChip>Diamond Sets</TredingSearchChip>
          <TredingSearchChip>Gold Chains</TredingSearchChip>
          <TredingSearchChip>Pearn Necklaces</TredingSearchChip>
          <TredingSearchChip>Silver Anklets</TredingSearchChip>
          <TredingSearchChip>Engagement Rings</TredingSearchChip>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SearchItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View className="flex-row items-center py-1">
      <RecentOutlineIcon className="h-5 text-muted-foreground" />
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
