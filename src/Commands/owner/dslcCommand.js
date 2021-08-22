

//const firedb = firebase.database()

const Command = require("../../Structures/Command")
module.exports = class dslcCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "dslc", 
        aliases: ["112"],
        cooldown: 0,
         category: "Owner",
        devOnly: true
    })
}
async execute(ctx) {
      
        if (ctx.msg.author.id !== '791347446298312724') return 
  let metod = ctx.args.join(" ")
if(metod === "reboot method_force") {
ctx.msg.channel.createMessage("Forçando o Desligamento")
setTimeout(() => { 
      process.exit()
    }, 7000)
   
    }    
if(metod === "manu on") {
ctx.msg.channel.createMessage("Ativando o modo de manutenção")
setTimeout(() => { 
     // firedb.ref("Bot/Manu").set(true)
    }, 7000)
   
    }  
if(metod === "manu off") {
ctx.msg.channel.createMessage("Desativando o modo de manutenção")
setTimeout(() => { 
     // firedb.ref("Bot/Manu").set(false)
    }, 7000)
   
    }  
    if(metod === "force lang_pt") {
ctx.msg.channel.createMessage("Agora irei falar português")
setTimeout(() => { 
   
    }, 1000)
   
    }  
        if(metod === "force lang_en") {
message.channel.send("Agora irei falar inglês")
setTimeout(() => { 
   
    }, 1000)
   
    }  
        if(metod === "force lang_es") {
message.channel.send("Agora irei falar Espanhol")
setTimeout(() => { 
    
    }, 1000)
   
    }  

    if(metod === "force play_cidadefm") { 
    ctx.msg.content = "d/tugafm cidadefm"
    this.client.emit("messageCreate", message)
    }
}
      
  }