const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { getAudioPlayer } = require('../player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loadurl')
        .setDescription('Loads a new music resource from url.')
        .addStringOption((option) => 
            option.setName('url')
            .setDescription('The public url to load the audio from (mp3, ogg, m4a-ALAC, etc.)')
            .setRequired(true)
        ),

    async execute(interaction) {

        // get the connection
        const connection = getVoiceConnection(interaction.guild.id);

        // if there is no connection, return
        if (!connection) {
            await interaction.reply({ content: 'I am not in a voice channel!', ephemeral: true });
            return;
        }

        const url = interaction.options.getString('url');
        console.log(url);
        
        const player =  getAudioPlayer();       
        const resource = createAudioResource(url);

        // play the player with the new resouce
        player.play(resource);      

        await interaction.reply({ content: `Loaded "${url}"`, ephemeral: true });
    },
};