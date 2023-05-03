import { AudioPlayer, createAudioPlayer, AudioPlayerStatus} from "@discordjs/voice";

import { getPlayerStatusState } from "./util/playerStatusState";

let playerStatusState = getPlayerStatusState();

let player: AudioPlayer;

export function initAudioPlayer() {
  player = createAudioPlayer();
  playerStatusState = getPlayerStatusState();
  
  // FIXME: Set Activity not working, global.client is available! 

  player.on(AudioPlayerStatus.Idle, () => {
    console.log("Audio player is idle");
    playerStatusState.playing = false;
    global.client?.user.setActivity("Status idle", { type: "LISTENING" });
  }
  );

  player.on(AudioPlayerStatus.Playing, () => {
    console.log("Audio player is playing");
    playerStatusState.playing = true;
    global.client?.user.setActivity("Status playing audio", { type: "PLAYING" });
  }
  );
}

export function getAudioPlayer() {
  if (!player) initAudioPlayer();
  return player;
}
