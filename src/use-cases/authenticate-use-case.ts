import { NGOsRepository } from "@/repository/NGOs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private ngosRepository: NGOsRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const ngo = await this.ngosRepository.findByEmail(email);

    if (!ngo) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, ngo.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      ngo,
    };
  }
}
