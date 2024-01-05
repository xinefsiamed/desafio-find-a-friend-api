import { DrizzleAddressesRepository } from "@/repository/drizzle/drizzle-address-repository";
import { DrizzlePetsRepository } from "@/repository/drizzle/drizzle-pets-repository";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city-use-case";

export function makeFetchPetsByCityUseCase() {
  const addressesRepository = new DrizzleAddressesRepository();
  const petsRepository = new DrizzlePetsRepository();
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(
    petsRepository,
    addressesRepository,
  );

  return fetchPetsByCityUseCase;
}
