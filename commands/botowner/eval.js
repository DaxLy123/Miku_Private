const Discord = require("discord.js");

module.exports = {
  name: "eval",
  category: "botowner",
  description: "eval something!",
  Usage: "eval <code>",
  run: async(client, message, args) => {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        if (evaled.includes(client.token)) {
          client.channels.get("680375586639970325").send(`${message.author.tag} tried to get bot's token. User id: ${message.author.id}. <@455322915471097857>`).then(c => c.pin());
          message.channel.send(`No. You cannot get my token.`)
        }else{
          const embed = new Discord.RichEmbed()
          .addField(`${client.user.username} -  Trying:`, `** **`)
          .addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```")
          .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
          .setColor("RANDOM")
          .setFooter(client.config.footer, client.user.avatarURL)
          .setThumbnail(message.guild.iconURL)
          .setAuthor(" | " + message.author.tag, message.author.avatarURL)
          .setTitle(`Running Code!`)
          message.channel.send({embed});
        }
  

     // message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

}
}
 async function clean(text) {
   if (typeof(text) === "string")
     return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
   else
     return text;

}