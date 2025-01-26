import { useMemo, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from "~/components/core";
import ExpandableText from "~/components/features/expandable-text";
import ProductCarousel from "~/components/features/products-carousel";
import { HeartOutlineIcon } from "~/lib/icons";
import { Product } from "~/types/product";
import * as productsData from "~/data";

import NotFoundScreen from "../+not-found";

const ProductScreen: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string };

  const product: Product | null = useMemo(() => {
    for (const products of Object.values(productsData)) {
      const existingProduct = products.find((p) => p.id == id);
      if (existingProduct) return existingProduct;
    }
    return null;
  }, []);

  const listedPrice = useMemo(() => {
    if (!product) return null;
    const currPrice = parseInt(product.price.replace(/\D/g, ""));
    return `₹${Math.trunc(currPrice * 1.11).toLocaleString("en-IN")}`;
  }, []);

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <ScrollView className="px-4">
      <View className="relative mt-5">
        <ProductCarousel images={product.images} />
        <View className="absolute right-2.5 top-2.5 rounded-full border border-border bg-white p-2.5">
          <HeartOutlineIcon className="h-8 w-8 text-primary" />
        </View>
      </View>

      <View className="mb-5 mt-14">
        <Text className="w-[88%] font-semibold text-2xl leading-[1.6]">
          {product.name}
        </Text>
        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-baseline gap-3">
            <Text className="font-semibold text-xl text-primary">
              {product.price.replace(/ /g, ",")}
            </Text>
            <Text className="font-semibold text-base text-muted-foreground line-through">
              {listedPrice}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="font-medium text-sm">⭐️ 4.8</Text>
            <Text className="font-medium text-sm text-muted-foreground">
              (124 reviews)
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="mb-2 font-semibold text-lg">Description</Text>
          <ExpandableText className="text-muted-foreground">
            {product.details.description}
          </ExpandableText>
        </View>
        <View className="mt-4">
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
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
