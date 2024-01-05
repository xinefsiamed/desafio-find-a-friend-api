import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "drizzle/schema/pet";

interface FetchPetsByNgoUseCaseRequest {
  ngo_id: string;
  page: number;
}

interface FetchPetsByNgoUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByNgoUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    ngo_id,
    page,
  }: FetchPetsByNgoUseCaseRequest): Promise<FetchPetsByNgoUseCaseResponse> {
    const pets = await this.petsRepository.getPetsByNgoId(ngo_id, page);

    return {
      pets,
    };
  }
}
