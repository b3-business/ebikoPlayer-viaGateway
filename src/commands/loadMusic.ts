import { SlashCommandBuilder } from "discord.js";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { getAudioPlayer } from "../player";
import { Interaction } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";

const sources = {
  bennyPath: "/Users/bjesuiter/02 The Saddest Noise.m4a",
  anfang:
    "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Lebenstanz/04 Aufbruch zur Burg.mp3",
  ende:
    "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Weit/1-03 Moment mal.m4a",
  bastiPath: "/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3",
  url:
    "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5ef06db148ba07a7/5fd95c9a752123476ba05287/TFT_Club2021_Mus_Full_MasterQC_201012.mp3",
};

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
