const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")

module.exports = { 
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<input>",
        category: "music",
        aliases: ["p", "pplay"],
    run: async (bot, message, args) => {
        let client = bot;
        let emojiID = client.config.emojis;
        let loading, success
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            loading = "👷"
            success = "🎉"
        }else{
            loading = client.emojis.get(emojiID.loading);
            success = client.emojis.get(emojiID.success);
        }
        let error = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`I cannot connect to your voice channel, make sure I have permission to!`)
        let Verror = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`You need to be in a voice channel with me to use the play command.`)
        let NoArgs = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`Please provide a song name or link to search`)
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send(Verror);

        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has("CONNECT")) return message.channel.send(error);
        if (!permissions.has("SPEAK")) return message.channel.send(error);

        if (!args[0]) return message.channel.send(NoArgs);

        const player = bot.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel,
            selfDeaf: true
        });
        bot.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    let LoadingEmbed = new RichEmbed()
                    .setTitle(` ${loading} Loading ${loading}`)
                    .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
                    .setTimestamp()
                    .setFooter(client.config.footer, client.user.avatarURL)
                    .setColor("RANDOM")
                    .setDescription(`Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``)
                    message.channel.send(LoadingEmbed);
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embed = new RichEmbed()
                        .setAuthor("Song Selection.", message.author.displayAvatarURL)
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                    await message.channel.send(embed);

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1});

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        let TryingEmbed = new RichEmbed()
                    .setTitle(` ${loading} Loading ${loading}`)
                    .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
                    .setTimestamp()
                    .setFooter(client.config.footer, client.user.avatarURL)
                    .setColor("RANDOM")
                    .setDescription(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
                    message.channel.send(TryingEmbed);
                        if(!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    let successEmbed = new RichEmbed()
                    .setTitle(` ${loading} Loading ${loading}`)
                    .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
                    .setTimestamp()
                    .setFooter(client.config.footer, client.user.avatarURL)
                    .setColor("RANDOM")
                    .setDescription(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``)
                    message.channel.send(successEmbed);
                    if(!player.playing) player.play()
                    break;
            }
        }).catch(err => message.channel.send(err.message))
    }
}