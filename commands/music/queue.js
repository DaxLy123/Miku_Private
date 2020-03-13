const { RichEmbed } = require("discord.js")

module.exports = { 
        name: "queue",
        aliases: ["q", "now"],
        description: "Displays what the current queue is.",
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
        if(!player || !player.queue[0]) return message.channel.send(error);

        let index = 1;
        let string = "";

            if(player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
            if(player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${x.requester.username}**.`).join("\n")}`;

        const embed = new RichEmbed()
            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL)
            .setThumbnail(player.queue[0].thumbnail)
            .setFooter(client.config.footer, client.user.avatarURL)
            .setTimestamp()
            .setDescription(string);

        return message.channel.send(embed);
    }
}