const {RichEmbed, Attachment} = require("discord.js");

module.exports = {
    name: "vs",
    category: "images",
    description: "Generate a image :DDD",
    usage: "vs <usertag>",
    run: async(client, message, args, prefix) => {
        let emojiID = client.config.emojis;
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
        .setDescription(`Invalid Format. Format: ${prefix}vs <@user/user id>. For example: ${prefix}vs @MrSon or ${prefix}vs 666287824097771520`);
        let InvalidUser = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`Invalid user`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Invalid Format. Format: ${prefix}vs <@user/user id>. For example: ${prefix}vs @MrSon or ${prefix}vs 666287824097771520`);
        if(!args[0]) return message.channel.send(NoArgs);
        let user = message.mentions.users.first() || client.users.get(args[0]);
        if(!user) return message.channel.send(InvalidUser);
        let successEmbed = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`${success} Done ${success}`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        const buffer = await client.ameApi.generate("vs", {
            "url" : message.author.avatarURL,
            "avatar": user.avatarURL
        })
const attachment = new Attachment(buffer, "vs.png")
successEmbed.setDescription(`Done!`)
//message.channel.send(attachment, {embed: embed})
message.channel.send(successEmbed).then(c => {
    message.channel.send(attachment);
    c.delete(10000);
});
             
    }
}