import {
  BaseGuildVoiceChannel,
  SlashCommandBuilder,
  VoiceChannel,
} from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player.ts";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction.ts";
import { sources } from "../music/sources.ts";
import { updatePlayerStatusState } from "../util/playerStatusState.ts";

export const data = new SlashCommandBuilder()
  .setName("loadmusic")
  .setDescription("Loads a new music resource.")
  .addStringOption((option) =>
    option
      .setName("src")
      .setDescription("Select the audio source (currently only 2 options)")
      .setRequired(true)
      .addChoices(...Object.values(sources))
  );

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
  if (!connection) {
    await interaction.reply({
      content: "I am not in a voice channel!",
      ephemeral: true,
    });
    return;
  }

  const srcOption = interaction.options.getString("src") ?? "";
  console.log(srcOption);

  // @ts-expect-error TODO: Fix later
  const srcPath = sources[srcOption].pathOrUrl;
  const player = getAudioPlayer();
  const resource = createAudioResource(srcPath);

  // update the player status state
  updatePlayerStatusState(interaction, srcPath, resource);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({ content: `Loaded ${srcOption}`, ephemeral: true });
}
