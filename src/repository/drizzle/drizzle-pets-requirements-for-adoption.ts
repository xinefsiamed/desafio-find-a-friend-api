import { RequirementForAdoption } from "drizzle/schema/pet";
import { PetsRequirementsForAdoptionRepository } from "../pets-requirements-for-adoption-repository";
import { drizzleClient } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export class DrizzlePetsRequirementsForAdoption
  implements PetsRequirementsForAdoptionRepository
{
  async create(data: RequirementForAdoption[]) {
    const requirements = await drizzleClient
      .insert(RequirementForAdoption)
      .values(data)
      .returning();

    return requirements;
  }

  async getRequirementsByPetId(petId: string) {
    const requirements = await drizzleClient
      .select()
      .from(RequirementForAdoption)
      .where(eq(RequirementForAdoption.pet_id, petId));

    return requirements;
  }
}
