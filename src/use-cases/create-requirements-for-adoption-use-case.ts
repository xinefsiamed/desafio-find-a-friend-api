import { PetsRepository } from "@/repository/pets-repository";
import { AnimalsRequirementsForAdoptionRepository } from "@/repository/pets-requirements-for-adoption-repository";
import { PetNotExistsError } from "./errors/animal-not-exists-error";

interface CreateRequirementsForAdoptionUseCaseRequest {
  pet_id: string;
  descriptions: string[];
}

export class CreateRequirementsForAdoptionUseCase {
  constructor(
    private animalsRequirementsForAdoptionRepository: AnimalsRequirementsForAdoptionRepository,
    private PetsRepository: PetsRepository,
  ) {}

  async execute({
    pet_id,
    descriptions,
  }: CreateRequirementsForAdoptionUseCaseRequest) {
    const isAnimalExists = await this.PetsRepository.findById(pet_id);

    if (!isAnimalExists) {
      throw new PetNotExistsError();
    }

    const requirementsForAdoption = descriptions.map((description) => {
      return {
        pet_id,
        description,
      };
    });

    const requirements =
      await this.animalsRequirementsForAdoptionRepository.create(
        requirementsForAdoption,
      );

    return requirements;
  }
}
