const { YouTube } = require('popyt')
const youtube = new YouTube(process.env.YOUTUBE)


module.exports = {
	name: 'yt',
    description: 'Ping!',
	async execute(message, args, client) {
        const searchMessage = args.join(" ");
        const video = await youtube.getVideo(searchMessage);
        try{
            message.channel.send(video.url);
        }
        catch(error){
            message.channel.send("There was an error or no result found." + error);
        }
	},
};