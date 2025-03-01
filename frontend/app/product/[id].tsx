import { memo, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text, View } from "~/components/core";
import ExpandableText from "~/components/features/expandable-text";
import ProductCarousel from "~/components/features/products-carousel";
import { api } from "~/lib/api";
import { CartSolidIcon, HeartOutlineIcon } from "~/lib/icons";
import { findDiscountedPrice } from "~/lib/price";
import { cn } from "~/lib/utils";
import { Product } from "~/types/product";

import NotFoundScreen from "../+not-found";

const ProductScreen: React.FC = memo(() => {
  const [activeSize, setActiveSize] = useState(6);
  const { id } = useLocalSearchParams() as { id: string };

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get<Product>(`/product/${id}`).then((r) => r.data),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <ScrollView className="mb-16 px-4">
        <View className="relative mt-3">
          <ProductCarousel images={product.medias.map((p) => p.url)} />
          <View className="absolute right-2.5 top-2.5 rounded-full border border-border bg-white p-2.5">
            <HeartOutlineIcon className="h-8 w-8 text-primary" />
          </View>
        </View>

        <View className="mb-5 mt-4">
          <Text className="w-[88%] font-semibold text-2xl leading-[1.6]">
            {product.name}
          </Text>
          <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-row items-baseline gap-3">
              <Text className="font-semibold text-xl text-primary">
                ₹{" "}
                {product.discountPercentage
                  ? findDiscountedPrice(product.mrp, product.discountPercentage)
                  : product.mrp}
              </Text>
              {product.mrp && (
                <Text className="font-semibold text-base text-muted-foreground line-through">
                  ₹ {product.mrp}
                </Text>
              )}
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="font-medium text-sm">⭐️ 4.8</Text>
              <Text className="font-medium text-sm text-muted-foreground">
                (124 reviews)
              </Text>
            </View>
          </View>
          <View className="mt-2">
            <Text className="mb-2 font-semibold text-lg">Size</Text>
            <View className="flex-row gap-2">
              {new Array(4).fill(0).map((_, i) => (
                <TouchableOpacity
                  key={`size-${i}`}
                  activeOpacity={0.75}
                  onPress={() => setActiveSize(i + 1 + 4)}
                  className={cn(
                    "h-14 w-14 items-center justify-center rounded-full border p-2",
                    activeSize === i + 1 + 4
                      ? "border-primary bg-primary/10"
                      : "border-border",
                  )}
                >
                  <Text>{i + 1 + 4}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mt-4">
            <Text className="mb-2 font-semibold text-lg">Description</Text>
            <ExpandableText className="text-muted-foreground">
              {product.description || ""}
            </ExpandableText>
          </View>
          {/* <View className="mt-4">
            <Text className="mb-2 font-semibold text-lg">Metal Details</Text>
            <View className="flex-row justify-start gap-1">
              <FlatList
                data={product.details.metal}
                keyExtractor={(item) => item.key}
                numColumns={2}
                columnWrapperClassName="justify-between gap-2 mb-2"
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View
                    key={item.key + item.value}
                    className="w-1/2 rounded-lg bg-muted p-3"
                  >
                    <Text className="mb-0.5 text-sm text-muted-foreground">
                      {item.key}
                    </Text>
                    <Text>{item.value}</Text>
                  </View>
                )}
              />
            </View>
          </View> */}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full border-t border-border/50 bg-white px-4 py-3">
        <TouchableOpacity
          activeOpacity={0.75}
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3.5"
        >
          <View className="-translate-y-0.5">
            <CartSolidIcon className="h-7 w-7 text-white" />
          </View>
          <Text className="text-center font-semibold text-lg text-white">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

export default ProductScreen;
