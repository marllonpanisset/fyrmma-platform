import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Fyrmma API",
        description: "Fyrmma platform API documentation",
        version: "0.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
  });
}

export default fp(swaggerPlugin);
