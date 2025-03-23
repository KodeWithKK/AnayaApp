import { memo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text, View } from "~/components/core";
import HTMLViewer from "~/components/core/html-viewer";
import ProductCarousel from "~/components/features/products-carousel";
import Loader from "~/components/layout/loader";
import { api } from "~/lib/api";
import { IconCartFilled, IconHeart, IconHeartFilled } from "~/lib/icons";
import { findDiscountedPrice, formatPrice } from "~/lib/price";
import { cn } from "~/lib/utils";
import { Product } from "~/types/product";
import NotFoundScreen from "~/app/+not-found";
import { useAppContext } from "~/context/app-provider";

const ProductScreen: React.FC = memo(() => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const [activeSizeIdx, setActiveSizeIdx] = useState<number>(0);
  const [showFullSpecification, setShowSpecification] = useState(false);

  const {
    checkIsProductInWishlist,
    toggleWishlist,
    checkIsProductInCart,
    addToCart,
  } = useAppContext();

  const {
    data: product,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      api.get<Product>(`/product/${id}`).then((r) => {
        const mediumSizeIdx = r.data.sizes.findIndex((s) => s.label === "M");
        if (mediumSizeIdx != -1) setActiveSizeIdx(mediumSizeIdx);
        return r.data;
      }),
  });

  const parsedProductId = parseInt(id);

  const isInWishlist =
    !isNaN(parsedProductId) && checkIsProductInWishlist(parsedProductId);

  const isInCart =
    !isNaN(parsedProductId) &&
    product &&
    checkIsProductInCart(parsedProductId, product.sizes[activeSizeIdx].id);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <ScrollView
        className="mb-16 px-4"
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor="#000" // iOS
            colors={["#000"]} // Android
            progressViewOffset={0}
          />
        }
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="relative mt-3">
          <ProductCarousel images={product.medias.map((p) => p.url)} />
          <Pressable
            className="absolute right-2.5 top-2.5 rounded-full border border-border bg-white p-2.5"
            onPress={() => toggleWishlist(product)}
          >
            {!isInWishlist && <IconHeart className="h-8 w-8 text-primary" />}
            {isInWishlist && (
              <IconHeartFilled className="h-8 w-8 text-primary" />
            )}
          </Pressable>
        </View>

        <View className="mb-5 mt-4">
          <Text className="w-[88%] font-semibold text-2xl leading-[1.6]">
            {product.name}
          </Text>
          <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-row items-baseline gap-3">
              {product.sizes.length > 0 && (
                <>
                  <Text className="font-semibold text-xl text-primary">
                    {formatPrice(
                      findDiscountedPrice(
                        product.sizes[activeSizeIdx].mrp,
                        product.sizes[activeSizeIdx].discountPercentage,
                      ),
                    )}
                  </Text>
                  {product.sizes[activeSizeIdx].discountPercentage && (
                    <Text className="font-semibold text-base text-muted-foreground line-through">
                      {formatPrice(product.sizes[activeSizeIdx].mrp)}
                    </Text>
                  )}
                </>
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
              {product.sizes.map((size, i) => (
                <TouchableOpacity
                  key={`size-${i}`}
                  activeOpacity={0.75}
                  onPress={() => setActiveSizeIdx(i)}
                  className={cn(
                    "h-14 w-14 items-center justify-center rounded-full border p-2",
                    activeSizeIdx === i
                      ? "border-primary bg-primary/10"
                      : "border-border",
                  )}
                >
                  <Text>{size.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mt-4">
            <Text className="mb-2 font-semibold text-lg">Description</Text>
            <HTMLViewer source={{ html: product.description || "" }} />
          </View>
          <View className="mt-4">
            <Text className="mb-2 font-semibold text-lg">
              Material and Care
            </Text>
            <HTMLViewer source={{ html: product.materialAndCare || "" }} />
          </View>
          <View className="mt-4">
            <View className="mb-2 flex-row justify-between">
              <Text className="font-semibold text-lg">Specifications</Text>
              <TouchableOpacity
                onPress={() => setShowSpecification((prev) => !prev)}
                activeOpacity={0.6}
              >
                <Text className="font-bold text-muted-foreground">
                  {showFullSpecification ? "Show less" : "See all"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start gap-1">
              <FlatList
                data={Object.entries(product.specifications).slice(
                  0,
                  showFullSpecification ? undefined : 6,
                )}
                keyExtractor={(item) => `specification-${item[0]}`}
                numColumns={2}
                columnWrapperClassName="justify-between gap-2 mb-2"
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View
                    key={item[0] + item[1]}
                    className="w-1/2 rounded-lg bg-muted p-3"
                  >
                    <Text className="mb-0.5 text-sm text-muted-foreground">
                      {item[0]}
                    </Text>
                    <Text>{item[1] || "NA"}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full border-t border-border/50 bg-white px-4 py-3">
        <TouchableOpacity
          activeOpacity={0.75}
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3.5"
          onPress={() => {
            if (!isInCart) {
              addToCart(product, 1, activeSizeIdx);
            } else {
              router.push("/(authenticated)/(tabs)/cart");
            }
          }}
        >
          <View className="-translate-y-0.5">
            <IconCartFilled className="h-7 w-7 text-white" />
          </View>
          <Text className="text-center font-semibold text-lg text-white">
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

export default ProductScreen;
