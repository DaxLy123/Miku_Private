
const {RichEmbed} = require("discord.js");
module.exports = { 
        name: "leave",
        aliases: ["lev", "stop"],
        description: "Makes the bot leave the voice channel.",
        category: "music",
    run: async (bot, message, args) => {
        let client = bot;
        let emojiID = client.config.emojis
        let success;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success);
        }
        const { voiceChannel } = message.member;
        const player = bot.music.players.get(message.guild.id);
        let error = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`no song/s playing in this guild.`)
        let Verror = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`You need to be in a voice channel with me to use the leave command.`)
        if(!player) return message.channel.send(error);
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send(Verror);
        let successEmbed = new RichEmbed()
        .setTitle(`${success} Sucessfull ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`${success} Successfully left the voice channel ${success}`)
        bot.music.players.destroy(message.guild.id);
        return message.channel.send(successEmbed);
    }
}