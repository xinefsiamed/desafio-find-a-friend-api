import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  doublePrecision,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Pet } from "./pet";

export const NGOs = pgTable("ngos", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name").notNull(),
  description: text("description"),
  phone: varchar("phone").notNull(),
  password_hash: varchar("password_hash").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const Addresses = pgTable(
  "addresses",
  {
    id: varchar("id", { length: 256 })
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    ngo_id: varchar("ngo_id")
      .notNull()
      .references(() => NGOs.id, { onDelete: "cascade" }),
    cep: varchar("cep", { length: 8 }).notNull(),
    street: varchar("street", { length: 256 }).notNull(),
    district: varchar("district", { length: 256 }).notNull(),
    city: varchar("city", { length: 256 }).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (address) => {
    return {
      cityIndex: index("city_index").on(address.city),
    };
  },
);

export const NGOsRelations = relations(NGOs, ({ one, many }) => ({
  address: one(Addresses),
  pet: many(Pet),
}));

export const addressesRelations = relations(Addresses, ({ one }) => ({
  ngo: one(NGOs, {
    fields: [Addresses.ngo_id],
    references: [NGOs.id],
  }),
}));

export type NGO = typeof NGOs.$inferSelect;
export type newNGO = typeof NGOs.$inferInsert;

export type address = typeof Addresses.$inferSelect;
export type newAddress = typeof Addresses.$inferInsert;
