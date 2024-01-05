import { PetsImagesRepository } from "@/repository/pets-images-repository";
import { PetsRepository } from "@/repository/pets-repository";
import { PetsRequirementsForAdoptionRepository } from "@/repository/pets-requirements-for-adoption-repository";
import { PetNotExistsError } from "./errors/animal-not-exists-error";

interface FetchPetDetailsUseCaseRequest {
  id: string;
}

export class FetchPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petsImagesRepository: PetsImagesRepository,
    private petsRequirementsForAdoption: PetsRequirementsForAdoptionRepository,
  ) {}

  async execute({ id }: FetchPetDetailsUseCaseRequest) {
    const petDetails = await this.petsRepository.findById(id);

    if (!petDetails) {
      throw new PetNotExistsError();
    }

    const images = await this.petsImagesRepository.getImagesByPetId(id);
    const requirementsForAdoption =
      await this.petsRequirementsForAdoption.getRequirementsByPetId(id);

    const pet = {
      ...petDetails,
      images,
      requirementsForAdoption,
    };

    return {
      pet,
    };
  }
}
