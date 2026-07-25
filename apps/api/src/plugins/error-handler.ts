import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";

async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    // Validation errors (Zod)
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          issues: error.issues,
          requestId: request.id,
        },
      });
    }

    // Custom App Errors
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          requestId: request.id,
        },
      });
    }

    // Unknown errors
    fastify.log.error(error);

    return reply.status(500).send({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
        requestId: request.id,
      },
    });
  });
}

export default fp(errorHandlerPlugin);
