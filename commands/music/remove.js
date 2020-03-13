const {RichEmbed} = require("discord.js");

module.exports = {
    name: "remove",
    category: "music",
    description: "Remove a track from the queue",
    usage: "<number of the track>",
    aliases: ["deletetrack", "rmtrack"],
    run: async(client, message, args, prefix) => {
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
        .setDescription(`You need to be in a voice channel with me to use the remove command.`)
        let ErrorTryingEmbed = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Invalid number given. Format ${prefix}remove <number of track. For example: ${prefix}remove 1`)
        let TrackDoesntExistEmbed = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`That track does not exist. Format ${prefix}remove <number of track. For example: ${prefix}remove 1`)

        const player = client.music.players.get(message.guild.id);
        if (!player) return message.channel.send(error);
        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send(Verror);
        if(!args[0]) return message.channel.send(ErrorTryingEmbed);
        let number = parseInt(args[0]);
        if(!number) return message.channel.send(ErrorTryingEmbed);
        let numberr = number - 1;
        if(!player.queue[numberr]) return message.channel.send(TrackDoesntExistEmbed);

        let SuccessEmbed = new RichEmbed()
        .setTitle(`${success} Success ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Successfully removed ${player.queue[numberr].title} from the queue!`)
        message.channel.send(SuccessEmbed).then(c => {
            player.queue.remove(numberr);
            c.delete(25000);

        });


    }
}