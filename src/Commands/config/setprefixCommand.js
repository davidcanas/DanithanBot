const Command = require("../../Structures/Command");

module.exports = class setPrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setprefix",
            aliases: ["prefix", "prefixo"],
            category: "Config",
            cooldown: 3,
        })
    }

    async execute(ctx) {
        let guildDB = await this.client.database.guild.findOne({ guildID: ctx.msg.guildID })
        let prefix = guildDB.Settings.prefix
        let args = ctx.args[0]
        if (!args) return ctx.msg.channel.createMessage(ctx.t("commands:prefix.args"))
        if (args.length > 3) {
            return ctx.msg.channel.createMessage(ctx.t("commands:prefix.args"))
        }
     const data = await this.client.database.guild.findOne({ guildID: ctx.msg.guildID})
        data.Settings.prefix = args
        data.save()
        ctx.msg.channel.createMessage(ctx.t("commands:prefix.sucess", {prefix: args}))
    }
}