
const Command  = require("../../Structures/Command")
const fetch = require("node-fetch")
module.exports = class docsCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "docs", 
        aliases: ["erisdocs"],
        description: "See the eris documentation [This command are ONLY in english",
         category: "Util",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
 if (!ctx.args[0]) return ctx.msg.channel.createMessage("Use: d/docs <Argument>")
 let erislink;
 let erislinktest = await fetch("https://erisdocsapi.herokuapp.com/").then(res => res.status)
 if (erislinktest === 200) {
     erislink = "erisdocsapi"
 } else {
     erislink = "erisdocsapi2"
 } 
 let abacaxi = await fetch(`https://${erislink}.herokuapp.com/docs?token=${process.env.ERIS_DOCS}&search=${encodeURIComponent(ctx.args.join(" "))}`).then(batata => batata.json()) 
 if (abacaxi.error) return ctx.msg.channel.createMessage("Not found")
 ctx.msg.channel.createMessage({embed: abacaxi})
}}
  
