import { Interaction, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import { validateInteraction } from "../util/validateInteraction.ts";

export const data = new SlashCommandBuilder()
  .setName("leavevoice")
  .setDescription("Leaves from the voice channel.");

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, guild } = result;

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

  // destroy the connection
  connection.destroy();
  await interaction.reply({ content: "Left Voice Channel!", ephemeral: true });
}
