const Discord = require("discord.js");
const {RichEmbed} = require("discord.js");
module.exports = {
    name: "poll",
  category: "mod",
  description: "Make a poll",
  usage: "poll <channel id or mention> <question>",
    run: async(client, message, args, prefix) => {
        let rmentioned = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Invalid channel or id ❌`)
        .setDescription(`You didn't mention channel or put a channel id. Format: ${prefix}poll <channel id or mention> <question>.`)
        .setColor("RANDOM")
        .setTimestamp()
        let Wrongmentioned = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Invalid channel or id ❌`)
        .setDescription(`You didn't mention channel or put a channel id. Format: ${prefix}poll <channel id or mention> <question>.`)
        .setColor("RANDOM")
        .setTimestamp()
        let rQuestion = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`You did not put any question. Format: \`${prefix}poll <channel id or mention> <question>\`.`)
        .setColor("RANDOM")
        .setTimestamp()
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You need BAN permission`)
  if(!args[0]) return message.channel.send(rmentioned);
  let channel = message.mentions.channels.first() || client.channels.get(args[0]);
  if(!channel) return message.channel.send(Wrongmentioned);
  if(!args[1]) return message.channel.send(rQuestion);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setDescription(args.slice(1).join(" "))
  .setThumbnail(message.guild.iconURL)
  let QQuestion = new RichEmbed()
        .setAuthor(" | " + message.author.tag, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTitle(`Mention?`)
        .setDescription(`You want to mention here/everyone? type "1" for everyone or "2" for here or "cancel" for none. You havce 60 second to choose.`)
        .setColor("RANDOM")
        .setTimestamp()
        let m = await message.channel.send(QQuestion);

        const collector = message.channel.createMessageCollector(m => {
            return m.author.id === message.author.id && new RegExp(`^([1-2]|cancel)$`, "i").test(m.content)
        }, { time: 60000, max: 1});

        collector.on("collect", async m => {
            if (/cancel/i.test(m.content)) {
                channel.send(embed).then(c => {
                    c.react("👍");
                    c.react("👎");
                  });
                return collector.stop("lol")
                }
                if(/1/i.test(m.content)) {
                    let c = await channel.send(embed);
        c.react("👍")
        c.react("👎")
        channel.send(`@everyone`)
        return collector.stop("lol");
                }
                if(/2/i.text(me.content)) {
                    let c = await channel.send(embed);
        c.react("👍")
        c.react("👎")
        channel.send(`@here`)
        return collector.stop("lol");
                }
            });
            collector.on("end", (_, reason) => {
                if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                return;
            });

}
}
