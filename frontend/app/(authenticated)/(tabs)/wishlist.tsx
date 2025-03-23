import { useCallback } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import { Button, Text, View } from "~/components/core";
import Loader from "~/components/layout/loader";
import { XIcon } from "~/lib/icons";
import {
  findDiscountedPrice,
  formatPrice,
  getDefaultSizeIdx,
} from "~/lib/price";
import { WishlistItem } from "~/types";
import { useAppContext } from "~/context/app-provider";

const WishlistScreen: React.FC = () => {
  const { wishlistQuery, addToCart, checkIsProductInCart } = useAppContext();
  const { data: wishlist, isLoading, isFetching, refetch } = wishlistQuery;

  const isAllItemInCart = wishlist?.every((item) => {
    const sizeIdx = getDefaultSizeIdx(item.product.sizes);
    return checkIsProductInCart(
      item.product.id,
      item.product.sizes[sizeIdx].id,
    );
  });

  const handleAddAllToCart = useCallback(() => {
    if (!wishlist) return;

    wishlist.forEach((item) => {
      const sizeIdx = getDefaultSizeIdx(item.product.sizes);
      const isInCart = checkIsProductInCart(
        item.product.id,
        item.product.sizes[sizeIdx].id,
      );
      if (!isInCart) {
        const cartItemProduct = {
          id: item.product.id,
          name: item.product.name,
          coverImgUrl: item.product.coverImgUrl,
          size: item.product.sizes[sizeIdx],
        };
        addToCart(cartItemProduct, 1);
      }
    });
  }, [wishlist, addToCart, checkIsProductInCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="px-4 pt-3"
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor="#000" // iOS
            colors={["#000"]} // Android
          />
        }
      >
        <Text className="text-muted-foreground">
          {wishlist?.length || 0}{" "}
          {(wishlist?.length || 0) > 1 ? "items" : "item"} saved
        </Text>

        <View className="mb-[92px] mt-5 gap-3">
          {wishlist?.map((item) => (
            <WishlistCard key={`wishlist-${item.id}`} item={item} />
          ))}
        </View>
      </ScrollView>

      {!isAllItemInCart && (
        <View className="absolute bottom-0 w-full border-t border-border/50 bg-white px-4 py-3">
          <TouchableOpacity
            activeOpacity={0.75}
            className="flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3.5"
            onPress={handleAddAllToCart}
          >
            <Text className="text-center font-semibold text-lg text-white">
              Add all to Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

interface WishlistCardProps {
  item: WishlistItem;
}

function WishlistCard({ item }: WishlistCardProps) {
  const router = useRouter();
  const sizeIdx = getDefaultSizeIdx(item.product.sizes);
  const { removeWishlist, addToCart, checkIsProductInCart } = useAppContext();

  const isInCart = checkIsProductInCart(
    item.product.id,
    item.product.sizes[sizeIdx].id,
  );

  const handleAddToCart = useCallback(() => {
    const cartItemProduct = {
      id: item.product.id,
      name: item.product.name,
      coverImgUrl: item.product.coverImgUrl,
      size: item.product.sizes[sizeIdx],
    };
    addToCart(cartItemProduct, 1);
  }, [item, sizeIdx, addToCart]);

  return (
    <Pressable
      className="flex-row rounded-lg border border-border/60"
      onPress={() => router.push(`/product/${item.product.id}`)}
    >
      <Image
        source={{ uri: item.product.coverImgUrl }}
        className="aspect-square w-[100px] rounded-l-lg"
      />
      <View className="flex-1 justify-between gap-1 p-3">
        <View className="flex-row justify-between gap-2">
          <Text className="flex-1">{item.product.name}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            className="self-start"
            onPress={() => removeWishlist(item.product.id)}
          >
            <XIcon className="h-5 text-muted-foreground" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-primary">
            {formatPrice(
              findDiscountedPrice(
                item.product.sizes[sizeIdx].mrp,
                item.product.sizes[sizeIdx].discountPercentage,
              )!,
            )}
          </Text>

          <Button
            size="sm"
            onPress={() => {
              if (!isInCart) handleAddToCart();
              else router.push("/(authenticated)/(tabs)/cart");
            }}
          >
            <Text className="text-sm text-white">
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </Text>
          </Button>
        </View>
      </View>
    </Pressable>
  );
}

export default WishlistScreen;
