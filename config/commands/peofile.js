const requests = require('request');
const Discord = require('discord.js');

module.exports = {
	name: 'profile',
	description: 'Ping!',
	async execute(message, args, client) {
        url = 'https://api.libertius.com/api/player/getPlayerByID.php?id=' + args[0];
        requests(url,{ json: true }, (err,res,body) => {
            if (err){ message.channel.send("There was an error getting the to the server"); return;}
            if(body['message'] === "player does not exist.") {message.channel.send(body['message']); return;}
            var asd = encodeURIComponent(body['image']);
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(body['name'])
                .setURL('https://vps.libertius.com/player.php?id=' + body['id'])
                .setAuthor('Libertius', 'https://beta.libertius.com/images/fist.png', 'https://libertius.com')
                .setThumbnail('https://beta.libertius.com/pictures/'+ asd)
                .addFields(
                    { name: 'Verified', value: body['verified']},
                    { name: 'Banned', value: body['banned']},
                    { name: '**Location**', value: body['location']},
                    { name: 'Strength', value: body['strength']}
                )
                .setTimestamp()
                .setFooter('Libertius bot', 'https://beta.libertius.com/images/fist.png')
            message.channel.send(exampleEmbed);
            });
            
	},
};