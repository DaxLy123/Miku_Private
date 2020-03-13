const {RichEmbed} = require('discord.js');
const superagent = require("superagent");
module.exports = {
    name: 'clyde',
    category: 'images',
    description: 'make a clyde image boi',
    usage: 'clyde <text>',
    run: async(client, message, args) => {
        let text = args.join(" ");

        if(!text){
            return message.channel.send("no text?");
        }

        let m = await message.channel.send(`Please wait`);

        superagent.get('https://nekobot.xyz/api/imagegen')
        .query({ type: 'clyde', text: `${args.join(" ")}`})
        .end((err, response) => {
            let trumptweet = new RichEmbed()
			.setImage(response.body.message)
            .setColor('RANDOM')
            .setFooter(client.config.footer, client.user.avatarURL)
            .setTimestamp()
			m.edit(trumptweet)
        })
    }
}