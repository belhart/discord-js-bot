const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config/config.json')
const { registerCommands } = require('./registry.js')

async () => 
{
    client.login(config.DISCORD_BOT.Token);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerCommands(client,'../commands');
    console.log(client.commands);
};




/*client.on('ready', () => {console.log('logged in')});

client.on('message', () => {
    if (message.author.bot) return;
})*/