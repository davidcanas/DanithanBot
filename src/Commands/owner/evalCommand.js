const { EthanEmbed, removeDupeChars } = require("ethanutils")
const Eris = require("eris")
//const ReactionHandler = require('eris-reactions');
//const sourcebin = require('sourcebin');
//const firebase = require("firebase")
const ExecutorStupidError = require("../../Structures/DaniError")
const guildDB = require("../../Database/models/guildDB")
//const firedb = firebase.database()
const Command = require("../../Structures/Command")

module.exports = class evalCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "eval", 
        aliases: ["ev"],
         category: "Owner",
        cooldown: 0,
        devOnly: true
    })
}
async execute(ctx) {
   
  try {

        if (ctx.msg.author.id !== '791347446298312724' && ctx.msg.author.id !== '718078381199065150' && ctx.msg.author.id !== '852650555254767676' && ctx.msg.author.id !== "733963304610824252") {
            return ctx.msg.channel.createMessage('Apenas meu criador');
        }
        const texto = ctx.args.join(' ')
        if(!texto) return ctx.msg.channel.createMessage(`<@${ctx.msg.author.id}> Insira algo para ser executado!`)
       const start = process.hrtime();      
     
    let code = eval(texto);
 if (code instanceof Promise) code = await code
        if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 });
        
      code = code.split(process.env.ERIS_DOCS).join("SECRET_CODE");
      code = code.split(process.env.BOT_TOKEN).join("SECRET_CODE");
 code = code.split(process.env.MONGOURI).join("SECRET_CODE");
const stop = process.hrtime(start);
    if(code.length > 1750) {
  
   return ctx.msg.channel.createMessage(`Como o codigo passou dos 1800 caracteres envio em anexo uma "file" com o código !\n||(Tempo de Execução: ${((stop[0] * 1e9) + stop[1]) / 1e6}ms )||`, {
name: 'eval.txt',
file: Buffer.from(code)
})
    }
    const evalBed = new EthanEmbed() 
    .setTitle("Eval Executado:")
    .setDescription(`\`\`\`js\n${code}\n\`\`\`\n**Tempo de Execução:**\n\`\`\`\n${((stop[0] * 1e9) + stop[1]) / 1e6}ms \n\`\`\``)
    
    .setColor("GREEN")
this.client.createMessage(ctx.msg.channel.id , {
  embed: evalBed.embed,
  components: [
    {
      type: 1,
    components: [
      {
        type: 2,
        style: 2,
        label: "🚮 Apagar Eval",
        disabled: false,
        url: undefined,
        custom_id: "delmsgeval"

      }
    ]
    }
  ]
})
    
    
      
   
        
      } catch(e) {
    const errBed = new EthanEmbed()
    .setTitle("Ocorreu um erro:")
    .setDescription(`\`\`\`js\n${e}\n\`\`\``)
    .setColor("RED")
  let msg = await this.client.createMessage(ctx.msg.channel.id, {
      embed: errBed.embed,
      components: [
        {
          type: 1,
        components: [
          {
            type: 2,
            style: 2,
            label: "🚮 Apagar Erro",
            disabled: false,
            url: undefined,
            custom_id: "delmsgeval"
    
          }
        ]
        }
      ]
    })

 
    
        
   
    }

      

    }
}
