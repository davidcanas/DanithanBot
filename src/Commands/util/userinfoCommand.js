const { EthanEmbed } = require('ethanutils');

const Command  = require("../../Structures/Command")

module.exports = class userinfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "userinfo", 
        aliases: ["ui", "infouser"],
         category: "Util",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {

}}