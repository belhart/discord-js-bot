const Discord = require('discord.js');
const admins = ["98420177581928448", "154975813454921728"]

module.exports = {
	name: 'achi',
    description: 'Ping!',
	async execute(message, args, client) {
        const sayMessage = args.join(" ");
        if (admins.indexOf(message.author.id) === -1){
                var sent = await client.channels.cache.get('719987455348047955').send(message.author.username+message.author.discriminator+ " "+sayMessage);
                await sent.react("👍");
                await sent.react("👎");
                return;
        }
        const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(sayMessage)
                .setAuthor('Libertius', 'https://beta.libertius.com/images/fist.png', 'https://libertius.com')
                .setTimestamp()
                .setFooter('Libertius bot', 'https://beta.libertius.com/images/fist.png')
        var sent = await client.channels.cache.get('716976256754778142').send(exampleEmbed);
        await sent.react("👍");
        await sent.react("👎");
	},
};