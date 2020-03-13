const {RichEmbed} = require("discord.js");
const debug = require("./../../mongodb/debug");
const mongoose = require("mongoose");
const {formatDate} = require("./../../functions.js")

module.exports = {
    name: "debug",
    category: "botowner",
    description: "turn on debug and its ONLY BOT OWNER's",
    usage: "debug",
    run: async(client, message, args) => {
        let EmojiID = client.config.emojis;
        let sucess;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            Success = "🎉"
        }else{
            success = client.emojis.get(EmojiID.success)
        }
        let SuccessEmbed = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`${success} Done! ${success}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        debug.findOne({name: 'debug'}).then(async result => {
            if(!result || result == []) {
                let newDoc = new debug({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'debug'
                });
                newDoc.save().catch(console.error);
                SuccessEmbed.setDescription(`Enabled it!`)
                message.channel.send(SuccessEmbed);
            }else{
                debug.deleteOne({name: 'debug'}).catch(console.error);
                SuccessEmbed.setDescription(`Disabled it!`)
                message.channel.send(SuccessEmbed);
            }
        });

    }
}