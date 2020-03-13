const {RichEmbed} = require("discord.js");

module.exports = {
    name: "loop",
    category: "music",
    description: "Loop the current playing song or loop the queue",
    Usage: "loop <queue/single/none>",
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
        let singleEmbedError = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Its already on track repeat`)
        let QueueEmbedSuccess = new RichEmbed()
        .setTitle(`${success} Done! ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Repeating the queue`)
        let singleEmbedSuccess = new RichEmbed()
        .setTitle(`${success} Done! ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Repeating the current playing song!`)
        let Nerror = new RichEmbed()
        .setTitle(`${success} Done! ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Looping is now turned __***OFF**__.`)
        let Qerror = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Its already on queue repeat.`)
        let Verror = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`You need to be in a voice channel with me to use the loop command.`)
        const player = client.music.players.get(message.guild.id);
        if (!player) return message.channel.send(error);
        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send(Verror);

        if(!args[0]) return message.channel.send(`Invalid arguements. Format: ${prefix}loop <queue/single/none>`);
        if(args[0] == "single") {
            if(player.trackRepeat == true) {
                return message.channel.send(singleEmbedError);
            }else{
                if(player.queueRepeat == true) player.setQueueRepeat(false);
                player.setTrackRepeat(true);
                return message.channel.send(singleEmbedSuccess);
            }
        }
        if(args[0] == "queue") {
            if(player.queueRepeat == true) {
                return message.channel.send(Qerror);
            }else{
                if(player.trackRepeat == true) player.setTrackRepeat(false);
                player.setQueueRepeat(true);
                return message.channel.send(QueueEmbedSuccess);
            }
        }
        if(args[0] == "none") {
            if(player.trackRepeat == true) {
                player.setTrackRepeat(false);
            }
            if(player.queueRepeat == true) {
                player.setQueueRepeat(false);
            }
            return message.channel.send(Nerror);
        }
    
    }
}