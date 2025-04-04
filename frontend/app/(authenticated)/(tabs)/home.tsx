import { memo } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useQueries } from "@tanstack/react-query";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Text, View } from "~/components/core";
import ProductCard from "~/components/features/product-card";
import CategoryChip from "~/components/layout/category-chip";
import ProductSkelton from "~/components/layout/product-skelton";
import { api } from "~/lib/api";
import { encodeStringToUrlSafeBase64 } from "~/lib/base64-transformers";
import { categoriesMap } from "~/lib/constants/categories-map";
import { IconNotification, IconSearch } from "~/lib/icons";
import { range } from "~/lib/range";
import { Product } from "~/types/product";

const sectionQueryList = [
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    apiUrl: "/product/all?l=4&o=0",
    seeAllApiUrl: "/product/all",
  },
  {
    title: "Topwear",
    slug: "topwear",
    apiUrl: "/product/all?l=4&category=Topwear",
    seeAllApiUrl: "/product/all?category=Topwear",
  },
  {
    title: "Bottomwear",
    slug: "bottomwear",
    apiUrl: "/product/all?l=4&category=Bottomwear",
    seeAllApiUrl: "/product/all?category=Bottomwear",
  },
];

interface SectionData {
  title: string;
  slug: string;
  seeAllApiUrl: string;
  data: Product[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

const HomeScreen: React.FC = memo(() => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sectionListData: SectionData[] = useQueries({
    queries: sectionQueryList.map((section) => ({
      queryKey: ["products", section.slug],
      queryFn: () => api.get<Product[]>(section.apiUrl),
    })),
    combine: (results) => {
      return sectionQueryList.map((section, index) => ({
        ...section,
        data: results[index].data?.data || [],
        isLoading: results[index].isLoading,
        isFetching: results[index].isFetching,
        refetch: results[index].refetch,
      }));
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Search Bar */}
      <Animated.View className="absolute left-0 right-0 top-[0px] z-[1000] bg-white">
        <View
          className="flex-1 flex-row items-center bg-primary/90 px-4"
          style={{ paddingTop: insets.top }}
        >
          <View className="py-4">
            <Text className="font-semibold text-3xl text-white">Acme</Text>
          </View>
          <View className="ml-auto flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push("../search/[query]")}
            >
              <IconSearch className="h-7 w-7 text-white" />
            </TouchableOpacity>
            <IconNotification className="h-7 w-7 text-white" />
          </View>
        </View>
      </Animated.View>

      {/* Section List */}
      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 32 + 8 }}
        ListHeaderComponent={() => (
          <View className="mb-3 mt-7 px-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">Categories</Text>
              <Pressable>
                <Text className="font-semibold text-primary">See all</Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              {categoriesMap.map((category, index) => (
                <CategoryChip
                  key={`category-chip-${index}`}
                  title={category.title}
                  Icon={category.Icon}
                />
              ))}
            </View>
          </View>
        )}
        renderSectionHeader={({
          section: { title, slug, seeAllApiUrl, data },
        }) => (
          <View className="mt-5 px-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">{title}</Text>
              <Pressable
                onPress={() =>
                  router.push(
                    `/(authenticated)/category/${title}/${encodeStringToUrlSafeBase64(seeAllApiUrl)}`,
                  )
                }
              >
                <Text className="font-semibold text-primary">See all</Text>
              </Pressable>
            </View>
            {sectionListData.some((s) => s.isLoading || s.isFetching) && (
              <FlatList
                data={range(4)}
                keyExtractor={(item) => `${title}-${item}`}
                numColumns={2}
                columnWrapperClassName="justify-between gap-3"
                scrollEnabled={false}
                nestedScrollEnabled={true}
                renderItem={() => <ProductSkelton />}
              />
            )}
            {!sectionListData.some((s) => s.isLoading || s.isFetching) && (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperClassName="justify-between gap-3"
                scrollEnabled={false}
                nestedScrollEnabled={true}
                renderItem={({ item }) => <ProductCard item={item} />}
              />
            )}
          </View>
        )}
        renderItem={() => null}
        refreshControl={
          <RefreshControl
            refreshing={sectionListData.some((s) => s.isFetching)}
            onRefresh={() => {
              sectionListData.forEach((s) => s.refetch());
            }}
            tintColor="#000" // iOS
            colors={["#000"]} // Android
            progressViewOffset={insets.top + 22}
          />
        }
      />
    </SafeAreaView>
  );
});

export default HomeScreen;
