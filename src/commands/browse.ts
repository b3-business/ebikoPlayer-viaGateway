import { Interaction, SlashCommandBuilder } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { sources } from "../music/sources";
import { getAudioPlayer } from "../player";

export const data = new SlashCommandBuilder()
  .setName("browse")
  .setDescription("Browses music data on minio (S3)");

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
  //   if (!connection) {
  //     await interaction.reply({
  //       content: "I am not in a voice channel!",
  //       ephemeral: true,
  //     });
  //     return;
  //   }

  await interaction.reply({ content: `This is a browser`, ephemeral: false });
}
