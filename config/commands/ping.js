module.exports = {
	name: 'ping',
    description: 'Ping!',
	async execute(message, args, client) {
		const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
	},
};