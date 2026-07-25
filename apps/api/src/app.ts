import Fastify from "fastify";
import { prisma } from "@fyrmma/database";
import type { HealthStatus, ReadyStatus } from "@fyrmma/shared";

export async function buildApp() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get<{ Reply: HealthStatus }>("/health", async () => {
    return { status: "ok" };
  });

  fastify.get<{ Reply: ReadyStatus }>("/health/ready", async () => {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "ok" };
  });

  return fastify;
}
