interface ProductDetail {
  key: string;
  value: string;
}

interface ProductDetails {
  description: string;
  metal: ProductDetail[];
  diamond: ProductDetail[] | null;
  general: ProductDetail[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  details: ProductDetails;
}
