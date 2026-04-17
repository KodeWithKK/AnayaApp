import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import productsDataset from "../dataset/products.json";
import { connectDb } from "../src/index";
import { analytics, brands, media, products, sizes } from "../src/schema/index";

dotenv.config({ path: path.join(__dirname, "../.env") });

function findMrp(price: number, discountPercentage?: number) {
  const mrp = Math.trunc(price / ((100 - (discountPercentage || 0)) / 100));
  const unitDigit = mrp % 10;
  return mrp + (9 - unitDigit);
}

async function startReset() {
  const db = connectDb();
  console.log("🚀 STARTING DATABASE RESET");

  try {
    /* ------- REMOTE WIPE ------- */
    await db.execute(sql`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        -- 1. Drop public tables/views/types
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS "public"."' || r.tablename || '" CASCADE';
        END LOOP;
        FOR r IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP VIEW IF EXISTS "public"."' || r.viewname || '" CASCADE';
        END LOOP;
        FOR r IN (SELECT typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typtype = 'e') LOOP
          EXECUTE 'DROP TYPE IF EXISTS "public"."' || r.typname || '" CASCADE';
        END LOOP;

        -- 2. Drop the drizzle migration schema to ensure a fresh history
        EXECUTE 'DROP SCHEMA IF EXISTS "drizzle" CASCADE';
      END $$;
    `);

    /* ------- SCHEMA REBUILD ------- */
    const migrationDir = path.join(__dirname, "../drizzle");
    if (fs.existsSync(migrationDir))
      fs.rmSync(migrationDir, { recursive: true, force: true });

    execSync("bun drizzle-kit generate", {
      stdio: "ignore",
      cwd: path.join(__dirname, ".."),
    });

    await db.execute(sql`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
          CREATE TYPE "gender" AS ENUM ('men', 'women', 'unisex');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'media_type') THEN
          CREATE TYPE "media_type" AS ENUM ('image', 'video');
        END IF;
      END $$;
    `);

    await migrate(db, { migrationsFolder: migrationDir });

    /* ------- DATA SEEDING ------- */
    console.log("🌱 Bulk Seeding Data...");

    const uniqueBrandNames = Array.from(
      new Set(productsDataset.data.map((p) => p.brand.name)),
    );
    const brandValues = uniqueBrandNames.map((name) => ({
      name,
      description: `Premium products from ${name}`,
    }));
    const insertedBrands = await db
      .insert(brands)
      .values(brandValues)
      .returning();
    const brandMap = new Map(insertedBrands.map((b) => [b.name, b.id]));

    const productValues = productsDataset.data.map((p) => ({
      name: p.name,
      manufacturer: p.manufacturer,
      countryOfOrigin: p.countryOfOrigin,
      baseColour: p.baseColour,
      brandId: brandMap.get(p.brand.name)!,
      description: p.productDetails.description,
      materialAndCare: p.productDetails.materialAndCare,
      specifications: p.productDetails.specification,
    }));
    const insertedProducts = await db
      .insert(products)
      .values(productValues)
      .returning();

    const allSizes: any[] = [];
    const allMedia: any[] = [];
    const allAnalytics: any[] = [];

    insertedProducts.forEach((insertedProduct, index) => {
      const original = productsDataset.data[index];
      if (!original) return;

      original.sizes.forEach((s) => {
        allSizes.push({
          productId: insertedProduct.id,
          label: s.label,
          available: s.available,
          mrp: s.price
            ? findMrp(s.price, original.discounts?.[0]?.percent)
            : 2999,
          discountPercentage: original.discounts?.[0]?.percent || 0,
          measurements: s.measurements,
        });
      });

      original.images.forEach((url) => {
        allMedia.push({
          productId: insertedProduct.id,
          type: "image",
          url: url,
        });
      });

      allAnalytics.push({
        productId: insertedProduct.id,
        gender: original.analytics.gender.toLowerCase(),
        articleType: original.analytics.articleType,
        masterCategory: original.analytics.masterCategory,
        subCategory: original.analytics.subCategory,
      });
    });

    if (allSizes.length > 0) await db.insert(sizes).values(allSizes);
    if (allMedia.length > 0) await db.insert(media).values(allMedia);
    if (allAnalytics.length > 0)
      await db.insert(analytics).values(allAnalytics);

    console.log("✅ RESET SUCCESSFUL");
    process.exit(0);
  } catch (error) {
    console.error("❌ RESET FAILED");
    console.error(error);
    process.exit(1);
  }
}

startReset();
