const { EthanEmbed } = require("ethanutils")
const Event = require("../Structures/Event");

module.exports = class shardDisconnect extends Event {
    constructor(client) {
        super(client, {
            name: 'shardDisconnect'
        });
    };

    async run(error, shard) {
console.log(`Ocorreu um erro na shard ${shard}: ${error}`)
let embed;
if (!error) {
embed = new EthanEmbed()
.setDescription(`A Shard ${shard} foi desconectada !`)
.setColor("RED")
} else {
    embed = new EthanEmbed()
    .setDescription(`A shard ${shard} foi desconectada, erro: ${error}`)
    .setColor("RED")

}
this.client.createMessage("873284241969004554", embed)
    }}