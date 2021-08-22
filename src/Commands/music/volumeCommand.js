const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class volumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Seta o volume de uma musica",
      aliases: ["vol"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {
    let player = this.client.manager.players.get(ctx.msg.channel.guild.id);

    if (!player) return ctx.msg.channel.createMessage(ctx.t("commands:volume.player"));

    const vc = ctx.msg.member.voiceState.channelID;
    if (!vc) return ctx.msg.channel.createMessage(ctx.t("commands:volume.voicechannel"))  

    const number = ctx.args[0]
    if (isNaN(number)) {
        ctx.msg.channel.createMessage(ctx.t("commands:volume.number"))
    }
    if (number > 120) return ctx.msg.channel.createMessage(ctx.t("commands:volume.limit"))
    player.setVolume(number)
    ctx.msg.channel.createMessage(ctx.t("commands:volume.sucess", {vol: number}))
}}