const { VoiceConnectionStatus, createAudioResource, createAudioPlayer } = require('@discordjs/voice');

let player;

function getAudioPlayer() {
    if (!player) player = createAudioPlayer(); 
    return player;
}


module.exports = {
    getAudioPlayer
}