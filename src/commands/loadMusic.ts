import { SlashCommandBuilder } from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { sources } from "../music/sources";

export const data = new SlashCommandBuilder()
  .setName("loadmusic")
  .setDescription("Loads a new music resource.")
  .addStringOption((option) =>
    option
      .setName("src")
      .setDescription("Select the audio source (currently only 2 options)")
      .setRequired(true)
      .addChoices(
        { name: "Basti", value: "bastiPath" },
        { name: "Benny", value: "bennyPath" },
        { name: "Anfangsmusik", value: "anfang" },
        { name: "Abschlussmusik", value: "ende" },
        { name: "URL", value: "url" },
      )
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

  const srcPath = sources[srcOption];
  const player = getAudioPlayer();
  const resource = createAudioResource(srcPath);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({ content: `Loaded ${srcOption}`, ephemeral: true });
}
