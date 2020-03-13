const Discord = require("discord.js");
module.exports = {
    name: "serverlist",
    category: "botowner",
    description: "Check server list of bot",
    usage: "serverlist",
    run: async(client, message, args) => {
        await message.delete();

        let i0 = 0;
        let i1 = 10;
        let page = 1;
        let pages = Math.round(client.guilds.size/10);
        if(pages === 0) pages = 1;

        let description = 
        `TOTAL SERVERS : ${message.client.guilds.size}\n\n`+
        client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} MEMBERS`)
        .slice(0, 10)
        .join("\n");

        let embed = new Discord.RichEmbed()
            .setAuthor(" | " + message.author.tag, message.author.avatarURL)
            .setColor("RANDOM")
            .setFooter(client.config.footer, client.user.avatarURL)
            .setTitle(`PAGE: ${page}/${pages}`)
            .setDescription(description)
            .setThumbnail(message.guild.iconURL)
            .setTimestamp()

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
                
                description = `TOTAL_SERVERS : ${client.guilds.size}\n\n`+
                message.client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`PAGE: ${page}/${pages}`)
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

                description = `Total Servers : ${client.guilds.size}\n\n`+
                client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`PAGE: ${page}/${pages}`)
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
    }
}