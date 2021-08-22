const { create, all } = require('mathjs');
const { EthanEmbed } = require('ethanutils');

const Command  = require("../../Structures/Command")

module.exports = class calcCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "calc", 
        aliases: ["calcular"],
         category: "Util",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  
        const math = create(all);

        const limitedEvaluate = math.evaluate;
    
        math.import({
            import: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            createUnit: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            evaluate: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            parse: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            simplify: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            derivative: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            format: function() { throw new Error(ctx.t("commands:calc.invalid")) },
            zeros: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            ones: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            identity: function() { throw new Error(ctx.t("commands:calc.invalid")) },
            range: function () { throw new Error(ctx.t("commands:calc.invalid")) },
            matrix: function () { throw new Error(ctx.t("commands:calc.invalid")) }
        }, { override: true });

        const expr = ctx.args.join(' ').replace(/π/g, 'pi').replace(/÷|:/g, '/').replace(/×/g, '*').replace(/\*\*/g, '^').replace(/"|'|\[|\]|\{|\}/g, '').toLowerCase();
        let result;
    
        if (expr.length === 0)
            return ctx.msg.channel.createMessage(ctx.t("commands:calc.invalid"));
if (expr === "null" || expr === "undefined" || expr.includes("false") || expr.includes("true") || expr.includes("client.token") || expr.includes("this.client.token")) return ctx.msg.channel.createMessage(ctx.t("commands:calc.invalid"));

        try {
            result = limitedEvaluate(expr);
        }catch (err) {
            return ctx.msg.channel.createMessage(ctx.t("commands:calc.invalid"));
        }
    {}    if (result === Infinity || result === -Infinity || result.toString() === 'NaN') result = 'Calculo Impossível ';
        if (typeof result === 'function') return ctx.msg.channel.createMessage(ctx.t("commands:calc.invalid"));

        const embed = new EthanEmbed()
            .setColor('RANDOM')
            .setTitle(ctx.t("commands:calc.title"))
            .addField(ctx.t("commands:calc.field1"), `\`\`\`${ctx.args.join(' ')}\`\`\``)
            .addField(ctx.t("commands:calc.field2"), `\`\`\`${result}\`\`\``)
            .setTimestamp()
            .setFooter(ctx.t("commands:calc.footer"), ctx.msg.author.dynamicAvatarURL());
        
        ctx.msg.channel.createMessage(embed);
    }
}