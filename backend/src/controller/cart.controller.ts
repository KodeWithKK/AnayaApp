import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";

import { db } from "../config/db";
import { carts } from "../schemas";
import { asyncHandler } from "../utils/async-handler";

export const getAllCartItem = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const userCarts = await db.query.carts.findMany({
    where: eq(carts.id, userId!),
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
      size: cart.products.sizes.find((s) => s.id === cart.sizeId) || [],
    },
  }));
});
