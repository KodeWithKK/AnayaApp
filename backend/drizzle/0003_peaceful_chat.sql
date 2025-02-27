ALTER TABLE "products" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;