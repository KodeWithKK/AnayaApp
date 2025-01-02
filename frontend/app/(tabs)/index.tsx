import { memo } from "react";
import { FlatList, Image, ImageBackground, SectionList } from "react-native";

import { Text, View } from "~/components/core";
import { HeartOutlineIcon } from "~/lib/icons";

import { bestSellers, expertChoices, newArrivals } from "~/data";

const sectionListData = [
  {
    title: "New Arrivals",
    data: newArrivals.slice(0, 4),
  },
  {
    title: "Best Sellers",
    data: bestSellers.slice(0, 4),
  },
  {
    title: "Expert Choices",
    data: expertChoices.slice(0, 4),
  },
];

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-background px-4">
      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="gap-2">
            <View className="mt-4 flex-row justify-between rounded-xl bg-primary px-4 py-4">
              <View className="w-[55%]">
                <Text className="font-bold text-2xl text-primary-foreground">
                  Get 20% Off for all Items.
                </Text>
                <Text className="mt-5 text-muted">Promo until 20 Feb 2025</Text>
              </View>
              <Image
                source={{
                  uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwe4bf267c/images/hi-res/510122FAAAA00_1.jpg?sw=640&sh=640",
                }}
                className="h-[96px] w-[96px] rounded-xl"
              />
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title, data } }) => (
          <View className="mt-5">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">{title}</Text>
              <Text className="font-semibold text-primary">See all</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="justify-between gap-3"
              renderItem={({ item }) => (
                <View className="mb-3 flex-1">
                  <ImageBackground
                    source={{
                      uri: item.images[Math.floor(item.images.length / 2)],
                    }}
                    className="aspect-square w-full overflow-hidden rounded-lg border border-border/50"
                    resizeMode="cover"
                  >
                    <View className="ml-auto mr-1.5 mt-1.5 rounded-full bg-white p-1">
                      <HeartOutlineIcon className="h-6 text-primary" />
                    </View>
                  </ImageBackground>
                  <Text className="my-1 text-left">{item.name}</Text>
                  <Text className="font-semibold">{item.price}</Text>
                </View>
              )}
            />
          </View>
        )}
        renderItem={() => null}
        ListFooterComponent={() => (
          <View className="mt-5">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">Connect with us</Text>
            </View>
            <View>
              <Text>Whatsapp</Text>
              <Text>Book an appointment</Text>
              <Text>Shedule a video call</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const PureHomeScreen = memo(HomeScreen);
export default PureHomeScreen;
