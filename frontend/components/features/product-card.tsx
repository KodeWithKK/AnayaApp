import { ImageBackground, Pressable } from "react-native";
import { Href, useRouter } from "expo-router";

import { Text, View } from "~/components/core";
import { HeartOutlineIcon } from "~/lib/icons";
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
        source={{ uri: item.images[0] }}
        className="aspect-square w-full overflow-hidden rounded-lg border border-border/50"
        resizeMode="cover"
      >
        <View className="ml-auto mr-1.5 mt-1.5 rounded-full border border-border/50 bg-white p-1">
          <HeartOutlineIcon className="h-6 w-6 text-primary" />
        </View>
      </ImageBackground>
      <Text className="my-1 text-left">{item.name}</Text>
      <Text className="font-semibold">{item.price}</Text>
    </Pressable>
  );
};

export default ProductCard;
