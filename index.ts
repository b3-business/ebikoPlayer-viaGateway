import { Client, Events, GatewayIntentBits } from "discord.js";
import { initAudioPlayer } from "./src/player.js";
import { loadCommands } from "./src/util/loadCommands";

const { DISCORD_TOKEN } = process.env;

async function main() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  const commands = await loadCommands();

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

  global.client=client;

  client.login(DISCORD_TOKEN);
}

/**
 * Run main function and catch top-level errors
 */
main().catch((error) => {
  console.error(error);
});
