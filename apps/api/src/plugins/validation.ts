import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

async function validationPlugin(fastify: FastifyInstance) {
  // Add schema controller for Zod validation
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
}

export default fp(validationPlugin);
