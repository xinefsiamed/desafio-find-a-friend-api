import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { NGOsRoutes } from "./http/controllers/NGOs/routes";
import { fastifyJwt } from "@fastify/jwt";
import { PetsRoutes } from "./http/controllers/pets/routes";
import { fastifyCookie } from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(NGOsRoutes);
app.register(PetsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
