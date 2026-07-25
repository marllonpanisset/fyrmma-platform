import { FastifyInstance } from "fastify";
import type { HealthStatus, ReadyStatus } from "@fyrmma/shared";

export async function healthRoutes(fastify: FastifyInstance) {
  // Liveness check: confirms process is alive
  fastify.get<{ Reply: HealthStatus }>("/health/live", async () => {
    return { status: "ok" };
  });

  // Readiness check: confirms database connectivity
  fastify.get<{ Reply: ReadyStatus }>("/health/ready", async () => {
    await fastify.prisma.$queryRaw`SELECT 1`;
    return { status: "ok" };
  });
}
