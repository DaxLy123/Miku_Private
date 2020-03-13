const {RichEmbed} = require("discord.js");
const strike = require("./../../mongodb/strike");
const mongoose = require("mongoose");
module.exports = {
    name: "strikes",
    category: "mod",
    description: "Give strike to a user",
    usage: "strike <@uer/id> <amount> <reason>",
    availability: "mod",
    run: async(client, message, args, prefix) => {
        let i0 = 0;
        let i1 = 10;
        let page = 1;
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
        let NoDataEmbed = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`❌ There are no strikes ever given to this user! ❌`)
        .setColor("RANDOM")
        .setTimestamp()
        if(!args[0]) return message.channel.send(rmentioned);
        let user = message.mentions.members.first() || message.guild.users.get(args[0]);
        if(!user)  message.channel.send(wmentioned);

        strike.findOne({name: 'strike', serverid: message.guild.id, userid: user.id}).then(async result => {
            if(!result || result == []) return message.channel.send(NoDataEmbed);
            let data = result;
            let pages = Math.round(data.reason.length/10)
            if(pages == 0) page = 1;
            let embed = new RichEmbed()
            .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`${success} Total Strikes ${data.strike}. Amount of reasons: ${data.reason.length}. \n PAGE: ${page}/${page}`)
        .setColor("RANDOM")
        .setTimestamp()
        let description = data.reason.map((r, i) => `${i + 1}. amount: ${r.strike} \n reason: ${r.reason} \n Mod/Admin: ${r.author}`)
        .slice(0, 10)
        .join("\n")
        embed.setDescription(description)
        let msg = await message.channel.send(embed);
        
        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction, user) => {            

            if(reaction._emoji.name === "⬅") {

                // Updates variables
                i0 = i0-10;
                i1 = i1-10;
                page = page-1;
                
                // if there is no guild to display, delete the message
                if(i0 < 0){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }
                
                description = data.reason.map((r, i) => `${i + 1}. amount: ${r.strike} \n reason: ${r.reason} \n Mod/Admin: ${r.author}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`${success} Total Strikes ${data.strike}. Amount of reasons: ${data.reason.length}. \n PAGE: ${page}/${Math.round(data.reason.length/10)}`)
                .setDescription(description);
            
                // Edit the message 
                msg.edit(embed);
            
            };

            if(reaction._emoji.name === "➡"){

                // Updates variables
                i0 = i0+10;
                i1 = i1+10;
                page = page+1;

                // if there is no guild to display, delete the message
                if(i1 > client.guilds.size + 10){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = data.reason.map((r, i) => `${i + 1}. amount: ${r.strike} \n reason: ${r.reason} \n Mod/Admin: ${r.author}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`${success} Total Strikes ${data.strike}. Amount of reasons: ${data.reason.length}. \n PAGE: ${page}/${Math.round(data.reason.length/10)}`)
                .setDescription(description);
            
                // Edit the message 
                msg.edit(embed);

            };

            if(reaction._emoji.name === "❌"){
                return msg.delete(); 
            }

            // Remove the reaction when the user react to the message
            await reaction.remove(user.id);

        });
        });

    }
}