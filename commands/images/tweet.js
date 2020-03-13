const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
    name: 'tweet',
    category: 'images',
    description: 'make a tweet image',
    usage: 'tweet <username> <text>',
    run:async(client, message, args, prefix) => {
    if(!args[0]) message.channel.send(`Put a name and message please. Example: ${prefix}tweet Uthsho Hi`);
    if(!args[1]) { 
        message.channel.send(`Put a message please.`)
    }else{
        superagent.get('https://nekobot.xyz/api/imagegen')
        .query({ type: 'tweet', text: `${args.slice(1).join(" ")}`, username: args[0] })
        .end((err, response) => {
            let trumptweet = new Discord.RichEmbed()
			.setImage(response.body.message)
            .setColor('RANDOM')
            .setFooter(client.config.footer, client.user.avatarURL)
            .setTimestamp()
			message.channel.send(trumptweet)
        })
    }
}
}