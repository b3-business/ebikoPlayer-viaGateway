const { createAudioPlayer } = require('@discordjs/voice');

let player;


function initAudioPlayer() {
   player = createAudioPlayer(); 
}

function getAudioPlayer() {
    if (!player) initAudioPlayer(); 
    return player;
}


module.exports = {
    getAudioPlayer
}