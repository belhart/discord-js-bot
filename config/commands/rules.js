const Discord = require('discord.js');

module.exports = {
	name: 'rules',
	description: 'Ping!',
	async execute(message, args, client) {
        const sayMessage = args.join(" ");
        client.channels.cache.get('713426924336316497').send(sayMessage);
	},
};