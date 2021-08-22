const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")
const fetch = require("node-fetch")
module.exports = class lavalinkCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lavalink",
            aliases: ["lv"],
            category: "Info",
            cooldown: 0,
            devOnly: false
        })
    }
    async execute(ctx) {
        try {
            let lava = this.client.manager.nodes.filter(a => a.stats.uptime !== 0).first()
            const startLL = process.hrtime();
            const lavaV = await fetch(`http://${lava.options.host}/version`, {
                headers: { Authorization: process.env.LAVALINK_PASS }
            });
            const stopLL = process.hrtime(startLL);

            const lavalinkPing = Math.round(((stopLL[0] * 1e9) + stopLL[1]) / 1e6);
            let lavabed = new EthanEmbed()
                .setTitle(ctx.t("commands:lavalink.title"))
                .addField(':palm_tree: Node', `${lava.options.identifier}`)
                .addField(":ping_pong: Ping", `${lavalinkPing}ms`)
                .addField(':cd: Players', `\`${lava.stats.players}\``)
                .addField(':clock1: Uptime', `\`${ctx.MsToDate(lava.stats.uptime).dias}D:${ctx.MsToDate(lava.stats.uptime).horas}H:${ctx.MsToDate(lava.stats.uptime).minutos}M:${ctx.MsToDate(lava.stats.uptime).segundos}S\``)
                .addField("<:cpu:864523602145706024> CPU", `\`` + ctx.t("commands:lavalink.system") + `: ${Math.round(lava.stats.cpu.systemLoad * 100)}%\`\`\nLavalink: ${Math.round(lava.stats.cpu.lavalinkLoad * 100)}%\`\`\nCores: ${lava.stats.cpu.cores}\``)
                .addField("<:ram1:864523884442550333> RAM", `${(lava.stats.memory.used / 1024 / 1024).toFixed(0)}mb`)
                .setColor("ORANGE")
                .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator} `, ctx.msg.author.dynamicAvatarURL())

            ctx.msg.channel.createMessage(lavabed);
        } catch (LavalinkError) {
            ctx.msg.channel.createMessage("Error: " + LavalinkError)
        }

    }
}
