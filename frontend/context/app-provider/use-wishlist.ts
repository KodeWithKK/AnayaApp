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
      return wishlist.some((w) => w.product.id === productId);
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

      queryClient.setQueryData<WishlistItem[]>(
        ["wishlist"],
        (prevWishlists) => {
          if (!prevWishlists) return [];

          const isInWishlist = prevWishlists.some(
            (w) => w.product.id === product.id,
          );

          const newWishlistItem: WishlistItem = {
            id: Crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            product: {
              id: product.id,
              name: product.name,
              coverImgUrl: product.medias[0].url,
              sizes: product.sizes,
            },
          };

          if (isInWishlist) {
            return prevWishlists.filter((w) => w.product.id !== product.id);
          } else {
            return [newWishlistItem, ...prevWishlists];
          }
        },
      );
    },
    [queryClient, getToken, wishlistQuery.data],
  );

  const removeWishlist = useCallback(async (productId: number) => {
    api.post(
      `/wishlist/toggle/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );

    queryClient.setQueryData<WishlistItem[]>(["wishlist"], (prevWishlists) => {
      if (!prevWishlists) return [];
      return prevWishlists.filter((w) => w.product.id !== productId);
    });
  }, []);

  return {
    wishlistQuery,
    checkIsProductInWishlist,
    toggleWishlist,
    removeWishlist,
  };
}

export default useWishlist;
