import { Client, Events, GatewayIntentBits } from "discord.js";
import { initAudioPlayer } from "../player";
import { loadCommands } from "./loadCommands";
import { handleMessageComponentInteractions } from "../commands/browse";
import {
  data as searchCommand,
  handleAutocompleteInteraction,
} from "../commands/search";

export const clientPromise: Promise<Client> = createClient();

async function createClient() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  const commands = await loadCommands();

  client.once(Events.ClientReady, () => {
    initAudioPlayer();
    console.log("Ready!");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (
      interaction.isAutocomplete() &&
      interaction.commandName === searchCommand.name
    ) {
      handleAutocompleteInteraction(interaction);
    }

    if (
      interaction.isMessageComponent() &&
      interaction.customId === "browse_select"
    ) {
      handleMessageComponentInteractions(interaction);
    }

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

  return client;
}
