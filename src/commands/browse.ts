import { Interaction, SlashCommandBuilder } from "discord.js";
import { validateInteraction } from "../util/validateInteraction";
import { createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { sources } from "../music/sources";
import { getAudioPlayer } from "../player";
import { bucketName, minioClientPromise } from "../storage/minio-client";

export const data = new SlashCommandBuilder()
  .setName("browse")
  .setDescription("Browses music data on minio (S3)");

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
    components: [
      {
        // Action Row
        type: 1,
        components: [
          {
            type: 3,
            custom_id: "select",
            options: [
              {
                label: "Select me",
                value: "select_me",
              },
              {
                label: "Select me",
                value: "select_me1",
              },
              {
                label: "Select me",
                value: "select_me2",
              },
              {
                label: "Select me",
                value: "select_me3",
              },
              {
                label: "Select me",
                value: "select_me4",
              },
              {
                label: "Select me",
                value: "select_me5",
              },
              {
                label: "Select me",
                value: "select_me6",
              },
              {
                label: "Select me",
                value: "select_me7",
              },
              {
                label: "Select me",
                value: "select_me8",
              },
              {
                label: "Select me",
                value: "select_me9",
              },
              {
                label: "Select me",
                value: "select_me10",
              },
              {
                label: "Select me",
                value: "select_me11",
              },
              {
                label: "Select me",
                value: "select_me12",
              },
              {
                label: "Select me",
                value: "select_me13",
              },
              {
                label: "Select me",
                value: "select_me14",
              },
              {
                label: "Select me",
                value: "select_me15",
              },
              {
                label: "Select me",
                value: "select_me16",
              },
              {
                label: "Select me",
                value: "select_me17",
              },
              {
                label: "Select me",
                value: "select_me18",
              },
              {
                label: "Select me",
                value: "select_me19",
              },
              {
                label: "Select me",
                value: "select_me20",
              },
              {
                label: "Select me",
                value: "select_me21",
              },
              {
                label: "Select me",
                value: "select_me22",
              },
              {
                label: "Select me",
                value: "select_me23",
              },
              {
                label: "Select me",
                value: "select_me24",
              },
            ],
          },
        ],
      },
    ],
  });
}
