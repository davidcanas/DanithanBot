
const { EthanEmbed } = require("ethanutils");
const Event = require("../Structures/Event");

module.exports = class shardReady extends Event {
    constructor(client) {
        super(client, {
            name: 'shardReady'
        });
    };

    async run(shard) {
       
        let activities = [
            `Utilize d/help para obter ajuda | Shard ${shard}/1 `,
            `Estou em ${this.client.guilds.size} servidores!| Shard ${shard}/1 `,
            ` Versão 1.2 | Grande atualização em breve | Shard ${shard}/1`,
            `😃 Já Conheço ${this.client.users.size} usuários ! | Shard ${shard}/1`,
            ``
        ]
      let i = 0;
        setInterval(async () => {
            this.client.shards.get(shard).editStatus('online', {
                name: `${activities[i++ % activities.length]}`,
                type: 0
            });

        }, 15000);
     console.log(`\u001b[32m[${new Date().toUTCString()}]Conectei a shard ${shard} com sucesso !\u001b[39m`)
     const embed = new EthanEmbed()
     .setDescription(`Shard ${shard} conectada !`)
     .setColor("GREEN")
     this.client.createMessage("873284241969004554", embed)
    }
}