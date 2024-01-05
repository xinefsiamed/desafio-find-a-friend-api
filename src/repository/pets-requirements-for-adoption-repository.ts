import {
  NewRequirementForAdoption,
  RequirementForAdoption,
} from "drizzle/schema/pet";

export interface PetsRequirementsForAdoptionRepository {
  create(data: NewRequirementForAdoption[]): Promise<RequirementForAdoption[]>;
  getRequirementsByPetId(petId: string): Promise<RequirementForAdoption[]>;
}
