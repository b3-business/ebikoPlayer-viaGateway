import { SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { VoiceConnectionStatus } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { isGuildMember } from "../util/isGuildMember";

export const data = new SlashCommandBuilder()
  .setName("joinvoice")
  .setDescription("Joins the specified voice channel.");

export async function execute(interaction: Interaction) {
  if (!interaction) {
    console.error(`Tried to execute a command without an interaction`);
    return;
  }

  if (!interaction.isChatInputCommand()) {
    console.info(`Interaction is not a ChatInputCommand: `, interaction);
    return;
  }

  const member = interaction.member;
  if (member === null || !isGuildMember(member)) {
    console.error(`interaction.member is not a GuildMember`);
    return;
  }

  const guild = interaction.guild;
  if (!guild) {
    console.error(`Interaction has no guild attached! `, interaction);
    return;
  }

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
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });

  connection.on(VoiceConnectionStatus.Ready, () => {
    console.log("Voice Ready!");
    const player = getAudioPlayer();
    connection.subscribe(player);
  });

  await interaction.reply({ content: "Joined!", ephemeral: true });
}
