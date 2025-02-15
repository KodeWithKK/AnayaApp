import {
  boolean,
  foreignKey,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// brands table
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

// products table
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    mrp: integer("mrp").notNull(),
    manufacturer: text("manufacturer"),
    countryOfOrigin: text("country_of_origin"),
    baseColour: text("base_colour"),
    brandId: integer("brand_id").notNull(),
    description: text("description"),
    materialAndCare: text("material_and_care"),
    specifications: jsonb("specifications"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.brandId], foreignColumns: [brands.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
    foreignKey({ columns: [table.brandId], foreignColumns: [brands.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

// Colours Table
export const colours = pgTable(
  "colours",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    label: text("label").notNull(),
    url: text("url"),
    image: text("image"),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

// Sizes Table
export const sizes = pgTable(
  "sizes",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    label: text("label").notNull(),
    skuId: integer("sku_id").notNull(),
    available: boolean("available").notNull(),
    price: integer("price"),
    measurements: jsonb("measurements"),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

const mediaType = pgEnum("media_type", ["image", "video", "animated_gif"]);

// Media Table
export const media = pgTable(
  "media",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    type: mediaType().default("image").notNull(),
    url: text("image_url").notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

// Ratings Table
export const ratings = pgTable(
  "ratings",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    userId: integer("user_id").notNull(),
    rating: integer("rating").notNull(),
    review: text("review"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

// Discounts Table
export const discounts = pgTable(
  "discounts",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    label: text("label"),
    percent: integer("percent"),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

// Offers Table
export const offers = pgTable(
  "offers",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    title: text("title"),
    description: text("description"),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);
