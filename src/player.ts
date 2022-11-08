import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";

let player: AudioPlayer;

export function initAudioPlayer() {
  player = createAudioPlayer();
}

export function getAudioPlayer() {
  if (!player) initAudioPlayer();
  return player;
}
