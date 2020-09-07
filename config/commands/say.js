const admins = ["98420177581928448", "154975813454921728"]


module.exports = {
	name: 'say',
    description: 'Ping!',
	async execute(message, args, client) {
        if (admins.indexOf(message.author.id) === -1) return;
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
	},
};