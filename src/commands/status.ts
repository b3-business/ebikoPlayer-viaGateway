import { SlashCommandBuilder } from "discord.js";
import { getAudioPlayer } from "../player.ts";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction.ts";
import { getPlayerStatusState } from "../util/playerStatusState.ts";

export const data = new SlashCommandBuilder()
  .setName("status")
  .setDescription("Returns Current Bot Status in an overview.");

export async function execute(rawInteraction: Interaction) {
  const playerStatusState = getPlayerStatusState();

  const player = getAudioPlayer();

  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(`Interaction is not valid: `, result);
    return;
  }

  const { interaction } = result;

  const returnMessage = [
    `Player Status: ${player.state.status}`,
    `Current Track: ${playerStatusState.title}`,
    `${playerStatusState.progress()} / totalTime ( Timer for current track )`,
    `Queue: TODO`,
    `Playing: ${playerStatusState.playing}`,
    `Guild: ${playerStatusState.guild}`,
    `Channel: ${playerStatusState.channel}`,
    `Voice Connection Status: ${playerStatusState.connection?.state.status}`,
  ];

  await interaction.reply({
    content: returnMessage.join("\n"),
    ephemeral: true,
  });
}
