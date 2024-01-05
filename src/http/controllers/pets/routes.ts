import { verifyJWT } from "@/http/middlewares/verify-Jwt";
import { FastifyInstance } from "fastify";
import { registerPet } from "./register";
import { getPetsByCity } from "./get-pets-by-city";
import { getPetDetails } from "./get-pet-details";

export async function PetsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, registerPet);
  app.get("/pets/:city_name", getPetsByCity);
  app.get("/pets/:id/details", getPetDetails);
}
