const {RichEmbed} = require("discord.js");
const update = require("./../../mongodb/updates");
const mongoose = require("mongoose");
const {formatDate} = require("./../../functions.js")

module.exports = {
    name: "addu",
    category: "botowner",
    description: "Add a update and its ONLY BOT OWNER's",
    usage: "<say the update>",
    run: async(client, message, args) => {
        let EmojiID = client.config.emojis;
        let sucess;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            Success = "🎉"
        }else{
            success = client.emojis.get(EmojiID.success)
        }
        let Error = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle(`❌ Error ❌`)
        .setDescription(`Specify a update BRUH`);
        if(!args[0]) return message.channel.send(Error)
        let SuccessEmbed = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle(`${success} SUCCESSFULLY UPDATED ${success}.`)
        .setDescription(`Updated updates command with ${args.join(' ')}`);
        update.findOne({name: 'updates'}).then(result => {
            let array = []
            array.push({
                title: args.join(' '),
                date: formatDate(new Date())
            });
            if(!result || result == []) {
                let newDoc = new update({
                    _id: new mongoose.Types.ObjectId(),
                    name: "updates",
                    array: array
                });
                newDoc.save().catch(console.error);
                return message.channel.send(SuccessEmbed);
            }else{
                let array = []
                array.push({
                    title: args.join(' '),
                    date: formatDate(new Date())
                });                
                result.array.forEach(r => array.push(r));
                let newDoc = new update({
                    _id: new mongoose.Types.ObjectId(),
                    name: "updates",
                    array: array
                });
                update.deleteOne({name: 'updates'}).catch(console.error);
                newDoc.save().catch(console.error);
                return message.channel.send(SuccessEmbed);
            }
        });

    }
}