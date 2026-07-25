import { buildApp } from "./app.js";
import { env } from "./config/index.js";

async function start() {
  const fastify = await buildApp();
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  const shutdown = async (signal: string) => {
    fastify.log.info(`Received ${signal}, shutting down gracefully`);
    try {
      await fastify.close();
      process.exit(0);
    } catch (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start();
