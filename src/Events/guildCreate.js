const { EthanEmbed } = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class guildCreate extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        });
    };

    async run(guild) {
        await this.client.database.guild.create({
            guildID: guild.id,
            Settings: {
            prefix: "d/"
            } 
        });  
        const owner = this.client.users.get(guild.ownerID)
        const embed = new EthanEmbed()
            .setTitle('Entrei num servidor')
            .setColor('RANDOM')
            .addField('Nome', `\`${guild.name}\``)
            .addField('Dono', `\`${owner.username}#${owner.discriminator}\``)
            .addField('ID do servidor', `\`${guild.id}\``)
            .addField('Membros', `\`${guild.members.size}\``)
            .setThumbnail(guild.iconURL)
            .setTimestamp()

        this.client.guilds.get("792018456786370590").channels.get('792018815646302228').createMessage(embed);
    };
};