import { getAuth } from "@clerk/express";
import { and, eq } from "drizzle-orm";

import { db } from "../config/db";
import { carts } from "../schemas";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const getAllCartItem = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const userCarts = await db.query.carts.findMany({
    where: eq(carts.userId, userId!),
    columns: {
      id: true,
      quantity: true,
      sizeId: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      products: {
        columns: {
          id: true,
          name: true,
        },
        with: {
          medias: {
            columns: {
              url: true,
            },
          },
          sizes: {
            columns: {
              productId: false,
            },
          },
        },
      },
    },
  });

  const formattedCarts = userCarts.map((cart) => ({
    id: cart.id,
    quantity: cart.quantity,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    product: {
      id: cart.products.id,
      name: cart.products.name,
      coverImgUrl: cart.products.medias[0].url,
      size: cart.products.sizes.find((s) => s.id === cart.sizeId) || {},
    },
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, formattedCarts, "Carts fetched successfully."));
});

export const addToCart = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { productId, sizeId, quantity } = req.body;

  if (!productId || !sizeId || typeof quantity != "number" || quantity < 1) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid request body."));
  }

  await db
    .insert(carts)
    .values({
      userId: userId!,
      productId,
      quantity,
      sizeId,
    })
    .onConflictDoNothing();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product added to cart successfully."));
});

export const updateCartQuantity = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { productId, sizeId, quantity } = req.body;

  if (!productId || !sizeId || typeof quantity != "number" || quantity < 0) {
    console.log({ productId, sizeId, quantity });

    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid request body."));
  }

  if (quantity === 0) {
    await db
      .delete(carts)
      .where(
        and(
          eq(carts.userId, userId!),
          eq(carts.productId, productId),
          eq(carts.sizeId, sizeId),
        ),
      );
  } else {
    await db
      .update(carts)
      .set({
        quantity: quantity,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(carts.userId, userId!),
          eq(carts.productId, productId),
          eq(carts.sizeId, sizeId),
        ),
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart item updated successfully."));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { productId, sizeId } = req.body;

  if (!productId || !sizeId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid request body."));
  }

  await db
    .delete(carts)
    .where(
      and(
        eq(carts.userId, userId!),
        eq(carts.productId, productId),
        eq(carts.sizeId, sizeId),
      ),
    );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart item removed successfully."));
});
