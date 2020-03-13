const mongoose = require("mongoose");
const Product = require("./../../mongodb/warn");
const { RichEmbed} = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "warnings",
  category: "Moderation",
  description: "Check a user's warnings",
  usage: "warnings <user tag or user id>",
    run:async (client, message, args, prefix) => {
    let i0 = 0;
        let i1 = 10;
        let page = 1;
  if (
    !message.member.hasPermission("ADMINISTRATOR")
  ) {
    return message.channel.send("You got no permission");
  }
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(
      `You must mention someone to check the warnings`
    );
  }
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(async result => {
    if(!result[0] || result == []) return message.channel.send(`This user has no warnings.`)
    let warnings;
    if (!result[0]) warnings = [];
    if (result[0]) warnings = result[0].warnings;
    /*if(!result[0]) warner = [];
    if(result[0]) warner = result[0].warner
    let desc = `This user has ${result[0].warnings.length} warnings: \n` */
    /*for (var i = 0; i < result[0].warnings.length; i++) {
			let w = result[0].warnings[i];
      desc+=`${i}) - ${moment(w.time).format("D MMM YYYY, h:mm a")} - **Reason:** ${w.reason} - **Warner:** ${w.warner} \n `
      
    }  */
    

    let data = result[0].warnings;
    let pages = Math.round(data.length/10)
            if(pages !== 1) page = 1;
            const embed = new RichEmbed() 
			.setAuthor(`${member.user.tag}'s Warnings`, member.displayAvatarURL)
			.setTitle(`These are all of the warnings which have been issued to this user. \n PAGE: ${page}/${pages}`)
			.setColor("#9500d6")
      .setFooter(client.config.footer, client.user.avatarURL)
    let description = data.map((w, i) => `${i + 1}. ${moment(w.time).format("D MMM YYYY, h:mm a")} - **Reason:** ${w.reason} - **Warner:** ${w.warner}`)
        .slice(0, 10)
        .join("\n")
        embed.setDescription(description)

      let msg = await message.channel.send(embed)
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
                
                description = data.map((w, i) => `${i + 1}. ${moment(w.time).format("D MMM YYYY, h:mm a")} - **Reason:** ${w.reason} - **Warner:** ${w.warner}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`These are all of the warnings which have been issued to this user. \n PAGE: ${page}/${pages}`)
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
                if(i1 > data.length + 10){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = data.map((w, i) => `${i + 1}. ${moment(w.time).format("D MMM YYYY, h:mm a")} - **Reason:** ${w.reason} - **Warner:** ${w.warner}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`These are all of the warnings which have been issued to this user. \n PAGE: ${page}/${pages}`)
                .setDescription(description);
            
                // Edit the message 
                msg.edit(embed);

            };

            if(reaction._emoji.name === "❌"){
                return msg.delete(); 
            }

            // Remove the reaction when the user react to the message
            await msg.reactions.find(r => r._emoji.name === reaction._emoji.name).remove(message.author.id);

        });

   /* message.channel.send(
      `${member.displayName} has ${
        warnings.length
      } warnings: \`\`\` ${warnings.join("\n")}\`\`\``
    ); */
  });
}
}