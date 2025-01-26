import { memo } from "react";
import { FlatList, Image, Pressable, SectionList } from "react-native";
import { Href, useRouter } from "expo-router";
import { SvgProps } from "react-native-svg";

import { Text, View } from "~/components/core";
import ProductCard from "~/components/features/product-card";
import { CalenderIcon, VideoIcon, WhatsAppIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";
import { bestSellers, expertChoices, newArrivals } from "~/data";

const sectionListData = [
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    data: newArrivals.slice(0, 4),
  },
  {
    title: "Best Sellers",
    slug: "best-sellers",
    data: bestSellers.slice(0, 4),
  },
  {
    title: "Expert Choices",
    slug: "expert-choices",
    data: expertChoices.slice(0, 4),
  },
];

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-4">
      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="gap-2">
            <View className="mt-4 flex-row justify-between rounded-xl bg-primary px-4 py-4">
              <View className="w-[55%]">
                <Text className="font-bold text-2xl text-primary-foreground">
                  Get 20% Off for all Items.
                </Text>
                <Text className="mt-5 text-muted">Promo until 20 Feb 2025</Text>
              </View>
              <Image
                source={{
                  uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwe4bf267c/images/hi-res/510122FAAAA00_1.jpg?sw=640&sh=640",
                }}
                className="h-[96px] w-[96px] rounded-xl"
              />
            </View>
            <View className="mb-3 mt-5">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="font-semibold text-xl">Categories</Text>
                <Pressable
                // onPress={() => router.push(`/category/` as Href<string>)}
                >
                  <Text className="font-semibold text-primary">See all</Text>
                </Pressable>
              </View>
              <View className="flex-row gap-3">
                <CategoryChip
                  title="Ear Rings"
                  uri="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw04122f7b/images/hi-res/50D3DTSRZABA10_1.jpg?sw=640&sh=640"
                />
                <CategoryChip
                  title="Finger Rings"
                  uri="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw86fc2d04/images/hi-res/50D3I3FKBAA02_2.jpg?sw=640&sh=640"
                />
                <CategoryChip
                  title="Chains"
                  uri="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw0dcb7a77/images/hi-res/51G4B1CAGAA00_1.jpg?sw=640&sh=640"
                />
                <CategoryChip
                  title="Mangalsutra"
                  uri="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4c8415bc/images/hi-res/51D3B2YCBAACZ_2.jpg?sw=640&sh=640"
                />
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title, slug, data } }) => (
          <View className="mt-5">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-semibold text-xl">{title}</Text>
              <Pressable
                onPress={() => router.push(`/category/${slug}` as Href<string>)}
              >
                <Text className="font-semibold text-primary">See all</Text>
              </Pressable>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="justify-between gap-3"
              renderItem={({ item }) => <ProductCard item={item} />}
            />
          </View>
        )}
        renderItem={() => null}
        // ListFooterComponent={() => (
        //   <View className="mt-5">
        //     <View className="mb-3 flex-row items-center justify-between">
        //       <Text className="font-semibold text-xl">Contact Us</Text>
        //     </View>
        //     <View className="mb-3 gap-2">
        //       <ContactUsCard title="Connect on WhatsApp" Icon={WhatsAppIcon} />
        //       <ContactUsCard title="Book an Appointment" Icon={CalenderIcon} />
        //       <ContactUsCard title="Shedule a Video Call" Icon={VideoIcon} />
        //     </View>
        //   </View>
        // )}
      />
    </View>
  );
};

interface CateforyChipProps {
  title: string;
  uri: string;
}

const CategoryChip: React.FC<CateforyChipProps> = ({ title, uri }) => {
  return (
    <View className="w-[92px] items-center justify-center">
      <Image
        source={{ uri }}
        className="h-20 w-20 rounded-full border border-border"
      />
      <Text className="">{title}</Text>
    </View>
  );
};

interface ContactUsCardProps {
  title: string;
  className?: string;
  Icon: React.FC<SvgProps>;
}

const ContactUsCard: React.FC<ContactUsCardProps> = ({
  title,
  Icon,
  className,
}) => {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between rounded-xl border border-border bg-gray-50 px-4 py-4",
        className,
      )}
    >
      <Text className="font-medium text-xl text-muted-foreground">{title}</Text>
      <Icon className="h-20 w-20 text-muted-foreground" />
    </View>
  );
};

const PureHomeScreen = memo(HomeScreen);
export default PureHomeScreen;
