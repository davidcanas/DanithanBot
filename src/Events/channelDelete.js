
const Event = require("../Structures/Event");

module.exports = class channelDelete extends Event {
    constructor(client) {
        super(client, {
            name: 'channelDelete'
        });
    };

    async run(channel) {
this.client.reactionCollectors.forEach(collector => {
    if (collector.message.channel.id === channel.id) {
      collector.stop('Channel Delete')
    }
  });

  this.client.messageCollectors.forEach(collector => {
    if (collector.channel.id === channel.id) {
      collector.stop('Channel Delete')
    }
  });

}}