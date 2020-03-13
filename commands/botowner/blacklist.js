const Discord = require("discord.js");
const mongoose = require("mongoose");
const server = require("./../../mongodb/server");
const use = require("./../../mongodb/user");

module.exports = {
  name: "blacklist",
  category: "botowner",
  description: "Blacklist a server or a user",
  aliases: ["blk"],
  usage: "blacklist server <serverid> || blacklist user <userid>",
  run: async(client, message, args, ops, prefix) => {
    if(message.author.id !== '665962249138995230' && message.author.id !== '455322915471097857') return  message.channel.send(`No No No You are not my developer!`)
    if(!args[0]) return message.channel.send(`Please type server or user to use. Correct Usage: **${prefix}blacklist <server/user> <server id/userid>.**`)
    if(args[0] == "server") {
      let serverid = args[1]
      let guild = client.guilds.get(serverid)
      if(!guild) return message.channel.send(`The id is invalid or i already left it!`);
      server.findOne({name: "server", serverid: serverid}).then(res => {
        if(!res || res == []) {
          let newDoc = new server({
            _id: new mongoose.Types.ObjectId(),
            name: "server",
            server: guild.id,
            blacklist: true
          })
          newDoc.save().catch(console.error)
          message.channel.send(`Blacklisted server!`).then(c => c.react("✅"))
          client.channels.get("657853639716503553").send(`Blacklisted ${guild.name}. id: ${guild.id}`)
        }else{
          message.channel.send(`That server is already blacklisted.`)
        }
      })
    }
    if(args[0] == "user") {
      let userid = args[1]
      let user = client.users.get(userid)
      if(!user) return message.channel.send(`The id is invalid or you may not have sent a id.`);
      use.findOne({name: "user", userid: user.id}).then(c => {
        if(!c || c == []) {
          let newDoc = new use({
            _id: new mongoose.Types.ObjectId(),
            name: "user",
            userid: user.id,
            blacklist: true
          })
          newDoc.save().catch(console.error)
          message.channel.send(`Blacklisted user!`).then(c => c.react("✅"))
          client.channels.get("657853731051929600").send(`Blacklisted ${user.username}. ID: ${user.id}`)
        }else{
          message.channel.send(`User is already blacklisted`)
        }
      })
      
    }
  }
}
