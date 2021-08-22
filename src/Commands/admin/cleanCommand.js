const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
module.exports = class cleanCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "clean", 
        aliases: ["limpar"],
         category: "Admin",
         description: {
             pt: "Apaga mensagens",
             en: "Clean messages"
         },
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {

   ctx.msg.delete()
          if (!ctx.msg.channel.permissionsOf(ctx.msg.author.id).has('manageMessages')) return ctx.msg.channel.createMessage(ctx.t("commands:clean.permuser"));
          

       if (!ctx.msg.channel.permissionsOf(this.client.user.id).has('manageMessages')) return ctx.msg.channel.createMessage(ctx.t("commands:clean.permbot"));

        if (!ctx.args.length)
            return ctx.msg.channel.createMessage(ctx.t("commands:clean.args"));
        
        const number = ctx.args[0];
        if (isNaN(number)) 
            return ctx.msg.channel.createMessage(ctx.t("commands:clean.number"));
        if (ctx.args[0] < 2 || ctx.args[0] >= 300) 
            return ctx.msg.channel.createMessage(ctx.t("commands:clean.limit"));
        
        const embed = new EthanEmbed()
            .setColor('RANDOM')
            .setTitle('Clean')
            .setTimestamp()
            .setFooter(ctx.msg.author.username, ctx.msg.author.dynamicAvatarURL());

      ctx.msg.channel.purge(parseInt(ctx.args[0])+1).then(async msgs => {
            if (parseInt(ctx.args[0])+1 !== msgs) {
                embed.setDescription(ctx.t("commands:clean.cleaned1", {msgn: `\`${msgs}\``}));
           } else {
                embed.setDescription(ctx.t("commands:clean.cleaned2", {msgn: `\`${msgs}\``}));
            const msg = await ctx.msg.channel.createMessage(embed);  
           }
           
        });
    }}
