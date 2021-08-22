const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
const fetch = require("node-fetch")
module.exports = class dogCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "dog", 
        aliases: ["randomDog", "cão"],
         category: "Fun",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
 const dog = await fetch("https://random.dog/woof.json").then(res => res.json())
console.log(dog)
const dogbed = new EthanEmbed()
.setTitle(ctx.t("commands:dog.title"))
.setImage(dog.url)
.setColor("BROWN")
ctx.msg.channel.createMessage(dogbed)
}}
