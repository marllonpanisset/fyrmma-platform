import { FastifyInstance } from "fastify";
import type { HealthStatus, ReadyStatus } from "@fyrmma/shared";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get<{ Reply: HealthStatus }>("/health", async () => {
    return { status: "ok" };
  });

  fastify.get<{ Reply: ReadyStatus }>("/health/ready", async () => {
    await fastify.prisma.$queryRaw`SELECT 1`;
    return { status: "ok" };
  });
}
