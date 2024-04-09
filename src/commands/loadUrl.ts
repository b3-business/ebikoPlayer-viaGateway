import { SlashCommandBuilder } from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player.ts";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction.ts";
import { updatePlayerStatusState } from "../util/playerStatusState.ts";

export const data = new SlashCommandBuilder()
  .setName("loadurl")
  .setDescription("Loads a new music resource from url.")
  .addStringOption((option) =>
    option
      .setName("url")
      .setDescription(
        "The public url to load the audio from (mp3, ogg, m4a-ALAC, etc.)",
      )
      .setRequired(true)
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

  const url = interaction.options.getString("url") ?? "";
  console.log(url);

  const player = getAudioPlayer();
  const resource = createAudioResource(url);

  // update the player status state
  updatePlayerStatusState(interaction, url, resource);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({ content: `Loaded "${url}"`, ephemeral: true });
}
