import { NGOsRepository } from "@/repository/NGOs-repository";
import { NgoNotFoundError } from "./errors/ngo-not-found";

export class FetchNgoById {
  constructor(private ngosRepository: NGOsRepository) {}

  async execute(id: string) {
    const ngo = await this.ngosRepository.findByid(id);

    if (!ngo) {
      throw new NgoNotFoundError();
    }

    return ngo;
  }
}
