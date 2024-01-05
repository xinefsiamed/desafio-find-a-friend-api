import { Pet, newPet } from "drizzle/schema/pet";

export interface FiltersTypes {
  age?: "puppy" | "young" | "adult" | "senior";
  size?: "small" | "medium" | "large";
  gender?: "male" | "female";
  independecyLevel?: "low" | "average" | "high";
  ambientType?: "spacious" | "moderate" | "compact";
  energy?: number;
}

export interface PetsRepository {
  create(data: newPet): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  getPetsByNgoId(ngo_id: string, page: number): Promise<Pet[]>;
  getPetsByNgosIds(
    ngosIds: string[],
    page: number,
    filters?: FiltersTypes,
  ): Promise<Pet[]>;
}
