import { APIInteractionGuildMember, GuildMember } from "discord.js";

export function isGuildMember(
  member: GuildMember | APIInteractionGuildMember,
): member is GuildMember {
  return member instanceof GuildMember;
}
