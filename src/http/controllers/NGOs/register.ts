import { NGOAlreadyExistsError } from "@/use-cases/errors/ngo-already-exists-error";
import { makeCreateNgoUseCase } from "@/use-cases/factories/make-create-ngo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    phone: z.string(),
    password: z.string(),
    email: z.string().email(),
    cep: z.string().min(8).max(8),
    street: z.string(),
    district: z.string(),
    city: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const data = registerBodySchema.parse(request.body);

  try {
    const createNgoUseCase = makeCreateNgoUseCase();

    await createNgoUseCase.execute(data);
  } catch (err) {
    if (err instanceof NGOAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
