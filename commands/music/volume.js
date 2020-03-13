const{RichEmbed} = require("discord.js");
module.exports = { 
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
    run: async (bot, message, args) => {
        let client = bot;
        let emojiID = client.config.emojis
        let success;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success);
        }
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
        .setDescription(`You need to be in a voice channel with me to adjust the volume.`)
        let VolumeError = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`You may only set the volume to 1-100.`)
        const player = bot.music.players.get(message.guild.id);
        if (!player) return message.channel.send(error);

        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send(Verror);
        let currentVolume = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setTitle(`Current Volume!`)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setColor("RANDOM")
        .setDescription(`Current Volume is ${player.volume}.`)

        if (!args[0]) return message.channel.send(currentVolume);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send(VolumeError);

        player.setVolume(Number(args[0]));
        let successEmbed = new RichEmbed()
        .setTitle(`${success} Done! ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Successfully set the volume to: ${args[0]}.`)
        return message.channel.send(`Successfully set the volume to: ${args[0]}`)
    }
}