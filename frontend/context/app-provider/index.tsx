import { createContext, useContext } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { Product, WishlistItem } from "~/types";

import useWishlist from "./use-wishlist";

interface IAppContext {
  wishlistQuery: UseQueryResult<WishlistItem[]>;
  checkIsProductInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

const AppContext = createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { wishlistQuery, checkIsProductInWishlist, toggleWishlist } =
    useWishlist();

  return (
    <AppContext.Provider
      value={{ wishlistQuery, checkIsProductInWishlist, toggleWishlist }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export default AppProvider;
