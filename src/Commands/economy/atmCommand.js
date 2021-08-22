const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
module.exports = class atmCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "atm", 
        aliases: ["saldo", "balance"],
         category: "Economy",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {

    let member = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0])
    if(!member) {
        member = ctx.msg.author
    }
   let economia = await this.client.database.user.findOne({userID: member.id})
   if (!economia) {
       return ctx.msg.channel.createMessage(ctx.t("commands:atm.db", {member: member.username + "#" + member.discriminator}))
   }
   const ecobed = new EthanEmbed()
   .setTitle(ctx.t("commands:atm.title", {member: member.username}))
   .setDescription(ctx.t("commands:atm.desc",{tag: `${member.username}#${member.discriminator}`, danis: `${economia.economia.dinheiro} Dani(s)`}))
   .setFooter(ctx.msg.author.username + "#" + ctx.msg.author.discriminator, ctx.msg.author.dynamicAvatarURL())
   .setColor("YELLOW")
   ctx.msg.channel.createMessage(ecobed)


}}