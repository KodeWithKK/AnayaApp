import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

import { Button, Text, View } from "~/components/core";
import Loader from "~/components/layout/loader";
import { api } from "~/lib/api";
import { XIcon } from "~/lib/icons";
import { findDiscountedPrice, formatPrice } from "~/lib/price";
import { Product } from "~/types/product";

const wishlist: React.FC = () => {
  const { getToken } = useAuth();
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () =>
      api.get<Product[]>("/product/all?l=4&o=1").then((res) => res.data),
  });

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
        <Text className="text-muted-foreground">4 items saved</Text>

        <View className="mb-[92px] mt-5 gap-3">
          {products?.map((p) => (
            <Pressable
              key={`wishlist-${p.id}`}
              className="flex-row rounded-lg border border-border/60"
              onPress={() => router.push(`/product/${p.id}`)}
            >
              <Image
                source={{ uri: p.medias[0].url }}
                className="aspect-square w-[100px] rounded-l-lg"
              />
              <View className="flex-1 justify-between gap-1 p-3">
                <View className="flex-row justify-between gap-2">
                  <Text className="flex-1">{p.name}</Text>
                  <XIcon className="h-5 text-muted-foreground" />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold text-primary">
                    {formatPrice(
                      findDiscountedPrice(p.mrp, p.discountPercentage || 0),
                    )}
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
          onPress={async () => {
            api
              .get("/wishlist/all", {
                headers: {
                  Authorization: `Bearer ${await getToken()}`,
                },
              })
              .then((res) => res.data)
              .then((data) => console.log(data));
          }}
        >
          <Text className="text-center font-semibold text-lg text-white">
            Add all to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default wishlist;
