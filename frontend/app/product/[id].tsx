import { useMemo, useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from "~/components/core";
import { cn } from "~/lib/utils";

import { Product } from "~/types/product";

import * as productsData from "~/data";

import NotFoundScreen from "../+not-found";

const ProductScreen: React.FC = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const { id } = useLocalSearchParams() as { id: string };

  const product: Product | null = useMemo(() => {
    for (const products of Object.values(productsData)) {
      const existingProduct = products.find((p) => p.id == id);
      if (existingProduct) return existingProduct;
    }
    return null;
  }, []);

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <View className="px-4 py-6">
      <View className="relative mb-[30px]">
        <Image
          source={{ uri: product.images[activeImage] }}
          className="aspect-square w-full rounded-xl"
        />
        <View className="absolute bottom-0 w-full translate-y-1/2 flex-row justify-center gap-1">
          {product.images.map((imageUri, idx) => (
            <TouchableOpacity
              onPress={() => setActiveImage(idx)}
              activeOpacity={0.75}
            >
              <Image
                key={imageUri}
                source={{ uri: imageUri }}
                className={cn(
                  "h-[60px] w-[60px] rounded-full border-2 border-white",
                  activeImage == idx && "border-primary/60",
                )}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mt-6">
        <Text className="w-[80%] font-semibold text-2xl">{product.name}</Text>
        <Text className="mt-4 text-muted-foreground">
          {product.details.description.split(" ").slice(0, 20).join(" ")}
          {"... "}
          <Text onPress={() => {}} className="text-primary">
            Read More
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ProductScreen;
