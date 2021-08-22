const Command = require("../../Structures/Command");

module.exports = class LanguageCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "setlang", 
        aliases: ["langset", "lang"],
         category: "Config",
         description: {
         pt: "Seta a linguagem no servidor",
         en: "Sets the language of the server"
         },
        cooldown: 3,
    })
}

async execute(ctx) {
  if (!ctx.msg.channel.permissionsOf(ctx.msg.author.id).has('manageGuild')) return ctx.msg.channel.createMessage(ctx.t("commands:setlang.permuser"));
  let setada;
let langargs = ctx.args[0]
if (!langargs) return ctx.msg.channel.createMessage(ctx.t("commands:setlang.args"))

 if (langargs !== "pt" && langargs !== "en") return ctx.msg.channel.createMessage(ctx.t("commands:setlang.args"))
 if (langargs === "pt") {
   langargs = "pt"
   setada = "Português"
 }
 
 if (langargs === "en") {
   langargs = "en"
   setada = "English"
 }
 
 const data = await this.client.database.guild.findOne({guildID: ctx.msg.channel.guild.id})
data.Settings.lang = langargs
data.save()
ctx.msg.channel.createMessage(ctx.t("commands:setlang.sucess", { Lang: `${setada}`}))
}}