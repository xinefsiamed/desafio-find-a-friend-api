import { DrizzlePetsRepository } from "@/repository/drizzle/drizzle-pets-repository";
import { CreatePetUseCase } from "../create-pet-use-case";
import { DrizzlePetsRequirementsForAdoption } from "@/repository/drizzle/drizzle-pets-requirements-for-adoption";

export function makeCreatePetUseCase() {
  const petRepository = new DrizzlePetsRepository();
  const petsRequirementsForAdoptionRepository =
    new DrizzlePetsRequirementsForAdoption();
  const createPetUseCase = new CreatePetUseCase(
    petRepository,
    petsRequirementsForAdoptionRepository,
  );

  return createPetUseCase;
}
