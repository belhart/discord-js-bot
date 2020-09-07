const blacklist = ['nigger', 'retard', 'faggot', 'nigga'];

module.exports = {
	name: 'msgprocessor',
    description: 'Ping!',
	async execute(message) {
        for(var i in blacklist) {
            if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())){
                message.delete();
                return;
            }
        }
        return;
	},
};