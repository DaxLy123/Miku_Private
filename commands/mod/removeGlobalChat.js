const global = require("../../mongodb/global-chat");
const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'removeglobalchat',
    category: 'mod',
    description: 'remove the global chat of the server!',
    usage: 'removeGlobalChat',
    aliases: ["removeglobal"],
    run: async(client, message, args, prefix) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need  ADMINISTRATOR permission")        
        let emojiID = client.config.emojis;
        let success;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success);
        }
        let NoArgs = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`No args?`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Invalid Format. Format: ${prefix}removeGlobalChat.`);
        let InvalidChannel = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`Invalid channel mention or id`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Invalid Format. Format: ${prefix}removeGlobalChat.`)
        global.findOne({name:'global', guildid: message.guild.id}).then(async result => {
            let successEmbed = new RichEmbed()
            .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`${success} Success ${success}`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`removed it!`)
            if(!result || result == []) {
                return message.channel.send(`There is none set.`)
            }else{
                global.deleteOne({name: 'global', guildid: message.guild.id}).catch(console.error);
                return message.channel.send(successEmbed);
            }

        });
    }
}