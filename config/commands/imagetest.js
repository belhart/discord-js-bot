const Discord = require('discord.js');
const admins = ["98420177581928448", "154975813454921728"]

module.exports = {
	name: 'imagetest',
        description: 'Ping!',
	async execute(message, args, client) {
        var invites = await member.guild.fetchInvites();
        invites = invites.array();
        arraySort(invites, 'uses', {reverse: true});
        var possibleInvites = Object();
        const fileStream = fs.createReadStream('/etc/discord-invites/invites.json',);
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        for await (const line of rl) {
            var splitlines = line.split(';');
            possibleInvites[splitlines[0]] = parseInt(splitlines[1]);
        }
        invites.forEach(function(invite){
            if(Object.keys(possibleInvites).indexOf(invite.inviter.username+"#"+invite.inviter.discriminator) < 0){
                if(invite.uses > 0){
                    possibleInvites[invite.inviter.username+"#"+invite.inviter.discriminator] = invite.uses;
                }
            }  
        });
        possibleInvites[inviterSent.username+"#"+inviterSent.discriminator] += 1;

        if (possibleInvites[inviterSent.username+"#"+inviterSent.discriminator]> 4){
            var gguild = client.guilds.cache.get('564431621684461568');
            var memberToGiveRole = gguild.members.cache.get(inviterSent.id);
            var role = gguild.roles.cache.get('721764511421431852');
            await memberToGiveRole.roles.add(role);
        }
        var channel = await client.channels.cache.get('720261101899612160');
        var objectToArray = arraySort(Object.entries(possibleInvites), (a,b) => a[1] - b[1] ,{reverse: true});
        for (const [key, value] of Object.entries(objectToArray)) {
            
        }
        var textimg = "";
        var stringToFile = "";
        for (const [key, value] of Object.entries(objectToArray)) {
            stringToFile += value[0]+';'+value[1]+'\n';
            textimg += value[0] + " " +value[1]+'\n';
        }
        textToImage.generate(textimg).then(async function (dataUri) {
            var valami = "";
            var path = base64Img.img(dataUri, 'dest', '1', function(err, filepath) {console.log(filepath);valami=filepath;});
            console.log(valami);
            console.log(path);
            var attachement = new Attachement(path);
            await channel.send(attachement);
          });
        fs.writeFileSync('/etc/discord-invites/invites.json', stringToFile);
        //await channel.bulkDelete(2);
        await channel.send(`\`\`\`${table.table(objectToArray.slice(16,objectToArray.length))}\`\`\``);
        await channel.send(`\`\`\`${table.table(objectToArray.slice(0,15))}\`\`\``);
	},
};