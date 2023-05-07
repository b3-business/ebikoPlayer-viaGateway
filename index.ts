import { clientPromise } from "./src/util/clientSingleton";
const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = await clientPromise;
  await client.login(process.env.DISCORD_TOKEN);
}

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
