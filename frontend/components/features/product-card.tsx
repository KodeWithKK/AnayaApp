import { ImageBackground, Pressable } from "react-native";
import { Href, useRouter } from "expo-router";

import { Text, View } from "~/components/core";
import { HeartOutlineIcon } from "~/lib/icons";
import { findDiscountedPrice } from "~/lib/price";
import { Product } from "~/types/product";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/product/${item.id}` as Href)}
      className="mb-3 flex-1"
    >
      <ImageBackground
        source={{
          uri: item.medias[0].url
            .replace("($width)", "400")
            .replace("($qualityPercentage)", "90"),
        }}
        className="aspect-[478/639] w-full overflow-hidden rounded-lg border border-border/50"
        resizeMode="cover"
      >
        <View className="ml-auto mr-1.5 mt-1.5 rounded-full border border-border/50 bg-white p-1">
          <HeartOutlineIcon className="h-6 w-6 text-primary" />
        </View>
      </ImageBackground>
      <Text className="my-1 text-left">{item.name}</Text>
      <Text className="font-semibold">
        ₹ {findDiscountedPrice(item.mrp, item.discountPercentage || 0)}
      </Text>
    </Pressable>
  );
};

export default ProductCard;
