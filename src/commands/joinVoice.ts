import { SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { VoiceConnectionStatus } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { isGuildMember } from "../util/isGuildMember";
import { validateInteraction } from "../util/validateInteraction";

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
