const Discord = require("discord.js");
const mongoose = require("mongoose");
const server = require("./../../mongodb/server");
const use = require("./../../mongodb/user");
module.exports = {
    name: "blacklist",
  category: "botowner",
  description: "Blacklist a server or a user",
  aliases: ["unblk"],
  usage: "unblacklist server <serverid> || unblacklist user <userid>",
    run: async(client, message, args, prefix, ops) => {
  if(message.author.id !== '665962249138995230' && message.author.id !== '455322915471097857') return  message.channel.send(`No No No You are not my developer!`)
    if(!args[0]) return message.channel.send(`Please type server or user to use. Correct Usage: **${prefix}blacklist <server/user> <server id/userid>.**`)
    if(args[0] == "server") {
      let serverid = args[1]
      let guild = client.guilds.get(serverid)
      if(!guild) return message.channel.send(`The id is invalid or i already left it!`);
      server.findOne({name: "server", serverid: serverid}).then(res => {
        if(!res || res == []) {
          return message.channel.send(`Server is already unblacklisted.`);
        }else{
          server.deleteOne({name: "server", serverid: serverid}).catch(() => {});
          message.channel.send(`Unblacklisted server.`)
        }
      })
    }
    if(args[0] == "user") {
      let userid = args[1]
      let user = client.users.get(userid)
      if(!user) return message.channel.send(`The id is invalid or you may not have sent a id.`);
      use.findOne({name: "user", userid: user.id}).then(c => {
        if(!c || c == []) {
          return message.channel.send(`User is already unblacklisted.`)
        }else{
          use.deleteOne({name: "user", userid: user.id}).catch(() => {});
          message.channel.send(`Unblacklisted user.`)
        }
      })
      
    }
}
}
