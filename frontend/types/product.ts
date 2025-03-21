interface Measurement {
  name: string;
  unit: string;
  value: string;
}

interface Size {
  id: number;
  label: string;
  available: boolean;
  mrp: number;
  discountPercentage: number;
  measurements: Measurement[];
}

interface Media {
  id: number;
  type: string;
  url: string;
}

interface Brand {
  name: string;
}

interface Analytic {
  category: string;
  articleType: string;
  gender: "men" | "women" | "unisex";
}

export interface Product {
  id: number;
  name: string;
  manufacturer: string | null;
  countryOfOrigin: string | null;
  baseColour: string | null;
  brandId: number;
  description: string | null;
  materialAndCare: string | null;
  specifications: Record<string, string>;
  brand: Brand;
  analytic: Analytic;
  sizes: Size[];
  medias: Media[];
  createdAt: string;
  updatedAt: string;
}
