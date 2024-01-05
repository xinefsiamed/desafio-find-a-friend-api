CREATE TABLE IF NOT EXISTS "ngos" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"description" text,
	"phone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"ngo_id" varchar NOT NULL,
	"cep" varchar(8) NOT NULL,
	"street" varchar(256) NOT NULL,
	"district" varchar(256) NOT NULL,
	"city" varchar(256) NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "city_index" ON "addresses" ("city");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_ngo_id_ngos_id_fk" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
