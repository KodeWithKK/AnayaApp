ALTER TABLE "discounts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "discounts" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discount_percentage" integer;--> statement-breakpoint
ALTER TABLE "sizes" DROP COLUMN IF EXISTS "sku_id";--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "brands_name_unique" UNIQUE("name");