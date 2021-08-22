const { ReactionCollector } = require("ethanutils")
const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
module.exports = class payCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pay",
            aliases: ["pagar"],
            category: "Economy",
            cooldown: 0,
            devOnly: false
        })
    }
    async execute(ctx) {
        const membro = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0])
        console.log(membro)
        console.log(ctx.msg)
        if (!membro) return ctx.msg.channel.createMessage(ctx.t("commands:pay.member"));
        let money = await this.client.database.user.findOne({ userID: ctx.msg.author.id })

        if (!membro.id) {
            return ctx.msg.channel.createMessage(ctx.t("commands:pay.member"))
        }
        let moneyMembro = await this.client.database.user.findOne({ userID: membro.id })
 


        if (membro.id === ctx.msg.author.id)
            return ctx.msg.addReaction("❌")
        if (!ctx.args[1]) ctx.msg.channel.createMessage(ctx.t("commands:pay.args"));
        if(ctx.args[1].includes("-")) {
            return ctx.msg.addReaction("❌")
        }
        if (money < ctx.args[1])
            return message.channel.send(ctx.t("commands:pay.args"));


       ctx.msg.channel.createMessage(ctx.t("commands:pay.confirm", {money: ctx.args[1], member: `${membro.username}#${membro.discriminator}`}))
            .then(msg => {
                msg.addReaction('👍');

                const filter = (r, user) => (r.name === '👍') && user === ctx.msg.author
                const collector = new ReactionCollector(this.client, msg, filter, { time: 60000, max: 1 })

                collector.on('collect', async () => {

                    msg.edit(ctx.t("commands:pay.sucess"));
               
                    moneyMembro.economia.dinheiro = moneyMembro.economia.dinheiro + ctx.args[1]
                   
                    moneyMembro.save()
                    money.economia.dinheiro = money.economia.dinheiro - ctx.args[1]
                    money.save()
                });
            });
    }
}