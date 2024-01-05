import { NGOsRepository } from "@/repository/NGOs-repository";
import { AddressesRepository } from "@/repository/addresses-repository";
import { hash } from "bcryptjs";
import { NGOAlreadyExistsError } from "./errors/ngo-already-exists-error";

interface CreateNGOUseCaseRequest {
  name: string;
  description?: string;
  phone: string;
  password: string;
  email: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  latitude: number;
  longitude: number;
}

export class CreateNGOUsecase {
  constructor(
    private ngosRepository: NGOsRepository,
    private addressRepository: AddressesRepository,
  ) {}

  async execute(data: CreateNGOUseCaseRequest) {
    const NGOwithSameEmail = await this.ngosRepository.findByEmail(data.email);

    if (NGOwithSameEmail) {
      throw new NGOAlreadyExistsError();
    }

    const password_hash = await hash(data.password, 6);

    const ngo = await this.ngosRepository.create({
      name: data.name,
      phone: data.phone,
      password_hash,
      description: data.description,
      email: data.email,
    });

    const address = await this.addressRepository.create({
      cep: data.cep,
      city: data.city,
      district: data.district,
      latitude: data.latitude,
      longitude: data.longitude,
      ngo_id: ngo.id,
      street: data.street,
    });

    return {
      NGO: {
        ...ngo,
        address,
      },
    };
  }
}
