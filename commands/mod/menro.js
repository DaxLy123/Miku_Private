const {RichEmbed} = require("discord.js");
module.exports = {
  name: "menro",
  category: "mod",
  aliases: ["mention-role", "men-role"],
  usage: "menro <rolename> | menro here | menro everyone",
  run: async(client, message, args) => {
    let ManagePermError = new RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`❌ Error ❌`)
    .setDescription(`You must have MANAGE_MESSAGES permission.`)
    .setColor("RANDOM")
    .setTimestamp()
    let noManagePerm = new RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`❌ Error ❌`)
    .setDescription(`I am missing the \`MANAGE_ROLES\` Permission.`)
    .setColor("RANDOM")
    .setTimestamp()
    let noArgs = new RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`❌ Error ❌`)
    .setDescription(`Specify a role name.  ¯\_(ツ)_/¯`)
    .setColor("RANDOM")
    .setTimestamp()
    let NoRoleNamedThat = new RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`❌ Error ❌`)
    .setDescription(`There is no role named that.  ¯\_(ツ)_/¯`)
    .setColor("RANDOM")
    .setTimestamp()
    let RoleHigherThanMe = new RichEmbed()
    .setAuthor(" | " + message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`❌ Error ❌`)
    .setDescription(`That role is higher than me`)
    .setColor("RANDOM")
    .setTimestamp()
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ManagePermError);
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(noManagePerm);
        await message.delete().catch(() => {});
        if(!args[0]) return message.channel.send(noArgs);
        if(args[0] == "everyone") return message.channel.send(`@everyone`)
        if(args[0] == "here") return message.channel.send(`@here`)
        let role = message.guild.roles.find(r => r.name === args.join(" "));
        if(!role) return message.channel.send(NoRoleNamedThat);
        let botrole = message.guild.me.highestRole;
        if(role.position > botrole.position) return message.channel.send(RoleHigherThanMe);
        await role.setMentionable(true)
        await message.channel.send(`${role.toString()}`).catch();
        await role.setMentionable(false);
      }
}