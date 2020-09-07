require('dotenv').config()
const fs = require('fs');
const discord = require("discord.js");
var invites = {};


const client = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./config/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./config/commands/${file}`);
	client.commands.set(command.name, command, client);
}
const config = require('./config/config.json')
const admins = ["98420177581928448", "154975813454921728"]

client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
  var ownguild = client.guilds.cache.get('564431621684461568');
  invites = ownguild.fetchInvites().then(guildInvites => {
    invites['564431621684461568'] = guildInvites;
  });
});

client.on("message", async message => {
    if(message.channel.id === "721711603212353556"){
        var userid = message.content.split(' ')[4].replace(/[^0-9 ]/g, "");
        var user = client.users.cache.get(userid);
        var inviterfull = user.username+"#"+user.discriminator;
        await client.commands.get('invites').refreshNew(user.id, client,inviterfull);
        return;
    }
    if(message.author.bot) return;
    if(message.content.indexOf(process.env.prefix) !== 0) {
        if(message.guild.id === '564431621684461568'){
            await client.commands.get('msgprocessor').execute(message);
        }
        return;
    }
    const args = message.content.slice(process.env.prefixLength).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

/*client.on('guildMemberAdd', async member => {
    if(member.guild.id === '564431621684461568'){
        var guildInvites = await member.guild.fetchInvites();
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const logChannel = await client.channels.cache.get('721711603212353556');
        //try{ 
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses );
            //const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses ).catch((err) => {logChannel.send(err +  ` ${member.user.username}#${member.user.discriminator} joinolásánál.`);console.log(err);});
            const inviter = await client.users.cache.get(invite.inviter.id);
            await client.commands.get('invites').refresh(member, client,inviter);
            await logChannel.send(`${member.user.username}#${member.user.discriminator} joined using invite code ${invite.code} from ${inviter.username}#${inviter.discriminator}. Invite was used ${invite.uses} times since its creation.`).catch((err) => {console.log(err)});
            return;
        }
        catch(error){
            await logChannel.send(error +  ` ${member.user.username}#${member.user.discriminator} joinolásánál.`);
            console.log(invites[member.guild.id]);
        }
    }
    else return;
});*/

client.on("messageReactionAdd", async (reaction,user) => {
    if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
    }
    if(user.id === "468352442363281409") return;
    if(reaction.message.id === "720296291002875985"){
        switch(reaction.emoji.name.toLowerCase()){
            case "hun":
                var role = reaction.message.guild.roles.cache.get('713437219062284330');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "alb":
                var role = reaction.message.guild.roles.cache.get('713437217338687552');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "tr":
                var role = reaction.message.guild.roles.cache.get('713437214914248755');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "slav":
                var role = reaction.message.guild.roles.cache.get('721758240605601833');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "es":
                var role = reaction.message.guild.roles.cache.get('721816050366152815');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "donk":
                var role = reaction.message.guild.roles.cache.get('723185752040538172');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "nsfw":
                var role = reaction.message.guild.roles.cache.get('723465611027677195');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "mac":
                var role = reaction.message.guild.roles.cache.get('748130910146134056');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
            case "geo":
                var role = reaction.message.guild.roles.cache.get('748286320555851817');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                return;
        }
    }
    else if (reaction.message.channel.id === "717056939904991333"){
        if(reaction.emoji.name === "👍"){
            const args = reaction.message.content.slice(config.prefix.length).trim().split(/ +/g);
            args.shift();
            const sayMessage = args.join(" ");
            const exampleEmbed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(sayMessage)
                .setAuthor('Libertius', 'https://beta.libertius.com/images/fist.png', 'https://libertius.com')
                .setTimestamp()
                .addFields(
                    { name: 'Suggested by', value: reaction.message.content.split(' ')[0]},
                )
                .setFooter('Libertius bot', 'https://beta.libertius.com/images/fist.png')
            var sent = await client.channels.cache.get('716979510632906812').send(exampleEmbed);
            await sent.react("👍");
            await sent.react("👎");
            reaction.message.delete();
            return;
        }
        else{
            await reaction.message.delete();
            return;
        }
    }
    else if (reaction.message.channel.id === "719987455348047955"){
        if(reaction.emoji.name === "👍"){
            const args = reaction.message.content.slice(config.prefix.length).trim().split(/ +/g);
            args.shift();
            const sayMessage = args.join(" ");
            const exampleEmbed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(sayMessage)
                .setAuthor('Libertius', 'https://beta.libertius.com/images/fist.png', 'https://libertius.com')
                .setTimestamp()
                .addFields(
                    { name: 'Suggested by', value: reaction.message.content.split(' ')[0]},
                )
                .setFooter('Libertius bot', 'https://beta.libertius.com/images/fist.png')
            var sent = await client.channels.cache.get('716976256754778142').send(exampleEmbed);
            await sent.react("👍");
            await sent.react("👎");
            reaction.message.delete();
            return;
        }
        else{
            await reaction.message.delete();
            return;
        }
    }
});

client.on("messageReactionRemove", async (reaction,user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
    }
    if(reaction.message.id === "720296291002875985"){
        switch(reaction.emoji.name.toLowerCase()){
            case "hun":
                var role = reaction.message.guild.roles.cache.get('713437219062284330');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "alb":
                var role = reaction.message.guild.roles.cache.get('713437217338687552');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "tr":
                var role = reaction.message.guild.roles.cache.get('713437214914248755');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "slav":
                var role = reaction.message.guild.roles.cache.get('721758240605601833');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "es":
                var role = reaction.message.guild.roles.cache.get('721816050366152815');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "donk":
                var role = reaction.message.guild.roles.cache.get('723185752040538172');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "nsfw":
                var role = reaction.message.guild.roles.cache.get('723465611027677195');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "mac":
                var role = reaction.message.guild.roles.cache.get('748130910146134056');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
            case "geo":
                var role = reaction.message.guild.roles.cache.get('748286320555851817');
                var member = reaction.message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                return;
        }
    }
});

client.login(process.env.TOKEN);