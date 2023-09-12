import { Hono } from "hono";
import { clientPromise } from "./src/util/DiscordClient";
const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = await clientPromise;
  await client.login(DISCORD_TOKEN);
}

/**
 * Adding some api routes to this discord bot server
 */
const app = new Hono();
app.get("/health", (c) => {
  return c.text("Healthcheck successful", 204);
});

export default {
  port: 3000,
  fetch: app.fetch,
};

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
