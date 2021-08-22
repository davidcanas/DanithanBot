const { EthanEmbed } = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class guildDelete extends Event {
    constructor(client) {
        super(client, {
            name: 'guildDelete'
        });
    };

    async run(guild) {
        await this.client.database.guild.findOneAndDelete({ guildID: guild.id });  
        for (const collector of this.client.reactionCollectors) {
            if (collector.message.guildID === guild.id) {
              collector.stop('Guild Delete');
            }
          };
      
          for (const collector of this.client.messageCollectors) {
            if (collector.channel.type === 0 && collector.channel.guild.id === guild.id) {
              collector.stop('Guild Delete');
            }
          }
        const owner = this.client.users.get(guild.ownerID)
        const embed = new EthanEmbed()
            .setTitle('Fui expulso de um servidor')
            .addField('Nome', `\`${guild.name}\``)
            .addField('ID do servidor', `\`${guild.id}\``)
            .addField('Dono', `\`${owner?.username}#${owner?.discriminator}\``)
            .addField('Membros', `\`${guild.members?.size}\``)
            .setColor("DARK_AQUA")

        this.client.guilds.get("792018456786370590")?.channels.get('792018815646302228').createMessage(embed);
    };
};