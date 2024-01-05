import { NgoNotFoundError } from "@/use-cases/errors/ngo-not-found";
import { makeFetchNgoById } from "@/use-cases/factories/make-fetch-ngo-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getNGOInfoById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getNGOInfoByIdParams = z.object({
    id: z.string().cuid2(),
  });

  try {
    const { id } = getNGOInfoByIdParams.parse(request.params);

    const fetchNgoById = makeFetchNgoById();

    const ngo = await fetchNgoById.execute(id);

    return reply.send(ngo);
  } catch (err) {
    if (err instanceof NgoNotFoundError) {
      return reply.status(403).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
