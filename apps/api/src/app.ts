import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import errorHandlerPlugin from "./plugins/error-handler.js";
import validationPlugin from "./plugins/validation.js";
import requestContextPlugin from "./plugins/request-context.js";
import securityPlugin from "./plugins/security.js";
import rateLimitPlugin from "./plugins/rate-limit.js";
import { healthRoutes } from "./routes/health.js";
import { env } from "./config/index.js";

export async function buildApp() {
  const fastify = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "info" : "debug",
      transport:
        env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
    },
  });

  await fastify.register(prismaPlugin);
  await fastify.register(errorHandlerPlugin);
  await fastify.register(validationPlugin);
  await fastify.register(securityPlugin);
  await fastify.register(rateLimitPlugin);
  await fastify.register(requestContextPlugin);
  await fastify.register(healthRoutes);

  return fastify;
}
