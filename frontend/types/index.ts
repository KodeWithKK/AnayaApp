import { Product } from "./product";

interface WishlistProductDetails {
  id: number;
  name: string;
  coverImgUrl: string;
  sizes: Product["sizes"];
}

interface CartProductDetails extends Omit<WishlistProductDetails, "sizes"> {
  size: Product["sizes"][number];
}

export interface WishlistItem {
  id: string;
  product: WishlistProductDetails;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Omit<WishlistItem, "product"> {
  quantity: number;
  product: CartProductDetails;
}

export { Product };
