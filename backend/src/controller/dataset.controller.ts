import { Request, Response } from "express";

import { db } from "../config/db";
import productsDataset from "../data/products.json";
import {
  brands,
  brandsInsertSchema,
  media,
  mediaInsertSchema,
  MediaType,
  products,
  productsInsertSchema,
  sizes,
  sizesInsertSchema,
} from "../schemas/product.schema";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const loadDataset = asyncHandler(async (req: Request, res: Response) => {
  const uniqueBrands = Array.from(
    new Set(productsDataset.data.map((p) => p.brand.name)),
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
        .json(new ApiResponse(500, {}, "Invalid brand dateset"));
    }
  }

  const insertedBrands = await db
    .insert(brands)
    .values(requiredBrandsDataset)
    .returning();

  const structuredDataset = productsDataset.data.map((p) => ({
    productData: {
      name: p.name,
      mrp: p.mrp,
      manufacturer: p.manufacturer,
      countryOfOrigin: p.countryOfOrigin,
      baseColour: p.baseColour,
      brandId: insertedBrands.find((brand) => brand.name === p.brand.name)
        ?.id as number,
      discountPercentage: p.discounts?.[0]?.percent,
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
      price: s.price,
      measurements: s.measurements,
    })),
  }));

  for (const {
    productData,
    productSizes,
    productImages,
  } of structuredDataset) {
    const { data: parsedProduct, success } =
      productsInsertSchema.safeParse(productData);

    if (!success) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Invalid brand dateset"));
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
          .json(new ApiResponse(500, {}, "Invalid sizes dateset"));
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
          .json(new ApiResponse(500, {}, "Invalid images dateset"));
      }
    }

    await db.insert(media).values(updatedProductImages);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Dataset loaded successfully."));
});

export const clearDataset = asyncHandler(
  async (req: Request, res: Response) => {
    await db.delete(brands);
    await db.delete(products);
    await db.delete(sizes);
    await db.delete(media);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Dataset cleared successfully"));
  },
);
