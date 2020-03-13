const {RichEmbed} = require("discord.js");

module.exports = {
    name: "status",
    category: "botowner",
    description: "Change status lol",
    usage: "status <dnd/idle/online/offline>",
    run: async(client, message, args, prefix) => {
        let emojiID = client.config.emojis
        let success;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success);
        }
        let NoArgs = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle("❌ Error ❌")
        .setDescription(`Invalid Format. Format: ${prefix}status <dnd/idle/online/offline>.`)
        let SuccessEmbed = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setTitle(`${success} Done! ${success}`)
        .setDescription(`Put status to ${args[0]}.`)
        let status = ["dnd", "idle", "offline", "online"]        
        if(!args[0]) return message.channel.send(NoArgs);
        if(args[0]) {
            if(args[0] == "dnd") {
                await client.user.setStatus("dnd");
                return message.channel.send(SuccessEmbed);
            }
            if(args[0] == "idle") {
                await client.user.setStatus("idle");
                return message.channel.send(SuccessEmbed);
            }
            if(args[0] == "online") {
                await client.user.setStatus("online");
                return message.channel.send(SuccessEmbed);
            }
            if(args[0] == "offline") {
                await client.user.setStatus("invisible");
                return message.channel.send(SuccessEmbed);
            }
            return message.channel.send(NoArgs);
        }

    }
}