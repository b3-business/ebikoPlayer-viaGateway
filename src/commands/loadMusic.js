const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { getAudioPlayer } = require('../player');

const sources = {
    'bennyPath': '/Users/bjesuiter/02 The Saddest Noise.m4a', 
    'anfang': '/Users/bjesuiter/temp/03 Auserkoren.mp3', 
    'ende': '/Users/bjesuiter/temp/11 Friede auf Erden.mp3', 
    'bastiPath': '/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3',
    'url': 'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5ef06db148ba07a7/5fd95c9a752123476ba05287/TFT_Club2021_Mus_Full_MasterQC_201012.mp3'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loadmusic')
        .setDescription('Loads a new music resource.')
        .addStringOption((option) => 
            option.setName('src')
            .setDescription('Select the audio source (currently only 2 options)')
            .setRequired(true)
            .addChoices({name: 'Basti', value: "bastiPath"}, {name: 'Benny', value: 'bennyPath'}, 
            {name: 'Anfangsmusik', value: 'anfang'}, {name: 'Abschlussmusik', value: 'ende'}, {name: 'URL', value: 'url'})
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