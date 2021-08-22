const Event = require("../Structures/Event");

module.exports = class messageUpdate extends Event {
    constructor(client) {
        super(client, {
            name: 'messageUpdate'
        });
    };

    async run(msg, oldMessage) {
        if (!msg) return;
        if (!msg.channel.permissionsOf(this.client.user.id).has('sendMessages')) return;
        if (!oldMessage) return
        if (msg.author.bot) return;
        if (msg.content === oldMessage.content) return;
        this.client.emit('messageCreate', msg);
    };
};