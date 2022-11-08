import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { initAudioPlayer } from "./src/player.js";
import type { Command } from "./src/types/Command";

const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  const commands = new Collection<string, Command>();

  const commandsPath = path.join(__dirname, "src", "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }

  client.once(Events.ClientReady, () => {
    initAudioPlayer();
    console.log("Ready!");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(DISCORD_TOKEN);
}

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
