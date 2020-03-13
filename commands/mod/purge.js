const config = require("./../../config.json");
module.exports = {
  name: "purge",
  category: "mod",
  description: "purge messages :))",
  usage: "purge <amount>",
  aliases: ["prge", "purg"],
  run: (client, message, args) => { 
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" You do not have sufficient permissions to purge messages.");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" I do not have sufficient permissions to manage messages.");
  if(isNaN(args[0])) return message.channel.send(" Supply an number please");
  if (args[0] > 100) return message.channel.send(" I can't purge more than 100 messages.");
  message.channel.bulkDelete(args[0]);
  message.channel.send("Successfully deleted " + args[0] + " messages.");
}
}