import { memo } from "react";
import { Animated, FlatList, Pressable, SectionList } from "react-native";
import { Href, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text, View } from "~/components/core";
import ProductCard from "~/components/features/product-card";
import CategoryChip from "~/components/layout/category-chip";
import SearchInput from "~/components/layout/search-input";
import useHomePageHeader from "~/hooks/use-home-page-header";
import { categoryListData, sectionListData } from "~/lib/constants/home-data";
import {
  ChevronDown,
  LocationSolidIcon,
  NotificationOutlineIcon,
} from "~/lib/icons";

const HomeScreen: React.FC = memo(() => {
  const router = useRouter();
  const {
    scrollY,
    headerHeight,
    locationOpacity,
    searchBarTranslateY,
    HEADER_MAX_HEIGHT,
  } = useHomePageHeader();

  // const { data } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => {},
  // });

  return (
    <View className="flex-1 bg-background">
      {/* Animated Header */}
      <Animated.View
        style={{ height: headerHeight }}
        className="absolute left-0 right-0 top-0 z-[1000] bg-[hsl(350_89%_60%)] px-4 pt-12"
      >
        <Animated.View style={{ opacity: locationOpacity }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-background">Location</Text>
              <View className="mt-1 flex-row gap-2">
                <LocationSolidIcon className="h-6 w-6 text-background" />
                <Text className="text-background">Prayagraj, UP</Text>
                <ChevronDown className="h-6 w-6 text-background" />
              </View>
            </View>
            <View className="rounded-lg border border-border-darker p-2">
              <NotificationOutlineIcon className="h-6 w-6 text-background" />
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View
        style={{ transform: [{ translateY: searchBarTranslateY }] }}
        className="absolute left-0 right-0 top-[110px] z-[1000] h-[62px] justify-center bg-[hsl(350_89%_60%)] px-4"
      >
        <SearchInput />
      </Animated.View>

      {/* Section List */}
      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        ListHeaderComponent={() => (
          <View className="mb-3 mt-7 px-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">Categories</Text>
              <Pressable>
                <Text className="font-semibold text-primary">See all</Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              {categoryListData.map((category, index) => (
                <CategoryChip key={`category-chip-${index}`} {...category} />
              ))}
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title, slug, data } }) => (
          <View className="mt-5 px-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">{title}</Text>
              <Pressable
                onPress={() => router.push(`/category/${slug}` as Href<string>)}
              >
                <Text className="font-semibold text-primary">See all</Text>
              </Pressable>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="justify-between gap-3"
              scrollEnabled={false}
              renderItem={({ item }) => <ProductCard item={item} />}
            />
          </View>
        )}
        renderItem={() => null}
      />
    </View>
  );
});

export default HomeScreen;
