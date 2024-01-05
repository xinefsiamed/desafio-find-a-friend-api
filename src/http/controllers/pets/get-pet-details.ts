import { PetNotExistsError } from "@/use-cases/errors/animal-not-exists-error";
import { makeFetchPetDetailsUseCase } from "@/use-cases/factories/make-fetch-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParams = z.object({
    id: z.string().cuid2(),
  });

  try {
    const { id } = getPetDetailsParams.parse(request.params);

    const fetchPetDetailsUseCase = makeFetchPetDetailsUseCase();

    const { pet } = await fetchPetDetailsUseCase.execute({ id });

    return reply.send(pet);
  } catch (err) {
    if (err instanceof PetNotExistsError) {
      return reply.status(403).send({ message: err.message });
    }

    reply.status(500).send();
  }
}
