import { Interaction, VoiceChannel } from "discord.js";
import { validateInteraction } from "./validateInteraction.ts";
import {
  AudioResource,
  getVoiceConnection,
  VoiceConnection,
} from "@discordjs/voice";

type playerStatusState = {
  composer: string;
  title: string;
  album: string;
  artist: string;
  lenght: number;
  resource: AudioResource | undefined;
  progress: () => string;
  queue: string[];
  playing: boolean;
  guild: string;
  channel: string;
  connection: VoiceConnection | undefined;
};

const playerStatusStateDefault: playerStatusState = {
  composer: "",
  title: "",
  album: "",
  artist: "",
  lenght: 0,
  resource: undefined,
  progress: getDuration,
  queue: [],
  playing: false,
  guild: "",
  channel: "",
  connection: undefined,
};

let playerStatusState: playerStatusState | undefined = undefined;

export function getPlayerStatusState() {
  if (!playerStatusState) playerStatusState = { ...playerStatusStateDefault };
  return playerStatusState;
}

export function getDuration() {
  const time_MS = playerStatusState?.resource?.playbackDuration;
  if (!time_MS) return "0:00";
  const time = time_MS / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function updatePlayerStatusState(
  interaction: Interaction,
  srcPath: string | undefined,
  resource: AudioResource | undefined,
) {
  // update the player status state
  const playerStatusState = getPlayerStatusState();
  const result = validateInteraction(interaction);
  if (result instanceof Error) {
    console.error(`Interaction is not valid: `, result);
    return;
  }

  const { guild } = result;

  // get the voice connection
  const connection = playerStatusState.connection ??
    getVoiceConnection(guild.id);

  playerStatusState.connection = connection;

  if (connection?.joinConfig.channelId) {
    interaction.client.channels.fetch(connection.joinConfig.channelId)
      .then((channel) => {
        if (channel instanceof VoiceChannel) {
          playerStatusState.channel = channel.name;
        }
      });

    playerStatusState.guild = guild.name;
  }

  if (resource) {
    playerStatusState.resource = resource;
  }

  if (srcPath) {
    const filename = srcPath.split("/").pop();

    // trim filename after ? if it exists
    if (filename?.includes("?")) {
      playerStatusState.title = filename.split("?")[0];
    } else {
      playerStatusState.title = filename ?? "";
    }
  }
}
