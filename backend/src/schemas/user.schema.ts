import { relations } from "drizzle-orm";
import {
  foreignKey,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import * as z from "zod";

import { products, sizes } from "./product.schema";

/**
 * TABLES
 **/
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photo: text("photo").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const wishlists = pgTable(
  "wishlists",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    productId: integer("product_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    uniqueIndex().on(table.userId, table.productId),
  ],
);

export const carts = pgTable(
  "carts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    productId: integer("product_id").notNull(),
    sizeId: integer("size_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    foreignKey({ columns: [table.sizeId], foreignColumns: [sizes.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    uniqueIndex().on(table.userId, table.productId, table.sizeId),
  ],
);

/**
 * RELATIONS
 **/
export const userRelations = relations(users, ({ many }) => ({
  wishlists: many(wishlists),
  carts: many(carts),
}));

export const wishlistRelations = relations(wishlists, ({ one }) => ({
  users: one(users),
  products: one(products, {
    fields: [wishlists.productId],
    references: [products.id],
  }),
}));
