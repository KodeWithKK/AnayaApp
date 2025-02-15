import { Request, Response } from "express";

import { db } from "../config/db";
import { products, productsInsertSchema } from "../schemas/product.schema";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const { data, success } = productsInsertSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiResponse(400, "Invalid product data."));
  }

  const productData = {
    ...data,
    createdAt: new Date(),
  };
  const [insertedProduct] = await db
    .insert(products)
    .values(productData)
    .returning();

  return res
    .status(201)
    .json(new ApiResponse(201, insertedProduct, "Product added successfully."));
});
