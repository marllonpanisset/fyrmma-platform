import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { env } from "../config/index.js";

async function securityPlugin(fastify: FastifyInstance) {
  // Register security headers
  await fastify.register(helmet);

  // Register CORS
  await fastify.register(cors, {
    origin: env.CORS_ORIGIN,
  });
}

export default fp(securityPlugin);
