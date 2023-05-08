import { clientPromise } from "./src/util/DiscordClient";
const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = await clientPromise;
  await client.login(DISCORD_TOKEN);
}

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
