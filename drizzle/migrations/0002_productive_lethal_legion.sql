DO $$ BEGIN
 CREATE TYPE "age" AS ENUM('puppy', 'young', 'adult', 'senior');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ambient_type" AS ENUM('spacious', 'moderate', 'compact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "indenpedency_level" AS ENUM('low', 'average', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "size" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('dog', 'cat');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"ngo_id" varchar(256) NOT NULL,
	"about" text NOT NULL,
	"age" "age" NOT NULL,
	"size" "size" NOT NULL,
	"type" "type" NOT NULL,
	"energy" smallint NOT NULL,
	"gender" "gender" NOT NULL,
	"independency_level" "indenpedency_level" NOT NULL,
	"ambient_type" "ambient_type" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets_images" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"pet_id" varchar(256) NOT NULL,
	"image_name" varchar(256),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "requirement_for_adoption" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"description" varchar(256) NOT NULL,
	"pet_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_ngo_id_ngos_id_fk" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_images" ADD CONSTRAINT "pets_images_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requirement_for_adoption" ADD CONSTRAINT "requirement_for_adoption_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
