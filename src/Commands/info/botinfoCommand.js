
const { EthanEmbed } = require("ethanutils")
const os = require("os")
const Command  = require("../../Structures/Command")
const cpu1 = require('node-os-utils');
module.exports = class botinfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "botinfo", 
        aliases: ["infobot"],
         category: "Info",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  const cpuValor = await cpu1.cpu.usage();
   let cmd = this.client.commands.size
   let serv = this.client.guilds.size
  let nome = `${this.client.user.username}#${this.client.user.discriminator}`

 const cmdCount = await this.client.database.bot.findOne({ botID: this.client.user.id });
        
 const botinfo = new EthanEmbed()
  .setTitle(ctx.t("commands:botinfo.title"))
  .setDescription(ctx.t("commands:botinfo.commandused") + ` **${cmdCount.commands}**`)
  .addField(ctx.t("commands:botinfo.name"), `**${nome}**`)
 .addField(ctx.t("commands:botinfo.owner"), "**CanasDev#0514**")
  .addField(ctx.t("commands:botinfo.servers"), `**${serv}**`)
  .addField(ctx.t("commands:botinfo.node"), `**${process.version}**`)
  .addField(ctx.t("commands:botinfo.library"), "**Eris**")
    .addField(ctx.t("commands:botinfo.commands"), `**${cmd}**`)
 .addField(ctx.t("commands:botinfo.created"), "**24/12/20**")
  .addField(ctx.t("commands:botinfo.cpu"), `**${cpuValor}%**`)
.addField(ctx.t("commands:botinfo.ram"), `**${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}MB**`)
 .setColor("BLUE")
 .setFooter(`Shard ${ctx.msg.channel.guild.shard.id}/1`, this.client.user.dynamicAvatarURL())
 .setThumbnail(this.client.user.dynamicAvatarURL())
 ctx.msg.channel.createMessage(botinfo)
}
}
