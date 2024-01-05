import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petRequestBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["puppy", "young", "adult", "senior"]),
    size: z.enum(["small", "medium", "large"]),
    type: z.enum(["dog", "cat"]),
    energy: z.number().int().min(1).max(5),
    gender: z.enum(["male", "female"]),
    independency_level: z.enum(["low", "average", "high"]),
    ambient_type: z.enum(["spacious", "moderate", "compact"]),
    requirementsForAdoption: z.array(
      z.object({
        description: z.string(),
      }),
    ),
  });

  try {
    const {
      name,
      about,
      age,
      size,
      type,
      energy,
      gender,
      independency_level,
      ambient_type,
      requirementsForAdoption,
    } = petRequestBodySchema.parse(request.body);

    const ngo_id = request.user.sub;

    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
      name,
      about,
      age,
      size,
      type,
      energy,
      gender,
      independency_level,
      ambient_type,
      ngo_id,
      requirementsForAdoption,
    });

    return reply.status(201).send();
  } catch (err) {
    return reply.status(500).send();
  }
}
