import { PetsRepository } from "@/repository/pets-repository";
import { PetsRequirementsForAdoptionRepository } from "@/repository/pets-requirements-for-adoption-repository";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: "puppy" | "young" | "adult" | "senior";
  size: "small" | "medium" | "large";
  type: "dog" | "cat";
  energy: number;
  ngo_id: string;
  gender: "male" | "female";
  independency_level: "low" | "average" | "high";
  ambient_type: "spacious" | "moderate" | "compact";
  requirementsForAdoption: {
    description: string;
  }[];
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petsRequirementsForAdoption: PetsRequirementsForAdoptionRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    ambient_type,
    energy,
    gender,
    ngo_id,
    independency_level,
    size,
    type,
    requirementsForAdoption,
  }: CreatePetUseCaseRequest) {
    const animal = await this.petsRepository.create({
      name,
      about,
      ngo_id,
      age,
      ambient_type,
      energy,
      gender,
      size,
      type,
      independency_level,
    });

    const data = requirementsForAdoption.map((requirement) => ({
      description: requirement.description,
      pet_id: animal.id,
    }));

    await this.petsRequirementsForAdoption.create(data);

    return animal;
  }
}
