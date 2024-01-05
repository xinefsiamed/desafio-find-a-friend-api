import { Addresses, newAddress } from "drizzle/schema/ngo";
import { AddressesRepository } from "../addresses-repository";
import { drizzleClient } from "@/lib/drizzle";
import { ilike } from "drizzle-orm";

export class DrizzleAddressesRepository implements AddressesRepository {
  async create(data: newAddress) {
    const address = await drizzleClient
      .insert(Addresses)
      .values(data)
      .returning();

    return address[0];
  }

  async getNgosIdsByCity(city: string): Promise<string[] | null> {
    const ngos = await drizzleClient
      .select({ id: Addresses.ngo_id })
      .from(Addresses)
      .where(ilike(Addresses.city, city));

    if (ngos.length < 1) {
      return null;
    }

    const ngosIds = ngos.map((ngo) => ngo.id);

    return ngosIds;
  }
}
