const Discord = require('discord.js'),
arraySort = require('array-sort'),
fs = require('fs'),
table = require('table'),
textToImage = require('text-to-image'),
base64Img = require('base64-img');
readline = require('readline');
const admins = ["98420177581928448", "154975813454921728"];

module.exports = {
	name: 'invites',
    description: 'Ping!',
    
    readFromFile(){
        var possibleInvites = new Object();
        var asd = 0;
        lineReader.eachLine('/etc/discord-invites/invites.json', function(line) {
            var linespl = line.split(';');
            possibleInvites[linespl[0]] = parseInt(linespl[1]);
        });
        console.log(possibleInvites);
        return possibleInvites;
    },

    async processLineByLine() {
        const fileStream = fs.createReadStream('/etc/discord-invites/invites.json',);
      
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.
      
        for await (const line of rl) {
          // Each line in input.txt will be successively available here as `line`.
          console.log(`Line from file: ${line}`);
        }
      },
      

	async execute(message, args, client) {
        if (admins.indexOf(message.author.id) === -1) return;
        var invites = await message.guild.fetchInvites();
        //invites.forEach(async (invite) => {await message.channel.send(invite.code+ " " + invite.inviter.username + " " + invite.uses)});
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
        console.log(possibleInvites);
        //possibleInvites = fs.readFileSync('/etc/discord-invites/invites.json' , 'ascii');
        //console.log(possibleInvites);
        invites.forEach(function(invite){
            if(Object.keys(possibleInvites).indexOf(invite.inviter.username+"#"+invite.inviter.discriminator) > -1){
                possibleInvites[invite.inviter.username+"#"+invite.inviter.discriminator] += invite.uses; 
            }
            else{
                possibleInvites[invite.inviter.username+"#"+invite.inviter.discriminator] = invite.uses;
            }
            //possibleInvites.push([invite.inviter.username, invite.uses]);
        });
        /*const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .addField('Leaderboard', `\`\`\`${table.table(Object.entries(possibleInvites))}\`\`\``);*/

        var objectToArray = arraySort(Object.entries(possibleInvites), (a,b) => a[1] - b[1] ,{reverse: true});
        var stringToFile = "";
        for (const [key, value] of Object.entries(objectToArray)) {
            stringToFile += value[0]+';'+value[1]+'\n';
        }
        fs.writeFileSync('/etc/discord-invites/invites.json', stringToFile);
        await message.channel.send(`\`\`\`${table.table(objectToArray)}\`\`\``);
        //message.channel.send(`\`\`\`${table.table(possibleInvites)}\`\`\``);
    },

    async refresh(member, client,inviterSent) {
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
        var textimg = "";
        var stringToFile = "";
        for (const [key, value] of Object.entries(objectToArray)) {
            stringToFile += value[0]+';'+value[1]+'\n';
            textimg += value[0] + '\t' +value[1]+'\n';
        }
        textToImage.generate(textimg).then(async function (dataUri) {
            var valami = "";
            var path = base64Img.img(dataUri, 'dest', '1', function(err, filepath) {console.log(filepath);valami=filepath;});
            await channel.bulkDelete(1);
            await channel.send('Current standings', {files: ['/etc/discord/dest/1.png']});
          });
        fs.writeFileSync('/etc/discord-invites/invites.json', stringToFile);
        //await channel.bulkDelete(2);
        //await channel.send(`\`\`\`${table.table(objectToArray.slice(16,objectToArray.length))}\`\`\``);
        //await channel.send(`\`\`\`${table.table(objectToArray.slice(0,15))}\`\`\``);
    },

    async refreshNew(userid,client,inviterFull){
        var asd = client.guilds.cache.get('564431621684461568');
        var invites = await asd.fetchInvites();
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
        possibleInvites[inviterFull] += 1;
        if (possibleInvites[inviterFull]> 4){
            var gguild = client.guilds.cache.get('564431621684461568');
            var memberToGiveRole = gguild.members.cache.get(userid);
            var role = gguild.roles.cache.get('721764511421431852');
            await memberToGiveRole.roles.add(role);
        }
        var channel = await client.channels.cache.get('720261101899612160');
        var objectToArray = arraySort(Object.entries(possibleInvites), (a,b) => a[1] - b[1] ,{reverse: true});
        var textimg = "";
        var stringToFile = "";
        for (const [key, value] of Object.entries(objectToArray)) {
            stringToFile += value[0]+';'+value[1]+'\n';
            textimg += value[0] + '\t' +value[1]+'\n';
        }
        textToImage.generate(textimg).then(async function (dataUri) {
            var valami = "";
            var path = base64Img.img(dataUri, 'dest', '1', function(err, filepath) {console.log(filepath);valami=filepath;});
            await channel.bulkDelete(1);
            await channel.send('Current standings', {files: ['/etc/discord/dest/1.png']});
          });
        fs.writeFileSync('/etc/discord-invites/invites.json', stringToFile);
    },
};