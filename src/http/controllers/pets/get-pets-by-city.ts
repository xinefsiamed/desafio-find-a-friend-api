import { CityNotFoundError } from "@/use-cases/errors/city-not-found-error";
import { makeFetchPetsByCityUseCase } from "@/use-cases/factories/make-fetch-pets-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetsByCityQuerySchema = z.object({
    page: z.coerce.number().default(1),
    age: z.enum(["puppy", "young", "adult", "senior"]).optional(),
    size: z.enum(["small", "medium", "large"]).optional(),
    gender: z.enum(["male", "female"]).optional(),
    independencyLevel: z.enum(["low", "average", "high"]).optional(),
    ambientType: z.enum(["spacious", "moderate", "compact"]).optional(),
    energy: z.coerce.number().int().min(1).max(5).optional(),
  });

  const getPetsByCityParamSchema = z.object({
    city_name: z.string(),
  });

  try {
    const { city_name } = getPetsByCityParamSchema.parse(request.params);
    const { page, age, ambientType, energy, gender, independencyLevel, size } =
      getPetsByCityQuerySchema.parse(request.query);

    const filters = {
      age,
      ambientType,
      energy,
      gender,
      independencyLevel,
      size,
    };

    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase();

    const { pets } = await fetchPetsByCityUseCase.execute({
      city_name,
      page,
      filters,
    });

    return reply.send(pets);
  } catch (err) {
    if (err instanceof CityNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
