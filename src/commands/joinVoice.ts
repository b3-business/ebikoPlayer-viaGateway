import { joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import { Interaction, SlashCommandBuilder } from "discord.js";
import { getAudioPlayer } from "../player.ts";
import { validateInteraction } from "../util/validateInteraction.ts";

export const data = new SlashCommandBuilder()
  .setName("joinvoice")
  .setDescription("Joins the specified voice channel.");

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, member, guild } = result;

  const voiceChannelId = member.voice.channelId ?? "";
  const voiceChannel = guild.channels.cache.get(voiceChannelId);
  if (!voiceChannel) {
    await interaction.reply({
      content: "You are not in a voice Channel. Please join one.",
      ephemeral: true,
    });
    return;
  }
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });

  connection.on(VoiceConnectionStatus.Ready, () => {
    console.log("Voice Ready!");
    const player = getAudioPlayer();
    connection.subscribe(player);
  });

  await interaction.reply({ content: "Joined!", ephemeral: true });
}
