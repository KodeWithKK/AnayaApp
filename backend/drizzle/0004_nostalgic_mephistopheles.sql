ALTER TABLE "carts" ALTER COLUMN "product_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "wishlists" ALTER COLUMN "product_id" SET DATA TYPE integer;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "carts_user_id_product_id_size_id_index" ON "carts" USING btree ("user_id","product_id","size_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wishlists_user_id_product_id_index" ON "wishlists" USING btree ("user_id","product_id");