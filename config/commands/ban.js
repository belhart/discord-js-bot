const admins = ["98420177581928448", "154975813454921728"]

module.exports = {
	name: 'ban',
	description: 'Ping!',
	async execute(message, args, client) {
		if (admins.indexOf(message.author.id) === -1) return;
		const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
	},
};