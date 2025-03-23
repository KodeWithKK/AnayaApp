import { useMemo } from "react";
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
import { Input } from "~/components/ui/input";
import { XIcon } from "~/lib/icons";
import { findDiscountedPrice, formatPrice } from "~/lib/price";
import { CartItem } from "~/types";
import { useAppContext } from "~/context/app-provider";

const Cart: React.FC = () => {
  const { cartQuery } = useAppContext();
  const { data: cartItems, isLoading, isFetching, refetch } = cartQuery;

  const totalPrice = useMemo(() => {
    if (!cartItems) return 0;
    return cartItems.reduce(
      (acc, cartItem) =>
        acc +
        cartItem.quantity *
          findDiscountedPrice(
            cartItem.product.size.mrp,
            cartItem.product.size.discountPercentage,
          ),
      0,
    );
  }, [cartItems]);

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
          {cartItems?.length || 0} items in cart
        </Text>

        <View className="mt-5 gap-3">
          {cartItems?.map((item) => (
            <CartCard key={`cart-item-${item.id}`} item={item} />
          ))}
        </View>
        {cartItems && cartItems.length > 0 && (
          <>
            <View className="mt-4 flex-row gap-2">
              <Input
                placeholder="Enter promo code"
                className="flex-1 rounded-md"
              />
              <Button size={"sm"} className="rounded-lg px-4">
                <Text className="text-background">Apply</Text>
              </Button>
            </View>
            <View className="mb-[92px] mt-4 gap-2">
              <Text className="font-semibold text-lg">Order Summary</Text>
              <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Subtotal</Text>
                <Text className="text-muted-foreground">
                  {formatPrice(totalPrice)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Shipping</Text>
                <View className="flex-row gap-2">
                  <Text className="text-muted-foreground line-through">
                    ₹ 80
                  </Text>
                  <Text className="text-muted-foreground">FREE</Text>
                </View>
              </View>
              {/* <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Tax</Text>
                <Text className="text-muted-foreground">₹ 43.96</Text>
              </View> */}
              <View className="flex-row justify-between">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold text-primary">
                  {formatPrice(totalPrice)}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems && cartItems.length > 0 && (
        <View className="absolute bottom-0 w-full border-t border-border/50 bg-white px-4 py-3">
          <TouchableOpacity
            activeOpacity={0.75}
            className="flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3.5"
          >
            <Text className="text-center font-semibold text-lg text-white">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

interface CartItemProps {
  item: CartItem;
}

function CartCard({ item }: CartItemProps) {
  const router = useRouter();

  const { removeCart, updateCartItemQuantity } = useAppContext();

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
            onPress={() => removeCart(item.product.id, item.product.size.id)}
          >
            <XIcon className="h-5 text-muted-foreground" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-primary">
            {formatPrice(
              findDiscountedPrice(
                item.product.size.mrp,
                item.product.size.discountPercentage,
              ),
            )}
          </Text>
          <View className="flex-row items-center gap-4">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 rounded-full p-0"
              onPress={() =>
                updateCartItemQuantity(
                  item.product.id,
                  item.product.size.id,
                  item.quantity - 1,
                )
              }
            >
              <Text className="text-xl text-foreground">-</Text>
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 rounded-full p-0"
              onPress={() =>
                updateCartItemQuantity(
                  item.product.id,
                  item.product.size.id,
                  item.quantity + 1,
                )
              }
            >
              <Text className="text-xl text-foreground">+</Text>
            </Button>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default Cart;
