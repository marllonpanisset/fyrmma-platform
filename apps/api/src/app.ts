import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import errorHandlerPlugin from "./plugins/error-handler.js";
import validationPlugin from "./plugins/validation.js";
import { healthRoutes } from "./routes/health.js";

export async function buildApp() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(prismaPlugin);
  await fastify.register(errorHandlerPlugin);
  await fastify.register(validationPlugin);
  await fastify.register(healthRoutes);

  return fastify;
}
