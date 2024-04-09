import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player.ts";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction.ts";

export const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pauses playback of current resource.");

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

  // play the player with the current resouce
  getAudioPlayer().pause();

  await interaction.reply({ content: "Pause!", ephemeral: true });
}
