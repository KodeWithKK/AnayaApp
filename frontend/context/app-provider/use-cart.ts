import { useCallback } from "react";
import * as Crypto from "expo-crypto";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { CartItem } from "~/types";

function useCart() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () =>
      api
        .get<CartItem[]>("/cart/all", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data),
  });

  const checkIsProductInCart = useCallback(
    (productId: number, sizeId: number) => {
      const cart = cartQuery.data;
      if (!cart) return false;
      return cart?.some(
        (c) => c.product.id === productId && c.product.size.id === sizeId,
      );
    },
    [cartQuery.data],
  );

  const addToCart = useCallback(
    async (cartItemProduct: CartItem["product"], quantity: number) => {
      api.post(
        "/cart/add",
        {
          productId: cartItemProduct.id,
          sizeId: cartItemProduct.size.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      queryClient.setQueryData<CartItem[]>(["cart"], (prevCarts) => {
        if (!prevCarts) return [];

        const isInCart = prevCarts.some(
          (c) => c.product.id === cartItemProduct.id,
        );

        const newCartItem: CartItem = {
          id: Crypto.randomUUID(),
          quantity: quantity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: cartItemProduct,
        };

        if (!isInCart) {
          return [newCartItem, ...prevCarts];
        }
      });
    },
    [queryClient, getToken, cartQuery.data],
  );

  const updateCartItemQuantity = useCallback(
    async (productId: number, sizeId: number, quantity: number) => {
      api.put(
        "/cart/update",
        { productId, sizeId, quantity },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (quantity === 0) {
        queryClient.setQueryData<CartItem[]>(["cart"], (prevCarts) => {
          if (!prevCarts) return [];
          return prevCarts.filter(
            (c) =>
              !(c.product.id === productId && c.product.size.id === sizeId),
          );
        });
        return;
      }

      queryClient.setQueryData<CartItem[]>(["cart"], (prevCarts) => {
        if (!prevCarts) return [];
        return prevCarts.map((c) => {
          if (!(c.product.id === productId && c.product.size.id === sizeId))
            return c;
          return { ...c, quantity, updatedAt: new Date().toISOString() };
        });
      });
    },
    [queryClient, getToken, cartQuery.data],
  );

  const removeCart = useCallback(async (productId: number, sizeId: number) => {
    api.delete(
      "/cart/remove",
      { productId, sizeId },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );

    queryClient.setQueryData<CartItem[]>(["cart"], (prevCarts) => {
      if (!prevCarts) return [];
      return prevCarts.filter(
        (c) => !(c.product.id === productId && c.product.size.id === sizeId),
      );
    });
  }, []);

  return {
    cartQuery,
    checkIsProductInCart,
    addToCart,
    updateCartItemQuantity,
    removeCart,
  };
}

export default useCart;
