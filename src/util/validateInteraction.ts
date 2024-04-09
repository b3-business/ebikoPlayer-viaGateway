import { Interaction } from "discord.js";
import { isGuildMember } from "./isGuildMember.ts";

export function validateInteraction(interaction: Interaction) {
  if (!interaction) {
    console.error(`Tried to execute a command without an interaction`);
    return new Error(`EXECUTION_MISSES_INTERACTION`);
  }

  if (!interaction.isChatInputCommand()) {
    console.info(`Interaction is not a ChatInputCommand: `, interaction);
    return new Error(`NO_CHAT_COMMAND`);
  }

  const member = interaction.member;
  if (member === null || !isGuildMember(member)) {
    console.error(`interaction.member is not a GuildMember`, interaction);
    return new Error(`MEMBER_IS_NOT_A_GUILD_MEMBER`);
  }

  const guild = interaction.guild;
  if (!guild) {
    console.error(`Interaction has no guild attached! `, interaction);
    return new Error(`INTERACTION_MISSES_GUILD`);
  }

  return { interaction, member, guild };
}
