import fp from "fastify-plugin";
import { prisma } from "@fyrmma/database";
import { FastifyInstance } from "fastify";

async function prismaPlugin(fastify: FastifyInstance) {
  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
}

declare module "fastify" {
  interface FastifyInstance {
    prisma: typeof prisma;
  }
}

export default fp(prismaPlugin);
