const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leavevoice')
        .setDescription('Leaves from the voice channel.'),
    async execute(interaction) {

        // get the connection
        const connection = getVoiceConnection(interaction.guild.id);

        // if there is no connection, return
        if (!connection) {
            await interaction.reply({ content: 'I am not in a voice channel!', ephemeral: true });
            return;
        }

        // destroy the connection
        connection.destroy();
        await interaction.reply({ content: 'Left!', ephemeral: true });

    },
};