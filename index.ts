import { clientPromise } from "./src/util/DiscordClient.ts";
import Express from "express";

const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");

async function main() {
  const client = await clientPromise;
  await client.login(DISCORD_TOKEN);
}

/**
 * Adding some api routes to this discord bot server
 * NOTE: Use Bao when using bun for running! (Faster than express)
 * Currently simply uses express
 */
const port = Deno.env.get("PORT") ?? 3000;

// const app = new Bao();
// app.get("/health", (c) => {
//   return c.sendText("Healthcheck successful", { status: 200 });
// });

const app = Express();
app.get(`/health`, (req, res, next) => {
  res.send("Healthcheck successful");
});

const server = app.listen({ port: port });
console.log(`Server listening on Port ${port}`);

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
