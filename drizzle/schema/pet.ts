import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { NGOs } from "./ngo";

export const ageEnum = pgEnum("age", ["puppy", "young", "adult", "senior"]);
export const sizeEnum = pgEnum("size", ["small", "medium", "large"]);
export const typeEnum = pgEnum("type", ["dog", "cat"]);
export const genderEnum = pgEnum("gender", ["male", "female"]);
export const independencyLevelEnum = pgEnum("indenpedency_level", [
  "low",
  "average",
  "high",
]);
export const ambientTypeEnum = pgEnum("ambient_type", [
  "spacious",
  "moderate",
  "compact",
]);

export const Pet = pgTable("pets", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 128 }).notNull(),
  ngo_id: varchar("ngo_id", { length: 256 })
    .references(() => NGOs.id, {
      onDelete: "cascade",
    })
    .notNull(),
  about: text("about").notNull(),
  age: ageEnum("age").notNull(),
  size: sizeEnum("size").notNull(),
  type: typeEnum("type").notNull(),
  energy: smallint("energy").notNull(),
  gender: genderEnum("gender").notNull(),
  independency_level: independencyLevelEnum("independency_level").notNull(),
  ambient_type: ambientTypeEnum("ambient_type").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const RequirementForAdoption = pgTable("requirement_for_adoption", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => createId()),
  description: varchar("description", { length: 256 }).notNull(),
  pet_id: varchar("pet_id", { length: 256 })
    .notNull()
    .references(() => Pet.id, { onDelete: "cascade" }),
});

export const PetImage = pgTable("pets_images", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => createId()),
  pet_id: varchar("pet_id", { length: 256 })
    .notNull()
    .references(() => Pet.id, { onDelete: "cascade" }),
  image_name: varchar("image_name", { length: 256 }),
  created_at: timestamp("created_at").defaultNow(),
});

export const petRelations = relations(Pet, ({ many, one }) => ({
  requirements: many(RequirementForAdoption),
  images: many(PetImage),
  ngo: one(NGOs, {
    fields: [Pet.ngo_id],
    references: [NGOs.id],
  }),
}));

export const requirementsForAdoptionRelations = relations(
  RequirementForAdoption,
  ({ one }) => ({
    pet: one(Pet, {
      fields: [RequirementForAdoption.pet_id],
      references: [Pet.id],
    }),
  }),
);

export const petImageRelations = relations(PetImage, ({ one }) => ({
  pet: one(Pet, {
    fields: [PetImage.pet_id],
    references: [Pet.id],
  }),
}));

export type Pet = typeof Pet.$inferSelect;
export type newPet = typeof Pet.$inferInsert;

export type RequirementForAdoption = typeof RequirementForAdoption.$inferSelect;
export type NewRequirementForAdoption =
  typeof RequirementForAdoption.$inferInsert;

export type PetImage = typeof PetImage.$inferSelect;
export type NewPetImage = typeof PetImage.$inferInsert;
