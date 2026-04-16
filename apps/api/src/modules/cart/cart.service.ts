import { Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";

import { carts, type Database } from "@repo/db";

import { InjectDb } from "../database/database.module";
import { AddToCartDto, RemoveFromCartDto, UpdateCartDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
  constructor(@InjectDb() private readonly db: Database) {}

  async getAll(userId: string) {
    const userCarts = await this.db.query.carts.findMany({
      where: eq(carts.userId, userId),
      columns: {
        id: true,
        quantity: true,
        sizeId: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        products: {
          columns: { id: true, name: true },
          with: {
            medias: { columns: { url: true } },
            sizes: { columns: { productId: false } },
          },
        },
      },
    });

    return userCarts.map((cart) => ({
      id: cart.id,
      quantity: cart.quantity,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      product: {
        id: cart.products.id,
        name: cart.products.name,
        coverImgUrl: cart.products.medias[0]?.url,
        size: cart.products.sizes.find((s) => s.id === cart.sizeId) || {},
      },
    }));
  }

  async add(userId: string, dto: AddToCartDto) {
    await this.db
      .insert(carts)
      .values({
        userId,
        ...dto,
      })
      .onConflictDoNothing();
    return { message: "Product added to cart successfully." };
  }

  async update(userId: string, dto: UpdateCartDto) {
    const { productId, sizeId, quantity } = dto;

    if (quantity === 0) {
      await this.db
        .delete(carts)
        .where(
          and(
            eq(carts.userId, userId),
            eq(carts.productId, productId),
            eq(carts.sizeId, sizeId),
          ),
        );
    } else {
      await this.db
        .update(carts)
        .set({
          quantity,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(carts.userId, userId),
            eq(carts.productId, productId),
            eq(carts.sizeId, sizeId),
          ),
        );
    }
    return { message: "Cart item updated successfully." };
  }

  async remove(userId: string, dto: RemoveFromCartDto) {
    const { productId, sizeId } = dto;
    await this.db
      .delete(carts)
      .where(
        and(
          eq(carts.userId, userId),
          eq(carts.productId, productId),
          eq(carts.sizeId, sizeId),
        ),
      );
    return { message: "Cart item removed successfully." };
  }
}
