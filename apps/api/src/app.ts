import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { healthRoutes } from "./routes/health.js";

export async function buildApp() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(prismaPlugin);
  await fastify.register(healthRoutes);

  return fastify;
}
