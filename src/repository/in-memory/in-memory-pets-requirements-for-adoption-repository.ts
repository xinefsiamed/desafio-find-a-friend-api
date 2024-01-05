import {
  NewRequirementForAdoption,
  RequirementForAdoption,
} from "drizzle/schema/pet";
import { createId } from "@paralleldrive/cuid2";
import { PetsRequirementsForAdoptionRepository } from "../pets-requirements-for-adoption-repository";

export class InMemoryPetsRequirementsForAdoptionRepository
  implements PetsRequirementsForAdoptionRepository
{
  public items: RequirementForAdoption[] = [];

  async create(data: NewRequirementForAdoption[]) {
    const requirements = data.map((requirement) => {
      return {
        id: createId(),
        description: requirement.description,
        pet_id: requirement.pet_id,
      };
    });

    this.items.push(...requirements);

    return requirements;
  }

  async getRequirementsByPetId(petId: string) {
    const requirements = await this.items.filter(
      (requirement) => requirement.pet_id === petId,
    );

    return requirements;
  }
}
