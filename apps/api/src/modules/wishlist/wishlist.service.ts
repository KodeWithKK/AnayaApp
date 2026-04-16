import { Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";

import { wishlists, type Database } from "@repo/db";

import { InjectDb } from "../database/database.module";

@Injectable()
export class WishlistService {
  constructor(@InjectDb() private readonly db: Database) {}

  async getAll(userId: string) {
    return this.db.query.wishlists.findMany({
      where: eq(wishlists.userId, userId),
      with: {
        products: {
          with: {
            medias: { columns: { url: true } },
            brand: { columns: { name: true } },
          },
        },
      },
    });
  }

  async toggle(userId: string, productId: number) {
    const existing = await this.db.query.wishlists.findFirst({
      where: and(
        eq(wishlists.userId, userId),
        eq(wishlists.productId, productId),
      ),
    });

    if (existing) {
      await this.db
        .delete(wishlists)
        .where(
          and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)),
        );
      return { message: "Removed from wishlist", status: "removed" };
    } else {
      await this.db.insert(wishlists).values({
        userId,
        productId,
      });
      return { message: "Added to wishlist", status: "added" };
    }
  }
}
