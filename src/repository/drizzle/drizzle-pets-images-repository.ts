import { NewPetImage, PetImage } from "drizzle/schema/pet";
import { PetsImagesRepository } from "../pets-images-repository";
import { drizzleClient } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export class DrizzlePetsImagesRepository implements PetsImagesRepository {
  async create(data: NewPetImage) {
    const petImage = await drizzleClient
      .insert(PetImage)
      .values(data)
      .returning();

    return petImage[0];
  }

  async getImagesByPetId(petId: string) {
    const petImages = await drizzleClient
      .select()
      .from(PetImage)
      .where(eq(PetImage.pet_id, petId));

    return petImages;
  }
}
