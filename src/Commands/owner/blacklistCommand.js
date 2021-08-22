const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")
const moment = require("moment")
module.exports = class blacklistCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist",
            aliases: ["bl"],
            cooldown: 0,
            category: "Owner",
            devOnly: true
        })
    }
    async execute(ctx) {
        if (ctx.msg.author.id !== '791347446298312724') {
            return ctx.msg.channel.createMessage('Apenas meu criador');
        }
        let tipo = ctx.args[0]
        let user = ctx.args[1]
        let motivo = ctx.args.slice(2).join(" ")
        console.log(user)
        if (!tipo) return ctx.msg.channel.createMessage("Argumentos????")

        if (tipo === "add") {
            if (!motivo && !user) return ctx.msg.channel.createMessage("Precisas inserir um usuário e um motivo")
            let userDC = this.client.users.get(user) || await this.client.getRESTUser(user);
            if (userDC.id === "791347446298312724") return ctx.msg.channel.createMessage("Nem vou coemntar...")
            console.log(userDC)
            const data = await this.client.database.user.findOne({ userID: userDC.id })
            data.blacklist = true
            data.motivo = motivo
            data.horaBlacklist = `${moment().format("L")} ás ${moment().format("LT")}`
            data.save()
            let userTag = userDC.username + "#" + userDC.discriminator + " (" + userDC.id + ")"
            const a = new EthanEmbed()

                .setTitle("<:ban:826727595529469962> Usuário Banido com sucesso")
                .setDescription(`**${ctx.msg.author.username}**, desenvolvedor **oficial** do Danithan declara que **${userTag}** foi banido de usar o Danithan no dia **${moment().format("L")} ás ${moment().format("LT")}** _(horário de Lisboa)_ pelo seguinte motivo:\n\`${motivo}\``)
                .setFooter("Tribunal Constitucional do Danithan - Banimentos")
                .setColor("RED")
            ctx.msg.channel.createMessage(a)
        }
        if (tipo === "remove") {

            let userDC = this.client.users.get(user) || await this.client.getRESTUser(user);
            let userTag = userDC.username + "#" + userDC.discriminator + " (" + userDC.id + ")"
           const data = await this.client.database.user.findOne({ userID: userDC.id })
            data.blacklist = false,
            data.motivo = undefined,
            data.horaBlacklist = undefined
            data.save()
            const aa = new EthanEmbed()

                .setTitle("<:ban:826727595529469962> Usuário Desbanido com sucesso")
                .setDescription(`**${ctx.msg.author.username}**, desenvolvedor **oficial** do Danithan declara que **${userTag}** é novamente livre de usar o Danithan no dia **${moment().format("L")} ás ${moment().format("LT")}**`)
                .setFooter("Tribunal Constitucional do Danithan - Banimentos")
                .setColor("RED")
            ctx.msg.channel.createMessage(aa)
        }
        if (tipo === "info") {
            let userDC = this.client.users.get(user) || await this.client.getRESTUser(user);
            const find = await this.client.database.user.findOne({
                userID: userDC.id
            })
            if (!find.blacklist) return ctx.msg.channel.createMessage("Esse usuario não esta na blacklist")
            const emb = new EthanEmbed()
                .setTitle("Informações da blacklist de " + userDC.username + "#" + userDC.discriminator)
                .setColor("RED")
                .addField("📅 Data do banimento:", `\`${find.horaBlacklist}\``)
                .addField("📍 Motivo do Banimento", `\`${find.motivo}\``)
            ctx.msg.channel.createMessage(emb)
        }

    }
}