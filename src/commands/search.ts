import { AutocompleteInteraction, SlashCommandBuilder } from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { sources } from "../music/sources";
import { fsCache } from "../storage/minio-client";

export const data = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search for music on minIO")
  .addStringOption((option) =>
    option.setName("query").setDescription("The search query").setRequired(true)
      .setAutocomplete(true)
  );

export async function handleAutocompleteInteraction(
  interaction: AutocompleteInteraction,
) {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name === "query") {
    const query = focusedOption.value as string;
    const possibleChoices = fsCache.filter((item) =>
      item.size > 0 && item.name?.startsWith(query)
    );

    // 'Bruno Gröning - Freundeskreis_MP3/Mitsing CD 2003_MP3/02 Der Heilstrom.mp3',
    // query: "Br"
    const possibleFolders = possibleChoices.map((item) => {
      // subtract the query from the name
      const name = item.name?.substring(query.length);
      // get the first folder/item
      const folder = name?.split("/")[0];
      // return full path name
      return query + folder + "/";
    });

    const uniqueFolders = [...new Set(possibleFolders)];

    if (uniqueFolders.length > 25) {
      await interaction.respond(
        [{
          name: "Too many results",
          value: `${query}/`,
        }],
      );
      return;
    }

    await interaction.respond(
      uniqueFolders.map((item) => ({
        name: item ?? "",
        value: item ?? "",
      })),
    );
  }
}

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, guild } = result;

  await interaction.reply({
    content: `Selected ${result.interaction.options.getString("query")}`,
    ephemeral: false,
  });

  return;

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

  const srcPath = sources.anfang.pathOrUrl;
  const player = getAudioPlayer();
  const resource = createAudioResource(srcPath);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({ content: `Loaded ${srcPath}`, ephemeral: true });
}
