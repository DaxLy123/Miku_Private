const Discord = require("discord.js");
const {RichEmbed} = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.afk = new Map();
const Enmap = require("enmap");
client.commands = new Enmap();
client.aliases = new Enmap();
client.cooldown = new Set();
client.snipe = new Map();
const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("commmands");
const mongoose = require("mongoose");
const {readdirSync} = require("fs");
client.aliashelp = []
const handleE = () => {
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
  
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });
}
const handleC = () => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => { 
              client.aliases.set(alias, pull.name)  
              if(pull.category !== "botowner") client.aliashelp.push(alias)
            });
        }
    });
    
    console.log(table.toString());
}

const handleAPI = () => {
  const ameClient = require("amethyste-api")
  client.ameApi = new ameClient(client.config.ameapi);
}
handleC();
handleE();
handleAPI();

mongoose.connect(`mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
  console.log(`Connected to the database!`);
}).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

    client.on("messageDelete", async m => {
      client.snipe.set(m.channel.id, {
        content: m.content,
        sender: m.author.id
      })

      setTimeout(() => { client.snipe.delete(m.channel.id)}, 300000);
    });
const {formatDate} = require("./functions.js")

client.on("guildCreate", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle(`I have been added to a new guild!`)
  .setDescription(`This guild has ${guild.memberCount} members.`)
  .addField("\u200b", `Owner: ${client.users.get(guild.owner.id)}`)
  .addField("\u200b", `Owner id: ${guild.owner.id}`)
  .addField("\u200b", `Guild name: ${guild.name}`)
  .addField("\u200b", `Guild id: ${guild.id}`)
  .setFooter(`This guild was created at ${formatDate(guild.createdAt)}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  client.channels.get(client.config.join_log).send(embed);
  client.channels.get(client.config.server_count).edit({name: `${client.guilds.size} guilds`});
})

client.on("guildDelete", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle(`I have been removed from a guild!`)
  .setDescription(`This guild has ${guild.memberCount} members.`)
  .addField("\u200b", `Owner: ${client.users.get(guild.owner.id)}`)
  .addField("\u200b", `Owner id: ${guild.owner.id}`)
  .addField("\u200b", `Guild name: ${guild.name}`)
  .addField("\u200b", `Guild id: ${guild.id}`)
  .setFooter(`This guild was created at ${formatDate(guild.createdAt)}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  client.channels.get(client.config.leave_log).send(embed);
  client.channels.get(client.config.server_count).edit({name: `${client.guilds.size} guilds`});
});

const active = new Map();
const server = require("./mongodb/server");
const use = require("./mongodb/user");
const pr = require("./mongodb/prefix");
const debug = require("./mongodb/debug");
const global = require("./mongodb/global-chat");
client.channelCooldown = new Set();
const level = require("./mongodb/level");
client.on("message", message => {

    if (message.author.bot) return;
  let no = client.emojis.get("657898203462762536")
  let prefix = config.prefix
  server.findOne({name: "server", server: message.guild.id}).then(async r => {
  if(!r == []) {
    if(message.content.startsWith(prefix)) return message.react(no);
  }
  use.findOne({name: "user", userid: message.author.id}).then(async u => {
    if(!u == []) {
      if(message.content.startsWith(prefix)) return message.react(no);
    }
    global.findOne({name: 'global', guildid: message.guild.id, channel: message.channel.id}).then(async cor => {
    global.find({}).then(async glo => {
      var chchannel;
      if(cor) { chchannel = client.channels.get(cor.channel); 
      if(chchannel) {
        message.delete().catch(() => {});
      if(message.channel.name === chchannel.name) {
        if(message.content.includes("https://") || message.content.includes("discord.gg")) { 

          if(!client.config.owners.some(r => r === message.author.id) && !client.config.testers.some(r => r === message.author.id))return message.channel.send(`${message.author}, No sending invites in global chat.`).then(m => m.delete(5000));
      }
      if(client.channelCooldown.has(message.channel.id)) return message.channel.send(`${message.author}, Please wait 15 seconds before sending in a global chat.`);
      glo.forEach(r => {
        let embed = new RichEmbed()
        .setAuthor(` | ${message.author.tag}`, message.author.avatarURL)
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        .setTimestamp()
        .setTitle(`Message :-`)
        .setDescription(message.content)
        .setThumbnail(message.guild.iconURL)
        let channel = client.channels.get(r.channel);
        if(!channel) return;
        return channel.send(embed);
        //channel.send(`${message.author.tag} :- ` + message.content);
      });
     // message.channel.send(`${message.author.tag} :- ` + message.content);
      client.channelCooldown.add(message.channel.id);
      setTimeout(() => {
        client.channelCooldown.delete(message.channel.id);
      }, 15000);
    }
  }
    }

  if(message.channel.id === "683396814136803427") {
    const embed = new Discord.RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setTitle(`Update!`)
    .setDescription(message.content)
    .setColor("RANDOM")
    .setFooter(client.config.footer, client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    message.delete()
    message.channel.send(embed);
  } 
  if(message.channel.type == "dm") return message.channel.send(`dm's disabled :))`)
  pr.findOne({name: "prefix", preid: message.guild.id}).then(async result => {
    if (message.content.includes(message.mentions.users.first())) {
      client.afk.forEach(key => {
        if (key.id == message.mentions.users.first().id) {
          message.guild.fetchMember(key.id).then(member => {
            let user_tag = member.user.tag;
            return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
          });
        }
      });
    }
  
    client.afk.forEach(async key => {
      if (message.author.id === key.id) {
        let user = client.users.get(key.id);
        let member = await message.guild.fetchMember(key.id);
        if(member.nickname) {
        if(member.nickname.includes("[AFK]")) {
          let name = member.nickname.replace("[AFK]", "");
          member.setNickname(name);
        }
      }
        client.afk.delete(message.author.id);
        return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
    }
    });
let prefix = result ? result.prefix : config.prefix;
  if (message.isMentioned(client.user)) {
    const embed = new Discord.RichEmbed()
    .setDescription(`Hello ${message.author}, My prefix is ${prefix} in this guild. use ${prefix}help to see my commands.`);
    message.channel.send(embed);
  }
  if(!message.content.startsWith(prefix)) return;
  if(client.cooldown.has(message.author.id)) {
    if(!client.config.owners.some(r => r === message.author.id)) return message.channel.send(`Please wait 15 seconds before using a command again.`).then(m => m.delete(10000))
  }
  debug.findOne({name: 'debug'}).then(async result => {
    if(result || !result == []) {
      if(!client.config.owners.some(r => r === message.author.id)) return message.channel.send(`Debug mode one. Developer's are testing the bot. Until Debug is turned off. The bot is disabled for public.`)
    }
  if(!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send(`Pleas give me embed permission cause my commands won't work if i don't have embed.`)
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if(command.availability) {
      let role = message.guild.roles.find(r => r.name === command.availability.toLowerCase());
      if(!role) return message.channel.send(`This command cannot be used until there is a role called **${command.availability.toLowerCase()}**.`)
      if(!message.member.roles.find(r => r.name === command.availability.toLowerCase())) return message.channel.send(`Yuu need ${command.availability.toLowerCase()} role to use this command.`)
      return command.run(client, message, args, prefix);
    }
    if(command.category == "botowner") {
      if(!client.config.owners.some(r => r === message.author.id)) return message.channel.send(`Sorry You tried to use a bot owner command. it's not allowed to use.`)
    }
    command.run(client, message, args, prefix);
    client.cooldown.add(message.author.id);
    setTimeout(() => {
      client.cooldown.delete(message.author.id);
    }, 15000)


  }
  })
  })
});
  })
})
  });
});

client.login(config.token);