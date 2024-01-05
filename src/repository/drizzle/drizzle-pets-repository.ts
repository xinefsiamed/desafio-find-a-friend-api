import { Pet, newPet } from "drizzle/schema/pet";
import { FiltersTypes, PetsRepository } from "../pets-repository";
import { drizzleClient } from "@/lib/drizzle";
import { eq, inArray } from "drizzle-orm";

export class DrizzlePetsRepository implements PetsRepository {
  async create(data: newPet) {
    const pet = await drizzleClient.insert(Pet).values(data).returning();

    return pet[0];
  }

  async findById(id: string) {
    const pet = await drizzleClient.select().from(Pet).where(eq(Pet.id, id));

    if (!pet) {
      return null;
    }

    return pet[0];
  }

  async getPetsByNgoId(ngo_id: string, page: number) {
    const startIndex = (page - 1) * 20;

    const pets = await drizzleClient
      .select()
      .from(Pet)
      .where(eq(Pet.ngo_id, ngo_id))
      .offset(startIndex)
      .limit(20);

    return pets;
  }

  async getPetsByNgosIds(
    ngosIds: string[],
    page: number,
    filters?: FiltersTypes | undefined,
  ) {
    const startIndex = (page - 1) * 20;

    let query = drizzleClient
      .select()
      .from(Pet)
      .where(inArray(Pet.ngo_id, ngosIds))
      .$dynamic();

    if (filters) {
      if (filters.age) {
        query = query.where(eq(Pet.age, filters.age));
      }

      if (filters.ambientType) {
        query = query.where(eq(Pet.ambient_type, filters.ambientType));
      }

      if (filters.energy) {
        query = query.where(eq(Pet.energy, filters.energy));
      }

      if (filters.gender) {
        query = query.where(eq(Pet.gender, filters.gender));
      }

      if (filters.independecyLevel) {
        query = query.where(
          eq(Pet.independency_level, filters.independecyLevel),
        );
      }

      if (filters.size) {
        query = query.where(eq(Pet.size, filters.size));
      }
    }

    const pets = await query.offset(startIndex).limit(20);

    return pets;
  }
}
