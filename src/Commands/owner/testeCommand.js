const { ReactionCollector } = require("ethanutils")
const Command = require("../../Structures/Command")
module.exports = class testeCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "teste", 
        aliases: ["113"],
        cooldown: 0,
         category: "Owner",
        devOnly: true
    })
}
async execute(ctx) {
 const msg = await ctx.msg.channel.createMessage("amen")
    const filter = (r, user) => (r.name === '👋') && user === ctx.msg.author
    console.log(ctx.msg.author)
    
    const collector = new ReactionCollector(this.client, msg, filter, { time: 120000 })
    collector.on('collect', async () => {
     console.log("coletei")
      ctx.msg.channel.createMessage(`testando`)
    })
    collector.on('stop', async () => {
        ctx.msg.channel.createMessage(`testando stop`)
      })
  
}}