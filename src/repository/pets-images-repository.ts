import { NewPetImage, PetImage } from "drizzle/schema/pet";

export interface PetsImagesRepository {
  create(data: NewPetImage): Promise<PetImage>;
  getImagesByPetId(petId: string): Promise<PetImage[]>;
}
