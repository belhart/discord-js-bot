const admins = ["98420177581928448", "154975813454921728"]


module.exports = {
	name: 'purge',
	description: 'Ping!',
	async execute(message, args, client) {
    if (admins.indexOf(message.author.id) === -1) return;
        const deleteCount = parseInt(args[0], 10);
    
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
        message.channel.bulkDelete(deleteCount)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	},
};