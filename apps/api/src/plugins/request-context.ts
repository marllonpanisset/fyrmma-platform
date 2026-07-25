import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";

async function requestContextPlugin(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    // Generate requestId if it's not set
    if (!request.id) {
      request.id = randomUUID();
    }
    // Set header for client reference
    reply.header("x-request-id", request.id);
  });
}

export default fp(requestContextPlugin);
