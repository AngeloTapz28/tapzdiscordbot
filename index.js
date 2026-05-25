const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');
require('dotenv').config();

const app = express();

// Web server for Render/UptimeRobot
app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(3000, () => {
    console.log('Web server running.');
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const GUILD_ID = '958737784162615306';
const CHANNEL_ID = '1383790513869819995';

client.once('clientReady', async () => {
    console.log(`${client.user.tag} is online!`);

    const guild = client.guilds.cache.get(GUILD_ID);

    if (!guild) {
        console.log('Guild not found.');
        return;
    }

    joinVoiceChannel({
        channelId: CHANNEL_ID,
        guildId: GUILD_ID,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });

    console.log('Joined voice channel!');
});

client.login(process.env.TOKEN);