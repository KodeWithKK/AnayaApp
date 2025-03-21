export * from "./product";

interface ProductDetails {
  id: number;
  name: string;
  mrp: number;
  discountPercentage: number | null;
  coverImgUrl: string;
}

export interface WishlistItem {
  id: string;
  productDetails: ProductDetails;
  createdAt: string;
  updatedAt: string;
}
