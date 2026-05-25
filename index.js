const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const GUILD_ID = '958737784162615306';
const CHANNEL_ID = '1383790513869819995';

client.once('ready', async () => {
    console.log(`${client.user.tag} is online!`);

    const guild = client.guilds.cache.get(GUILD_ID);

    joinVoiceChannel({
        channelId: CHANNEL_ID,
        guildId: GUILD_ID,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false
    });

    console.log('Joined voice channel!');
});

client.login(process.env.TOKEN);