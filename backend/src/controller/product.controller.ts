import { ilike } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../config/db";
import { products, productsInsertSchema } from "../schemas";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const { data, success } = productsInsertSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid product data."));
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

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  let { o = 0, l = 20 } = req.query;

  o = parseInt(o as string);
  l = parseInt(l as string);

  const allProducts = await db.query.products.findMany({
    with: {
      sizes: {
        columns: {
          productId: false,
        },
      },
      brand: {
        columns: {
          name: true,
        },
      },
      media: {
        columns: {
          productId: false,
        },
      },
    },
    offset: o,
    limit: l,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, allProducts, "Products retrieved successfully."),
    );
});

export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    let { o = 0, l = 20, q } = req.query;

    o = parseInt(o as string);
    l = parseInt(l as string);

    if (!q) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Search query not found"));
    }

    const allProducts = await db.query.products.findMany({
      with: {
        sizes: {
          columns: {
            productId: false,
          },
        },
        brand: {
          columns: {
            name: true,
          },
        },
        media: {
          columns: {
            productId: false,
          },
        },
      },
      offset: o,
      limit: l,
      where: ilike(products.name, `%${q}%`),
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, allProducts, "Products retrieved successfully."),
      );
  },
);

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Product ID not found!"));
  }

  const product = await db.query.products.findFirst({
    with: {
      sizes: {
        columns: {
          productId: false,
        },
      },
      brand: {
        columns: {
          name: true,
        },
      },
      media: {
        columns: {
          productId: false,
        },
      },
    },
    where: (products, { eq }) => eq(products.id, parseInt(productId)),
  });

  if (!product) {
    return res.status(404).json(new ApiResponse(404, {}, "Product not found."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product retrieved successfully."));
});
