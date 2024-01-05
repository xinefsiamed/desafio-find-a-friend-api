import { DrizzlePetsImagesRepository } from "@/repository/drizzle/drizzle-pets-images-repository";
import { DrizzlePetsRepository } from "@/repository/drizzle/drizzle-pets-repository";
import { FetchPetDetailsUseCase } from "../fetch-pet-details-use-case";
import { DrizzlePetsRequirementsForAdoption } from "@/repository/drizzle/drizzle-pets-requirements-for-adoption";

export function makeFetchPetDetailsUseCase() {
  const petsRepository = new DrizzlePetsRepository();
  const petsImagesRepository = new DrizzlePetsImagesRepository();
  const petsRequirementsForAdoption = new DrizzlePetsRequirementsForAdoption();

  const fetchPetDetailsUseCase = new FetchPetDetailsUseCase(
    petsRepository,
    petsImagesRepository,
    petsRequirementsForAdoption,
  );

  return fetchPetDetailsUseCase;
}
