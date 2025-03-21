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
import { formatPrice, getDiscountedPriceForProductCard } from "~/lib/price";
import { useAppContext } from "~/context/app-provider";

const WishlistScreen: React.FC = () => {
  const router = useRouter();

  const { wishlistQuery, removeWishlist } = useAppContext();
  const { data: wishlist, isLoading, isFetching, refetch } = wishlistQuery;

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
          {wishlist?.map((w) => (
            <Pressable
              key={`wishlist-${w.id}`}
              className="flex-row rounded-lg border border-border/60"
              onPress={() => router.push(`/product/${w.product.id}`)}
            >
              <Image
                source={{ uri: w.product.coverImgUrl }}
                className="aspect-square w-[100px] rounded-l-lg"
              />
              <View className="flex-1 justify-between gap-1 p-3">
                <View className="flex-row justify-between gap-2">
                  <Text className="flex-1">{w.product.name}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="self-start"
                    onPress={() => removeWishlist(w.product.id)}
                  >
                    <XIcon className="h-5 text-muted-foreground" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold text-primary">
                    {getDiscountedPriceForProductCard(w.product.sizes)
                      ? formatPrice(
                          getDiscountedPriceForProductCard(w.product.sizes)!,
                        )
                      : "Out of Stock"}
                  </Text>
                  <Button size="sm">
                    <Text className="text-sm text-white">Add to Cart</Text>
                  </Button>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full border-t border-border/50 bg-white px-4 py-3">
        <TouchableOpacity
          activeOpacity={0.75}
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3.5"
        >
          <Text className="text-center font-semibold text-lg text-white">
            Add all to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistScreen;
