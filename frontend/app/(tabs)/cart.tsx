import { Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { Button, Text, View } from "~/components/core";
import { sectionListData } from "~/lib/constants/home-data";
import { XIcon } from "~/lib/icons";

const products = sectionListData[1]["data"];

const Cart: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ScrollView className="px-4 pt-3">
        <Text className="text-muted-foreground">4 items in cart</Text>

        <View className="mb-[92px] mt-5 gap-3">
          {products.map((p) => (
            <Pressable
              key={`wishlist-${p.id}`}
              className="flex-row rounded-lg border border-border/60"
              onPress={() => router.push(`/product/${p.id}`)}
            >
              <Image
                source={{ uri: p.images[0] }}
                className="aspect-square w-[100px] rounded-l-lg"
              />
              <View className="flex-1 justify-between gap-1 p-3">
                <View className="flex-row justify-between gap-2">
                  <Text className="flex-1">{p.name}</Text>
                  <XIcon className="h-5 text-muted-foreground" />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold text-primary">{p.price}</Text>
                  <View className="flex-row items-center gap-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 rounded-full p-0"
                    >
                      <Text className="text-xl text-foreground">-</Text>
                    </Button>
                    <Text>1</Text>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 rounded-full p-0"
                    >
                      <Text className="text-xl text-foreground">+</Text>
                    </Button>
                  </View>
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
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
