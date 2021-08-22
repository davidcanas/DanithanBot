const { ReactionCollector } = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class messageReactionRemove extends Event {
    constructor(client) {
        super(client, {
            name: 'messageReactionRemove'
        });
    };

    async run(message, reaction, userID) {
   console.log("emiti")
        this.client.reactionCollectors.forEach(collector => {
            if (collector.message.id === message.id) {
              collector.emit('remove', reaction, this.client.users.get(userID));
            }
          });
    }}