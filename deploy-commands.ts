import { REST, Routes } from "discord.js";
import { loadCommands } from "./src/util/loadCommands";

async function main() {
  const commands = await loadCommands().then((commands) =>
    commands.map((command) => command.data.toJSON())
  );

  const { DISCORD_TOKEN, CLIENT_ID, BRUDI_GUILD_ID, BGF_GUILD_ID } =
    process.env;

  if (!DISCORD_TOKEN) throw new Error(`Missing DISCORD_TOKEN!`);
  if (!CLIENT_ID) throw new Error(`Missing CLIENT_ID!`);
  if (!BRUDI_GUILD_ID) throw new Error(`Missing BRUDI_GUILD_ID!`);
  if (!BGF_GUILD_ID) throw new Error(`Missing BGF_GUILD_ID!`);

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  // and deploy your commands!
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    // refresh all commands on brudi server
    const brudiResult = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, BRUDI_GUILD_ID),
      { body: commands },
    ) as { length: number };

    console.log(
      `Successfully reloaded ${brudiResult.length} application (/) commands on Server "Brudi Chat".`,
    );

    // refresh all commands on bgf server
    const bgfResult = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, BGF_GUILD_ID),
      { body: commands },
    ) as { length: number };

    console.log(
      `Successfully reloaded ${bgfResult.length} application (/) commands on Server "BGF Runde".`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
