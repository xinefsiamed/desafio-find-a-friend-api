import { createId } from "@paralleldrive/cuid2";
import { PetsImagesRepository } from "../pets-images-repository";
import { NewPetImage, PetImage } from "drizzle/schema/pet";

export class InMemoryPetsImagesRepository implements PetsImagesRepository {
  public items: PetImage[] = [];

  async create(data: NewPetImage) {
    const image = {
      id: createId(),
      pet_id: data.pet_id,
      created_at: new Date(),
      image_name: data.image_name as string | null,
    };

    this.items.push(image);

    return image;
  }

  async getImagesByPetId(petId: string) {
    const petImages = await this.items.filter(
      (image) => image.pet_id === petId,
    );

    return petImages;
  }
}
