import { clientPromise } from "./src/util/DiscordClient";
import Bao from "baojs";
const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = await clientPromise;
  await client.login(DISCORD_TOKEN);
}

/**
 * Adding some api routes to this discord bot server
 */
const app = new Bao();
const port = parseInt(process.env.PORT || "3000");

app.get("/health", (c) => {
  return c.sendText("Healthcheck successful", { status: 200 });
});

/**
 * Run main function and catch top-level errors
 */
const server = app.listen({ port: port });
console.log(`Server listening on ${server.hostname}:${port}`);

main().catch((error) => {
  console.error(error);
});
