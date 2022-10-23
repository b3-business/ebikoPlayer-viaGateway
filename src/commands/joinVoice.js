const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { getAudioPlayer } = require('../player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinvoice')
        .setDescription('Joins the specified voice channel.'),
    async execute(interaction) {
        const voiceChannelId = interaction.member.voice.channelId;
        const voiceChannel = interaction.guild.channels.cache.get(voiceChannelId);
        if (!voiceChannel) {
            await interaction.reply({ content: 'You are not in a voice Channel. Please join one.', ephemeral: true });
            return;
        }
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,

        });

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('Voice Ready!');

            const bennyPath = "/Users/bjesuiter/02 The Saddest Noise.m4a";
            const bastiPath = "/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3";
            const resource = createAudioResource(bennyPath);
            const player = getAudioPlayer();
            player.play(resource);
            connection.subscribe(player);
        });

        await interaction.reply({ content: 'Joined!', ephemeral: true });


    },
};