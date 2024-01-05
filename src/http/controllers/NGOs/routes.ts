import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { getNGOInfoById } from "./get-NGO-info-by-id";

export async function NGOsRoutes(app: FastifyInstance) {
  app.post("/ngos", register);
  app.post("/ngo/authenticate", authenticate);
  app.get("/ngo/:id", getNGOInfoById);
}
