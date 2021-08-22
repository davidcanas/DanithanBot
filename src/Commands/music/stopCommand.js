const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class stopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Para uma música",
      aliases: ["parar"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {

    let player = this.client.manager.players.get(ctx.msg.channel.guild.id);

    if (!player) return ctx.msg.channel.createMessage(ctx.t("commands:stop.player"));

    const vc = ctx.msg.member.voiceState.channelID;
    if (!vc) return ctx.msg.channel.createMessage(ctx.t("commands:stop.voicechannel"))
    
    player.destroy();
    ctx.msg.channel.createMessage(ctx.t("commands:stop.stopped")) 
  }}