import {
  Interaction,
  MessageComponentInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { sources } from "../music/sources";
import { getAudioPlayer } from "../player";
import { bucketName, minioClientPromise } from "../storage/minio-client";
import { clientPromise } from "../util/DiscordClient";

export const data = new SlashCommandBuilder()
  .setName("browse")
  .setDescription("Browses music data on minio (S3)");

export async function handleMessageComponentInteractions(
  interaction: MessageComponentInteraction,
) {
  await interaction.update({ content: "You selected me!", components: [] });
}

export async function execute(rawInteraction: Interaction) {
  const minioClient = await minioClientPromise;

  const result = validateInteraction(rawInteraction);
  if (result instanceof Error) {
    console.error(result.message);
    return;
  }
  const { interaction, guild } = result;

  // get the voice connection
  const connection = getVoiceConnection(guild.id);

  // if there is no connection, return
  //   if (!connection) {
  //     await interaction.reply({
  //       content: "I am not in a voice channel!",
  //       ephemeral: true,
  //     });
  //     return;
  //   }

  const objectList = minioClient.listObjectsV2(bucketName, "", false);

  objectList.on("data", function (obj) {
    console.log(obj);
  });

  await interaction.reply({
    content: `This is a browser`,
    ephemeral: false,
    fetchReply: true,
    components: [
      {
        // Action Row
        type: 1,
        components: [
          {
            type: 3,
            custom_id: "browse_select",
            options: [
              {
                label: "Select me",
                value: "select_me",
              },
            ],
          },
        ],
      },
    ],
  });
}
