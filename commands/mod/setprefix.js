const Discord = require("discord.js");
const pre = require("./../../mongodb/prefix");
const mongoose = require("mongoose");
const {RichEmbed} = require("discord.js");
module.exports = {
    name: "setprefix",
  category: "mod",
  description: "change prefix of the server!",
  aliases: ["prefix", "sprefix"],
  usage: "setprefix <prefix | reset (to reset to default)>",
run: async(client, message, args) => {
    let emojiID = client.config.emojis;
    let success;
    if(!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
        success = "🎉";
    }else{
        success = client.emojis.get(emojiID.success);
    }
  let prefix = args.join(" ");
      const noperms = new Discord.RichEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: Sorry ${message.author.tag} you did not specify a prefix.`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        let NoPerms = new RichEmbed()
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setTitle(`❌ Error ❌`)
        .setDescription(`Sorry ${message.author},You need ***ADMINISTRATOR*** permission to use the command.`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(NoPerms);
        let newprefix = args.join(" ");
        if(!args[0]) return message.channel.send(noperms);
      pre.findOne({name: "prefix", preid: message.guild.id}).then(result => {
          if(args[0] == "reset") {
              let DerrorEmbed = new Discord.RichEmbed()
              .setTitle("❌ Error ❌")
              .setColor("RANDOM")
              .setFooter(client.config.footer, client.user.avatarURL)
              .setTimestamp()
              .setThumbnail(message.guild.iconURL)
              .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
              .setDescription(`Prefix is already set to default!`)
              let sEmbed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setFooter(client.config.footer, client.user.avatarURL)
              .setTimestamp()
              .setThumbnail(message.guild.iconURL)
              .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
              .setDescription(`Successfully resetted the prefix to default!`)
              .setTitle(`${success} Done ${success}`)
              if(!result || result == []) return message.channel.send(DerrorEmbed)
              pre.deleteOne({name: "prefix", preid: message.guild.id}).catch(console.error);
              return message.channel.send(sEmbed)
          }else{
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "prefix",
            preid: message.guild.id,
            prefix: prefix
          })
        let send = new Discord.RichEmbed()
        .setTitle(`Done!`)
        .setDescription(`**Successfully** changed the prefix to **${newprefix}**`)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(send);
        if(!result || result == []) {
          duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "prefix", preid: message.guild.id}).catch(console.error)
          duck.save().catch(console.error)
        }
    }
      })
}
}

