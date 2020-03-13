const { ErelaClient, Utils } = require("erela.js");
const {nodes} = require("./../config.json");
const {RichEmbed} = require("discord.js");
const snekfetch = require('snekfetch');
module.exports = async(bot) => {
    bot.channels.get(bot.config.channels.server_count).edit({name: `${bot.guilds.size} guilds`});

    bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            player.textChannel.send("Queue has ended.")
            return bot.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration, thumbnail}) => {
            let embed = new RichEmbed()
            .setAuthor(`Now Playing!`, thumbnail)
            .setThumbnail(thumbnail)
            .setFooter(bot.config.footer, bot.user.avatarURL)
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``)
            textChannel.send(embed).then(m => m.delete(15000));
            //textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000))
    })
        .on("trackEnd", player => {
        });
        setInterval(() => {
            snekfetch.post(`https://space-bot-list.org/api/bots/${bot.user.id}`)
    .set('Authorization', bot.config.sbl)
    .send({ guilds: bot.guilds.size, users: bot.users.size })
    .then(req => console.log(`posted to space bot list.`)).catch(() => {});

        }, 150000); 

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);
        bot.user.setStatus("idle");
    let activities = [ `${bot.guilds.size} servers!`, `${bot.channels.size} channels!`, `${bot.users.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${bot.config.prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

  
    console.log(`Logged in as ${bot.user.tag}.`);
}