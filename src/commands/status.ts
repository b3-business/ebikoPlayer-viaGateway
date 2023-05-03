import { SlashCommandBuilder } from "discord.js";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { getPlayerStatusState } from "../util/playerStatusState";

function calcTime(time_MS: number|undefined) {
  if (!time_MS) return "0:00";
  const time = time_MS / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

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
    `${calcTime(playerStatusState.resource?.playbackDuration)} / totalTime ( Timer for current track )`,
    `Queue: TODO`,
    `Playing: ${playerStatusState.playing}`,
    `Guild: ${playerStatusState.guild}`,
    `Channel: ${playerStatusState.channel}`,
    `Voice Connection Status: ${playerStatusState.connection?.state.status}`
  ]

  await interaction.reply({ content: returnMessage.join("\n"), ephemeral: true });
}
