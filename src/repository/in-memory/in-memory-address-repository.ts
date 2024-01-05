import { address, newAddress } from "drizzle/schema/ngo";
import { AddressesRepository } from "../addresses-repository";
import { createId } from "@paralleldrive/cuid2";

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: address[] = [];

  async create(data: newAddress) {
    const address = {
      id: createId(),
      cep: data.cep,
      street: data.street,
      district: data.district,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
      ngo_id: data.ngo_id,
    };

    this.items.push(address);

    return address;
  }

  async getNgosIdsByCity(city: string) {
    const ngosIds = await this.items
      .filter((ngos) => ngos.city === city)
      .map((city) => city.ngo_id);

    return ngosIds;
  }
}
