import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import {
  AutocompleteInteraction,
  Interaction,
  SlashCommandBuilder,
} from "discord.js";
import { getAudioPlayer } from "../player";
import {
  bucketName,
  fsCache,
  minioClientPromise,
} from "../storage/minio-client";
import { validateInteraction } from "../util/validateInteraction";

export const data = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search for music on minIO")
  .addStringOption((option) =>
    option.setName("query").setDescription("The search query").setRequired(true)
      .setAutocomplete(true)
  );

async function ebikoAutocomplete(
  query: string,
) {
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

    const finalSlash = folder?.includes(".") ? "" : "/";
    // return full path name
    return query + folder + finalSlash;
  });

  const uniqueFolders = [...new Set(possibleFolders)];

  if (uniqueFolders.length > 25) {
    return [{
      name: "Too many results",
      value: `${query}/`,
    }];
  }

  return uniqueFolders.map((item) => ({
    // WIP: better query display
    // name: `${item}`.slice(query.lastIndexOf("/") + 1) ?? "",
    name: item ?? "",
    value: item ?? "",
  }));
}

export async function handleAutocompleteInteraction(
  interaction: AutocompleteInteraction,
) {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name === "query") {
    const query = focusedOption.value as string;

    // bjesuiter experiment: fuzzy autocomplete
    // const autocompleteOptions = fuseAutocomplete(query);

    // ebiko experiment: folder autocomplete
    const autocompleteOptions = await ebikoAutocomplete(
      query,
    );

    await interaction.respond(autocompleteOptions);
  }
}

export async function execute(rawInteraction: Interaction) {
  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, guild } = result;

  //   await interaction.reply({
  //     content: `Selected ${result.interaction.options.getString("query")}`,
  //     ephemeral: false,
  //   });

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

  const srcPath = interaction.options.getString("query");

  if (!srcPath) {
    await interaction.reply({
      content: "No srcPath provided",
      ephemeral: true,
    });
    return;
  }

  const minio = await minioClientPromise;
  const audioUrlPresigned = await minio.presignedUrl(
    "GET",
    bucketName,
    srcPath,
  );

  const player = getAudioPlayer();
  const resource = createAudioResource(audioUrlPresigned);

  // play the player with the new resouce
  player.play(resource);

  await interaction.reply({
    content: `Loaded ${srcPath} from minIO!`,
    ephemeral: true,
  });
}
