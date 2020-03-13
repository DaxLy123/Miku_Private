const {RichEmbed, Attachment} = require("discord.js");

module.exports = {
    name: "triggered",
    category: "images",
    description: "Generate a triggered image :DDD",
    usage: "triggered [userid/usertag]",
    run: async(client, message, args, prefix) => {
        let emojiID = client.config.emojis;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success);
        }
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        let successEmbed = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`${success} Done ${success}`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        const buffer = await client.ameApi.generate("triggered", {
            "url" : user.avatarURL})
const attachment = new Attachment(buffer, "triggered.gif")
successEmbed.setDescription(`Done!`)
//message.channel.send(attachment, {embed: embed})
message.channel.send(successEmbed).then(c => {
    message.channel.send(attachment);
    c.delete(10000);
});
             
    }
}