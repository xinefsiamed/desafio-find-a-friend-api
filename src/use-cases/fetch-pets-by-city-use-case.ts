import { AddressesRepository } from "@/repository/addresses-repository";
import { PetsRepository, FiltersTypes } from "@/repository/pets-repository";
import { Pet } from "drizzle/schema/pet";
import { CityNotFoundError } from "./errors/city-not-found-error";

interface FetchPetsByCityUseCaseRequest {
  city_name: string;
  page: number;
  filters?: FiltersTypes;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private addressRepository: AddressesRepository,
  ) {}

  async execute({
    city_name,
    page,
    filters,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const ngosIds = await this.addressRepository.getNgosIdsByCity(city_name);

    if (!ngosIds) {
      throw new CityNotFoundError();
    }

    const pets = await this.petsRepository.getPetsByNgosIds(
      ngosIds,
      page,
      filters,
    );

    return {
      pets,
    };
  }
}
