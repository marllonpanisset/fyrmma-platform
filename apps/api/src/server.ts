import Fastify from "fastify";
import { prisma } from "@fyrmma/database";
import type { HealthStatus, ReadyStatus } from "@fyrmma/shared";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";

const fastify = Fastify({
  logger: true,
});

fastify.get<RouteHandler<HealthStatus>>("/health", async () => {
  return { status: "ok" };
});

fastify.get<RouteHandler<ReadyStatus>>("/health/ready", async () => {
  await prisma.$queryRaw`SELECT 1`;
  return { status: "ok" };
});

// Helper type to ensure Fastify routes are correctly typed without conflicting with the handler signature
type RouteHandler<T> = (request: any, reply: any) => Promise<T> | T;

async function start() {
  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
