import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import rateLimit from "@fastify/rate-limit";

async function rateLimitPlugin(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: 100, // max requests per window
    timeWindow: 1000 * 60, // 1 minute
  });
}

export default fp(rateLimitPlugin);
