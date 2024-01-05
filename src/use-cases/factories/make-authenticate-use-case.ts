import { DrizzleNGOsRepository } from "@/repository/drizzle/drizzle-NGOs-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";

export function makeAuthenticateUseCase() {
  const ngosRepository = new DrizzleNGOsRepository();
  const authenticateUseCase = new AuthenticateUseCase(ngosRepository);

  return authenticateUseCase;
}
