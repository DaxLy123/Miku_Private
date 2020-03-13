const {RichEmbed} = require("discord.js");
const strike = require("./../../mongodb/strike");
const mongoose = require("mongoose");
module.exports = {
    name: "strike",
    category: "mod",
    description: "Give strike to a user",
    usage: "strike <@uer/id> <amount> <reason>",
    availability: "mod",
    run: async(client, message, args, prefix) => {
        let EmojiID = client.config.emojis;
        let sucess;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            Success = "🎉"
        }else{
            success = client.emojis.get(EmojiID.success)
        }
        let rmentioned = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Invalid Mention or id ❌`)
        .setDescription(`You didn't mention someone or put a user id. Format: ${prefix}strike <usertag/id> <amount> <reason>.`)
        .setColor("RANDOM")
        .setTimestamp()
        let wmentioned = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Invalid Mention or id ❌`)
        .setDescription(`❌ You put a invalid user mention or put a invalid id ❌`)
        .setColor("RANDOM")
        .setTimestamp()
        let noNumber = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`❌ You didn't put any number ❌`)
        .setColor("RANDOM")
        .setTimestamp()
        let NoReason = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`❌ You didn't put any reason. ❌`)
        .setColor("RANDOM")
        .setTimestamp()

        if(!args[0]) return message.channel.send(rmentioned);
        let user = message.mentions.members.first() || message.guild.members.get(args[0]);
        let userid = user.id;
        let n = args.slice(1)[0];
        if(!n) return message.channel.send(noNumber);
        let givenNumber = parseInt(n);
        let errorNumberOk = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`❌ You put a invalid amount of strike. ❌`)
        .setColor("RANDOM")
        .setTimestamp()
        if(!givenNumber) return message.channel.send(errorNumberOk);
        let sorryEmbed = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`❌ Sorry This user has ***Administrator*** permission. ❌`)
        .setColor("RANDOM")
        .setTimestamp()
        if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(sorryEmbed);
        if(!user) return message.channel.send(wmentioned);
        let rreason = args.slice(1).slice(1).join(" ");
        if(!rreason) return message.channel.send(NoReason);

        strike.findOne({
            name: "strike",
            serverid: message.guild.id,
            userid: userid,
        }).then(async result => {
            let number = result ? result.strike : 0;
            let reasonCount = result ? result.reason : []
            let confirmedNumber = number + givenNumber;
            let reason = {
                author: message.author.tag,
                reason: rreason,
                strike: givenNumber
            }
            reasonCount.push(reason)
            let newDoc = new strike({
                _id: new mongoose.Types.ObjectId(),
                name: 'strike',
                serverid: message.guild.id,
                userid: userid,
                reason: reasonCount,
                strike: confirmedNumber
            });
            let SuccessEmbed = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle(`${success} Done! ${success}.`)
        .setDescription(`Added ${givenNumber} with reason \n warner: ${reason.author} \n reason: ${reason.reason} \n.`);
            if(!result) {
                newDoc.save().catch(console.error);
            }else{
                strike.deleteOne({name: "strike", serverid: message.guild.id, userid: userid}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send(SuccessEmbed);
        });


    }
}