import { getAuth } from "@clerk/express";
import { and, desc, eq } from "drizzle-orm";

import { db } from "../config/db";
import { wishlists } from "../schemas";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const getAllWishlists = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const userWishlists = await db.query.wishlists.findMany({
    where: eq(wishlists.userId, userId!),
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
    orderBy: [desc(wishlists.createdAt)],
  });

  const formattedWishlists = userWishlists.map((wishlist) => ({
    id: wishlist.id,
    createdAt: wishlist.createdAt,
    updatedAt: wishlist.updatedAt,
    product: {
      id: wishlist.products.id,
      name: wishlist.products.name,
      coverImgUrl: wishlist.products.medias[0].url,
      sizes: wishlist.products.sizes,
    },
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        formattedWishlists,
        "Wishlists fetched successfully.",
      ),
    );
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  let { productId } = req.params;
  const { userId } = getAuth(req);

  if (!productId || isNaN(parseInt(productId))) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid product Id."));
  }

  const wishlist = await db.query.wishlists.findFirst({
    columns: {
      id: true,
    },
    where: and(
      eq(wishlists.userId, userId!),
      eq(wishlists.productId, parseInt(productId)),
    ),
  });

  if (wishlist) {
    await db.delete(wishlists).where(eq(wishlists.id, wishlist.id));

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Product removed from wishlist successfully."),
      );
  } else {
    const [insertedWishlist] = await db
      .insert(wishlists)
      .values({
        userId: userId!,
        productId: parseInt(productId),
      })
      .returning();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          insertedWishlist,
          "Product added to wishlist successfully.",
        ),
      );
  }
});
