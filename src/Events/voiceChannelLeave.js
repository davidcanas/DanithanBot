const Event = require("../Structures/Event");

module.exports = class voiceChannelLeave extends Event {
    constructor(client) {
        super(client, {
            name: 'voiceChannelLeave'
        });
    };

    async run(member, oldChannel) {
        const player = this.client.manager.players.get(member.guild.id);
        if (!player) return;
        if (!member.bot && oldChannel.id === player.voiceChannel && !oldChannel.voiceMembers.filter(m => !m.bot).length) {
            player.destroy()
         this.client.createMessage(player.textChannel, 'Fiquei sozinho por isso sai do canal de voz ');
        }
    }}