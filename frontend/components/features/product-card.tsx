import { ImageBackground, Pressable } from "react-native";
import { Href, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

import { Text } from "~/components/core";
import { api } from "~/lib/api";
import { IconHeart } from "~/lib/icons";
import { findDiscountedPrice } from "~/lib/price";
import { Product } from "~/types/product";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const { getToken } = useAuth();

  const { mutate: toggleWishlist } = useMutation({
    mutationKey: ["wishlist", item.id],
    mutationFn: async () =>
      api
        .post(
          `/wishlist/toggle/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          },
        )
        .then((res) => res.data)
        .then((data) => console.log(data)),
  });

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
          onPress={() => toggleWishlist()}
        >
          <IconHeart className="h-6 w-6 text-primary" />
        </Pressable>
      </ImageBackground>
      <Text className="my-1 text-left">{item.name}</Text>
      <Text className="font-semibold">
        ₹ {findDiscountedPrice(item.mrp, item.discountPercentage || 0)}
      </Text>
    </Pressable>
  );
};

export default ProductCard;
