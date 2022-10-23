const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { getAudioPlayer } = require('../player');

const sources = {
    'bennyPath': '/Users/bjesuiter/02 The Saddest Noise.m4a', 
    'bastiPath': '/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loadmusic')
        .setDescription('Loads a new music resource.')
        .addStringOption((option) => 
            option.setName('src')
            .setDescription('Select the audio source (currently only 2 options)')
            .setRequired(true)
            .addChoices({name: 'Basti', value: "bastiPath"}, {name: 'Benny', value: 'bennyPath'})
        ),

    async execute(interaction) {

        // get the connection
        const connection = getVoiceConnection(interaction.guild.id);

        // if there is no connection, return
        if (!connection) {
            await interaction.reply({ content: 'I am not in a voice channel!', ephemeral: true });
            return;
        }

        const srcOption = interaction.options.getString('src');
        console.log(srcOption);
        
        const srcPath = sources[srcOption];
        const player =  getAudioPlayer();       
        const resource = createAudioResource(srcPath);

        // play the player with the new resouce
        player.play(resource);      

        await interaction.reply({ content: `Loaded ${srcOption}`, ephemeral: true });
    },
};