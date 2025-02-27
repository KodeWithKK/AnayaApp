import { and, eq, ilike, inArray } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../config/db";
import {
  analytics,
  GenderType,
  products,
  productsInsertSchema,
} from "../schemas";
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
  let { o = 0, l = 20, category, articleType, gender } = req.query;

  o = parseInt(o as string, 10);
  l = parseInt(l as string, 10);

  const analyticsSubquery = db
    .select({ productId: analytics.productId })
    .from(analytics)
    .where(
      and(
        category ? eq(analytics.category, category as string) : undefined,
        articleType
          ? eq(analytics.articleType, articleType as string)
          : undefined,
        gender ? eq(analytics.gender, gender as GenderType) : undefined,
      ),
    );

  const allProducts = await db.query.products.findMany({
    with: {
      brand: {
        columns: {
          name: true,
        },
      },
      analytic: {
        columns: {
          productId: false,
          category: true,
          articleType: true,
        },
      },
      sizes: {
        columns: {
          productId: false,
        },
      },
      medias: {
        columns: {
          productId: false,
        },
      },
    },
    offset: o,
    limit: l,
    where: inArray(products.id, analyticsSubquery),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, allProducts, "Products retrieved successfully."),
    );
});

export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    let { o = 0, l = 20, q, category, articleType } = req.query;

    o = parseInt(o as string);
    l = parseInt(l as string);

    if (!q) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Search query not found"));
    }

    const analyticsSubquery = db
      .select({ productId: analytics.productId })
      .from(analytics)
      .where(
        and(
          category ? eq(analytics.category, category as string) : undefined,
          articleType
            ? eq(analytics.articleType, articleType as string)
            : undefined,
        ),
      );

    const allProducts = await db.query.products.findMany({
      with: {
        brand: {
          columns: {
            name: true,
          },
        },
        analytic: {
          columns: {
            productId: false,
          },
        },
        sizes: {
          columns: {
            productId: false,
          },
        },
        medias: {
          columns: {
            productId: false,
          },
        },
      },
      offset: o,
      limit: l,
      where: and(
        ilike(products.name, `%${q}%`),
        inArray(products.id, analyticsSubquery),
      ),
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
      medias: {
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
