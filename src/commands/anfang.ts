import { SlashCommandBuilder } from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player.ts";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction.ts";
import { sources } from "../music/sources.ts";

export const data = new SlashCommandBuilder()
  .setName("anfang")
  .setDescription("Loads the music resource for Anfang.");

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, guild } = result;

  // get the voice connection
  const connection = getVoiceConnection(guild.id);

  // if there is no connection, return
  if (!connection) {
    await interaction.reply({
      content: "I am not in a voice channel!",
      ephemeral: true,
    });
    return;
  }

  const srcPath = sources.anfang.pathOrUrl;
  const player = getAudioPlayer();
  const resource = createAudioResource(srcPath);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({ content: `Loaded ${srcPath}`, ephemeral: true });
}
