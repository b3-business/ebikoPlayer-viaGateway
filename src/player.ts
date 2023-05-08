import { ActivityType } from "discord.js";
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
} from "@discordjs/voice";

import { getPlayerStatusState } from "./util/playerStatusState";

import { clientPromise } from "./util/clientSingleton";

let playerStatusState = getPlayerStatusState();

let player: AudioPlayer;

export async function initAudioPlayer() {
  const client = await clientPromise;

  player = createAudioPlayer();
  playerStatusState = getPlayerStatusState();

  // FIXME: Set Activity not working, global.client is available!

  player.on(AudioPlayerStatus.Idle, () => {
    console.log("Audio player is idle");
    playerStatusState.playing = false;
    try {
      client.user?.setActivity({
        name: "Commands: /play /loadurl /loadmusic",
        type: ActivityType.Listening,
      });
    } catch (error) {
      console.error(error);
    }
  });

  player.on(AudioPlayerStatus.Playing, () => {
    console.log("Audio player is playing");
    playerStatusState.playing = true;
    try {
      client.user?.setActivity({
        name: `"${playerStatusState.title}"`,
        type: ActivityType.Listening,
      });
    } catch (error) {
      console.error(error);
    }
  });

  player.on(AudioPlayerStatus.Paused, () => {
    console.log("Audio player is paused");
    playerStatusState.playing = false;
    try {
      client.user?.setActivity({
        type: ActivityType.Listening,
        name: `"Paused"`,
      });
    } catch (error) {
      console.error(error);
    }
  });

  console.time("Audio player is ready");
}

export function getAudioPlayer() {
  if (!player) initAudioPlayer();
  return player;
}
