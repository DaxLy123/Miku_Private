const {RichEmbed} = require("discord.js");
module.exports = { 
        name: "skip",
        aliases: ["next", "s"],
        description: "Skips the song currently playing.",
        category: "music",
        usage: "<input>",
    run: (bot, message, args) => {
        let client = bot;
        let emojiID = client.config.emojis;
        let success;
        if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
            success = "🎉"
        }else{
            success = client.emojis.get(emojiID.success)
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
        .setDescription(`You need to be in a voice channel with me to use the skip command.`)
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send(error);

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send(Verror);
        let successEmbed = new RichEmbed()
        .setTitle(`${success} Success ${success}`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`${success} Successfully skipped the current song!. ${success}`);
        let err = new RichEmbed()
        .setTitle(`❌ Error ❌`)
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setFooter(client.config.footer, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`You must have a role called **DJ** or must have **MANAGE_SERVER** permission or be in a channel with only you!`)
        
        let perm = message.guild.roles.find(r => r.name === "DJ");
      let user = message.guild.member(message.author);
      if(message.member.voiceChannel.members.size > 2) {
        if(perm) {
        if(!user.roles.has(perm.id)) {
            return message.channel.send(err);  
        }else{
            player.stop()
            return message.channel.send(successEmbed);
        }
        }else{
          if(!message.member.hasPermission("MANAGE_GUILD")) { 
            return message.channel.send(err); 
          }else{
            player.stop()
            return message.channel.send(successEmbed); 
          }
        }
      }else{
        player.stop()
        return message.channel.send(successEmbed);        
      }
    }
}