import { useCallback } from "react";
import * as Crypto from "expo-crypto";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { Product, WishlistItem } from "~/types";

function useWishlist() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () =>
      api
        .get<WishlistItem[]>("/wishlist/all", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data),
  });

  const checkIsProductInWishlist = useCallback(
    (productId: number) => {
      const wishlist = wishlistQuery.data;
      if (!wishlist) return false;
      return wishlist.some((w) => w.productDetails.id === productId);
    },
    [wishlistQuery.data],
  );

  const toggleWishlist = useCallback(
    async (product: Product) => {
      api.post(
        `/wishlist/toggle/${product.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      const prevWishlists =
        queryClient.getQueryData<WishlistItem[]>(["wishlist"]) || [];

      const isInWishlist = prevWishlists.some(
        (w) => w.productDetails.id === product.id,
      );

      const newWishlistItem: WishlistItem = {
        id: Crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productDetails: {
          id: product.id,
          name: product.name,
          mrp: product.mrp,
          discountPercentage: product.discountPercentage,
          coverImgUrl: product.medias[0].url,
        },
      };

      if (isInWishlist) {
        queryClient.setQueryData<WishlistItem[]>(
          ["wishlist"],
          prevWishlists.filter((w) => w.productDetails.id !== product.id),
        );
      } else {
        queryClient.setQueryData<WishlistItem[]>(
          ["wishlist"],
          [newWishlistItem, ...prevWishlists],
        );
      }
    },
    [queryClient, getToken, wishlistQuery.data],
  );

  console.log({ wishlist: wishlistQuery.data });

  return { wishlistQuery, checkIsProductInWishlist, toggleWishlist };
}

export default useWishlist;
