import { createContext, useContext } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { CartItem, Product, WishlistItem } from "~/types";

import useCart from "./use-cart";
import useWishlist from "./use-wishlist";

interface IAppContext {
  wishlistQuery: UseQueryResult<WishlistItem[]>;
  checkIsProductInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeWishlist: (productId: number) => void;
  cartQuery: UseQueryResult<CartItem[]>;
  checkIsProductInCart: (productId: number, sizeId: number) => boolean;
  addToCart: (product: Product, quantity: number, sizeIdx: number) => void;
  updateCartItemQuantity: (
    productId: number,
    sizeId: number,
    quantity: number,
  ) => void;
  removeCart: (productId: number, sizeId: number) => void;
}

const AppContext = createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    wishlistQuery,
    checkIsProductInWishlist,
    toggleWishlist,
    removeWishlist,
  } = useWishlist();

  const {
    cartQuery,
    checkIsProductInCart,
    addToCart,
    updateCartItemQuantity,
    removeCart,
  } = useCart();

  return (
    <AppContext.Provider
      value={{
        wishlistQuery,
        checkIsProductInWishlist,
        toggleWishlist,
        removeWishlist,
        cartQuery,
        checkIsProductInCart,
        addToCart,
        updateCartItemQuantity,
        removeCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export default AppProvider;
