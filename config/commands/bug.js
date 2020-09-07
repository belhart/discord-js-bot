const Discord = require('discord.js');
const admins = ["98420177581928448", "154975813454921728"]

module.exports = {
	name: 'bug',
	description: 'Ping!',
	async execute(message, args, client) {
        const sayMessage = args.join(" ");
        const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bug report from:' + message.author.username)
                .setAuthor('Libertius', 'https://beta.libertius.com/images/fist.png', 'https://libertius.com')
                .addFields(
                    { name: '**Bug description**', value: sayMessage}
                )
                .setTimestamp()
                .setFooter('Libertius bot', 'https://beta.libertius.com/images/fist.png')
        client.channels.cache.get('686193753106809041').send(exampleEmbed);
	},
};