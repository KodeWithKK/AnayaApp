import { Request, Response } from "express";

import {
  analytics,
  analyticsInsertSchema,
  brands,
  brandsInsertSchema,
  db,
  media,
  mediaInsertSchema,
  MediaType,
  products,
  productsInsertSchema,
  sizes,
  sizesInsertSchema,
} from "@repo/db";

import productsDataset from "../data/products.json";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

interface RawProductData {
  name: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  baseColour?: string;
  brand: { name: string };
  productDetails: {
    description: string;
    materialAndCare: string;
    specification: Record<string, any>;
  };
  images: string[];
  sizes: {
    label: string;
    available: boolean;
    price?: number;
    measurements?: Record<string, any>;
  }[];
  discounts?: { percent: number }[];
  analytics: {
    gender: string;
    articleType: string;
    subCategory: string;
  };
}

const typedDataset = productsDataset as { data: RawProductData[] };

function findMrp(price: number, discountPercentage?: number) {
  const mrp = Math.trunc(price / ((100 - (discountPercentage || 0)) / 100));
  const unitDigit = mrp % 10;
  const adjustedMrp = mrp + (9 - unitDigit);
  return adjustedMrp;
}

export const loadDataset = asyncHandler(async (req: Request, res: Response) => {
  const uniqueBrands = Array.from(
    new Set(typedDataset.data.map((p) => p.brand.name)),
  );

  const requiredBrandsDataset = uniqueBrands.map((b) => ({
    name: b,
    description: "A Good Brand",
  }));

  for (const brand of requiredBrandsDataset) {
    const { success } = brandsInsertSchema.safeParse(brand);

    if (!success) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Invalid brand dateset"));
    }
  }

  const insertedBrands = await db
    .insert(brands)
    .values(requiredBrandsDataset)
    .returning();

  const structuredDataset = typedDataset.data.map((p) => ({
    productData: {
      name: p.name,
      manufacturer: p.manufacturer,
      countryOfOrigin: p.countryOfOrigin,
      baseColour: p.baseColour,
      brandId: insertedBrands.find((brand) => brand.name === p.brand.name)
        ?.id as number,
      description: p.productDetails.description,
      materialAndCare: p.productDetails.materialAndCare,
      specifications: p.productDetails.specification,
    },
    productImages: p.images.map((url) => ({
      type: "image" as MediaType,
      url: url,
    })),
    productSizes: p.sizes.map((s) => ({
      label: s.label,
      available: s.available,
      mrp: s.price ? findMrp(s.price, p.discounts?.[0]?.percent) : 2999,
      discountPercentage: p.discounts?.[0]?.percent || 0,
      measurements: s.measurements,
    })),
    productAnalytics: {
      gender: p.analytics.gender.toLowerCase(),
      articleType: p.analytics.articleType,
      category: p.analytics.subCategory,
    },
  }));

  for (const {
    productData,
    productSizes,
    productImages,
    productAnalytics,
  } of structuredDataset) {
    const { data: parsedProduct, success: isProductParseSuccess } =
      productsInsertSchema.safeParse(productData);

    if (!isProductParseSuccess) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Invalid brand dateset"));
    }

    const [insertedProduct] = await db
      .insert(products)
      .values(parsedProduct)
      .returning();

    const updatedProductSizes = productSizes.map((s) => ({
      ...s,
      productId: insertedProduct.id,
    }));

    for (const s of updatedProductSizes) {
      const { success } = sizesInsertSchema.safeParse(s);

      if (!success) {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Invalid sizes dateset"));
      }
    }

    await db.insert(sizes).values(updatedProductSizes);

    const updatedProductImages = productImages.map((i) => ({
      ...i,
      productId: insertedProduct.id,
    }));

    for (const i of updatedProductImages) {
      const { success } = mediaInsertSchema.safeParse(i);

      if (!success) {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Invalid images dateset"));
      }
    }

    await db.insert(media).values(updatedProductImages);

    const {
      data: updatedProductAnalytics,
      success: isAnalyticParseSuccess,
      error,
    } = analyticsInsertSchema.safeParse({
      ...productAnalytics,
      productId: insertedProduct.id,
    });

    if (!isAnalyticParseSuccess) {
      return res
        .status(500)
        .json(new ApiResponse(500, error, "Invalid Product Analytic dataset"));
    }

    await db.insert(analytics).values(updatedProductAnalytics);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Dataset loaded successfully."));
});

export const clearDataset = asyncHandler(
  async (req: Request, res: Response) => {
    await db.delete(brands);
    await db.delete(products);
    await db.delete(sizes);
    await db.delete(media);
    await db.delete(analytics);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Dataset cleared successfully"));
  },
);
