const {RichEmbed} = require('discord.js');

module.exports = {
    name: 'gayrate',
    category: 'fun',
    description: 'Check how gay your friend is or yourself XD',
    usage: 'gayrate [usermention]',
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let random = Math.floor(Math.random() * 101);
        let embed = new RichEmbed()
        .setAuthor(` | ${user.tag}`, user.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle(`${user.username} is...`)
        .setDescription(`:gay_pride_flag: ${user.username} is ${random}% gay :gay_pride_flag:`)
        message.channel.send(embed);
    }
}