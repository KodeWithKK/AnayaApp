import { ImageBackground, Pressable } from "react-native";
import { Href, useRouter } from "expo-router";

import { Text } from "~/components/core";
import { IconHeart, IconHeartFilled } from "~/lib/icons";
import {
  findDiscountedPrice,
  formatPrice,
  getDefaultSizeIdx,
} from "~/lib/price";
import { Product } from "~/types";
import { useAppContext } from "~/context/app-provider";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const { checkIsProductInWishlist, toggleWishlist } = useAppContext();

  const isInWishlist = checkIsProductInWishlist(item.id);
  const defaultSizeIdx = getDefaultSizeIdx(item.sizes);

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
        <Pressable
          className="ml-auto mr-1.5 mt-1.5 rounded-full border border-border/50 bg-white p-1"
          onPress={() => toggleWishlist(item)}
        >
          {!isInWishlist && <IconHeart className="h-6 w-6 text-primary" />}
          {isInWishlist && <IconHeartFilled className="h-6 w-6 text-primary" />}
        </Pressable>
      </ImageBackground>
      <Text className="my-1 text-left">{item.name}</Text>
      <Text className="font-semibold">
        {formatPrice(
          findDiscountedPrice(
            item.sizes[defaultSizeIdx].mrp,
            item.sizes[defaultSizeIdx].discountPercentage,
          ),
        )}
      </Text>
    </Pressable>
  );
};

export default ProductCard;
