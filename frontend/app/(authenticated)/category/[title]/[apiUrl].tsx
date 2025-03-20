import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "~/components/features/product-card";
import Loader from "~/components/layout/loader";
import { api } from "~/lib/api";
import { decodeUrlSafeBase64ToNormalString } from "~/lib/base64-transformers";
import { Product } from "~/types/product";

const CategoryScreen: React.FC = () => {
  const { title, apiUrl } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["category", title, apiUrl],
    queryFn: () => {
      const parsedApiUrl = decodeUrlSafeBase64ToNormalString(apiUrl as string);
      if (!parsedApiUrl) return [];
      return api.get<Product[]>(parsedApiUrl).then((res) => res.data);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item) => `product-${item.id}`}
      numColumns={2}
      className="px-4 py-5"
      columnWrapperClassName="justify-between gap-3"
      contentContainerClassName="gap-2 pb-4"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductCard item={item} />}
    />
  );
};

export default CategoryScreen;
