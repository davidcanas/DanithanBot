const { ReactionCollector} = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class messageDelete extends Event {
    constructor(client) {
        super(client, {
            name: 'messageDelete'
        });
    };

    async run(message) {
        this.client.reactionCollectors.forEach(collector => {
            if (collector.message.id === message.id) {
              collector.stop('Message Delete');
            }
          });

    }}