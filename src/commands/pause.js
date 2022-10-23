const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { getAudioPlayer } = require('../player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Starts playback of current resource.'),

    async execute(interaction) {

        // get the connection
        const connection = getVoiceConnection(interaction.guild.id);

        // if there is no connection, return
        if (!connection) {
            await interaction.reply({ content: 'I am not in a voice channel!', ephemeral: true });
            return;
        }

        // play the player with the current resouce
        getAudioPlayer().pause();

        await interaction.reply({ content: 'Left!', ephemeral: true });
    },
};