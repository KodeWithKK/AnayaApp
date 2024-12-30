import { memo, useState } from "react";
import { FlatList, Image } from "react-native";

import { Button, Text, View } from "~/components/core";
import { cn } from "~/lib/utils";

import { earrings } from "~/data/earrings";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-background px-4">
      <FlatList
        data={earrings}
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
            <View className="my-4 flex-row gap-3 overflow-auto">
              <CategoryChip isActive={true}>All</CategoryChip>
              <CategoryChip>Necklace</CategoryChip>
              <CategoryChip>Rings</CategoryChip>
              <CategoryChip>Earrings</CategoryChip>
              <CategoryChip>Mangalsutra</CategoryChip>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="justify-between gap-3"
        contentContainerClassName="gap-2 pb-4"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-1">
            <Image
              source={{ uri: item.images[0] }}
              className="aspect-square w-full rounded-lg border border-border/50"
              resizeMode="cover"
            />
            <Text className="mt-2 text-left">{item.name}</Text>
            <Text className="font-semibold">{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

interface CategoryChipProps {
  children: React.ReactNode;
  isActive?: boolean;
}

function CategoryChip({ children, isActive }: CategoryChipProps) {
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className={cn(isActive && "border-0 bg-primary")}
    >
      <Text
        className={cn(
          "text-left text-foreground",
          isActive && "text-primary-foreground",
        )}
      >
        {children}
      </Text>
    </Button>
  );
}

const PureHomeScreen = memo(HomeScreen);
export default PureHomeScreen;
