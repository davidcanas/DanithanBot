const { EthanEmbed } = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class messageReactionAdd extends Event {
    constructor(client) {
        super(client, {
            name: 'messageReactionAdd'
        });
    };

    async run(message, reaction, reactor) {
      console.log("emiti")
      console.log(reaction)  
      console.log(reactor)
      this.client.reactionCollectors.forEach(collector => {
            
        if (collector.message.id === message.id) {
              const user = this.client.users.get(reactor.id);
              console.log(user)
            
              if (user) {
               console.log("emiti message colect")
                collector.collect(reaction, user);
              }
              }
          });
    }}