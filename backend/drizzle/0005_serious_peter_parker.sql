ALTER TABLE "sizes" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sizes" ADD COLUMN "discount_percentage" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "mrp";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "discount_percentage";