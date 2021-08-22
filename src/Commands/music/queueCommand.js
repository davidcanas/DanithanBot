const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class queueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Vê a lista de músicas",
      aliases: ["lista"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {

    let player = this.client.manager.players.get(ctx.msg.channel.guild.id);

    if (!player) return ctx.msg.channel.createMessage(ctx.t("commands:queue.player"));

    const vc = ctx.msg.member.voiceState.channelID;
    if (!vc) return ctx.msg.channel.createMessage(ctx.t("commands:queue.voicechannel"))
 let test = []
    player.queue.forEach(q => {
  test.push("`" + q.title + "`" + "- " + "_(" + q.requester.username + "#" + q.requester.discriminator + ")_")
  console.log(q)
 })   
if (test === []) {
  return ctx.msg.channel.createMessage(ctx.t("commands:queue.queue"))
}
console.log(test.length)
if (test.length > 50) return test.slice(0, 50)
 const quebed = new EthanEmbed()
.setTitle(ctx.t("commands:queue.title")) 
.setDescription(test.join("\n"))
.setColor("GREEN")
.setFooter(ctx.msg.author.username + "#" + ctx.msg.author.discriminator)
.setTimestamp()
ctx.msg.channel.createMessage(quebed)
  }}