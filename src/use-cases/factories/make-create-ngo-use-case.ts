import { DrizzleNGOsRepository } from "@/repository/drizzle/drizzle-NGOs-repository";
import { CreateNGOUsecase } from "../create-ngo-use-case";
import { DrizzleAddressesRepository } from "@/repository/drizzle/drizzle-address-repository";

export function makeCreateNgoUseCase() {
  const ngoRepository = new DrizzleNGOsRepository();
  const addressesRepository = new DrizzleAddressesRepository();
  const createNgoUseCase = new CreateNGOUsecase(
    ngoRepository,
    addressesRepository,
  );

  return createNgoUseCase;
}
