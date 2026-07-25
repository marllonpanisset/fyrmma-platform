import Fastify from "fastify";
import { prisma } from "@fyrmma/database";
import type { HealthStatus, ReadyStatus } from "@fyrmma/shared";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";

const fastify = Fastify({
  logger: true,
});

fastify.get("/health", async (): Promise<HealthStatus> => {
  return { status: "ok" };
});

fastify.get("/health/ready", async (): Promise<ReadyStatus> => {
  await prisma.$queryRaw`SELECT 1`;
  return { status: "ok" };
});

async function start() {
  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
