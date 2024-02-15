import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";

export const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stops playback of current resource.");

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, member, guild } = result;
  // get the connection
  const connection = getVoiceConnection(guild.id);

  // if there is no connection, return
  if (!connection) {
    await interaction.reply({
      content: "I am not in a voice channel!",
      ephemeral: true,
    });
    return;
  }

  // stop the player
  getAudioPlayer().stop();

  await interaction.reply({ content: "Stopped!", ephemeral: true });
}
