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
}

start();
