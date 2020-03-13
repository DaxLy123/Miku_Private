const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = { 
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        category: "music",
    run: async (bot, message, args) => {
        let client = bot;
        const player = bot.music.players.get(message.guild.id);
        let error = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`no song/s playing in this guild.`)
        if (!player || !player.queue[0]) return message.channel.send(error);
        const { title, author, duration, thumbnail } = player.queue[0];

        const embed = new RichEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
}