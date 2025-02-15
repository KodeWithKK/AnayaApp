import { Request, Response } from "express";

import { db } from "../config/db";
import productsDataset from "../data/products.json";
import {
  brands,
  brandsInsertSchema,
  products,
  productsInsertSchema,
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

  const requiredProductsDataset = productsDataset.data.map((p) => ({
    name: p.name,
    mrp: p.mrp,
    maufacturer: p.manufacturer,
    countryOfOrigin: p.countryOfOrigin,
    baseColour: p.baseColour,
    brandId: insertedBrands.find((brand) => brand.name === p.brand.name)
      ?.id as number,
    description: p.productDetails.description,
    materialAndCare: p.productDetails.materialAndCare,
    specifications: p.productDetails.specification,
  }));

  for (const product of requiredProductsDataset) {
    const { success } = productsInsertSchema.safeParse(product);
    if (!success) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Invalid brand dateset"));
    }
  }

  const insertedProducts = await db
    .insert(products)
    .values(requiredProductsDataset)
    .returning();

  return res
    .status(201)
    .json(
      new ApiResponse(201, insertedProducts, "Dataset loaded successfully."),
    );
});

export const clearDataset = asyncHandler(
  async (req: Request, res: Response) => {
    await db.delete(brands);
    await db.delete(products);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Dataset cleared successfully"));
  },
);
