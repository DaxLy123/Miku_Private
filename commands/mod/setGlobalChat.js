const global = require("./../../mongodb/global-chat");
const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'setglobalchat',
    category: 'mod',
    description: 'Set the global chat of the server!',
    usage: 'setGlobalChat <#channel/channel id>',
    aliases: ["setglobal"],
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
        .setDescription(`Invalid Format. Format: ${prefix}setGlobalChat <#channel/channel id>. For example: ${prefix}setglobalchat #global-chat or ${prefix}setGlobalChat 666287824097771520`);
        let InvalidChannel = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`Invalid channel mention or id`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Invalid Format. Format: ${prefix}setGlobalChat <#channel/channel id>. For example: ${prefix}setglobalchat #global-chat or ${prefix}setGlobalChat 666287824097771520`)
        if(!args[0]) return message.channel.send(NoArgs);
        let channel = message.mentions.channels.first() || client.channels.get(args[0]);
        if(!channel) return message.channel.send(InvalidChannel);
        global.findOne({name:'global', guildid: message.guild.id}).then(async result => {
            let successEmbed = new RichEmbed()
            .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`${success} Success ${success}`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Added ${channel.toString()} as global-chat.`)
            if(!result || result == []) {
                let newDoc = new global({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'global',
                    guildid: message.guild.id,
                    channel: channel.id
                });
                newDoc.save().catch(console.error);
                message.channel.send(successEmbed);
            }else{
                return message.channel.send(`There is already a global-chat channel set. Use ${prefix}removeglobalchat command to remove the channel fixed.`)
            }

        });
    }
}