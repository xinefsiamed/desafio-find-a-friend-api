import { address, newAddress } from "drizzle/schema/ngo";

type ngosIds = string[];

export interface AddressesRepository {
  create(data: newAddress): Promise<address>;
  getNgosIdsByCity(city: string): Promise<ngosIds | null>;
}
