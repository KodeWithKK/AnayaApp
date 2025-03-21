import { Product } from "./product";

interface ProductDetails {
  id: number;
  name: string;
  coverImgUrl: string;
  sizes: Product["sizes"];
}

export interface WishlistItem {
  id: string;
  product: ProductDetails;
  createdAt: string;
  updatedAt: string;
}

export { Product };
