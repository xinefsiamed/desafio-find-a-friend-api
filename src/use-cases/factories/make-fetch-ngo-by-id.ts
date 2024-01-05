import { DrizzleNGOsRepository } from "@/repository/drizzle/drizzle-NGOs-repository";
import { FetchNgoById } from "../fetch-ngo-by-id-use-case";

export function makeFetchNgoById() {
  const ngosRepository = new DrizzleNGOsRepository();
  const fetchNgoById = new FetchNgoById(ngosRepository);

  return fetchNgoById;
}
