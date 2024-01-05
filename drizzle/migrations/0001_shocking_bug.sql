ALTER TABLE "addresses" ALTER COLUMN "latitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "longitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "ngos" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "ngos" ADD COLUMN "password_hash" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "ngos" ADD COLUMN "email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "ngos" ADD COLUMN "created_at" timestamp DEFAULT now();