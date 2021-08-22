const Command = require("../../Structures/Command")
const { exec } = require('child_process');
const { inspect } = require('util');

module.exports = class shellCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shell",
      aliases: ["sh"],
      category: "Owner",
      cooldown: 0,
      devOnly: true
    })
  }
  async execute(ctx) {
    if (ctx.msg.author.id !== '791347446298312724' && ctx.msg.author.id !== '852650555254767676') {
      return ctx.msg.channel.createMessage('Apenas meu criador');
    }
    let code = ctx.args.join(" ")
    exec(code, (error, stdout) => {
      try {
        const outputType = error || stdout;
        let output = outputType;
        try {

        } catch (err) {
          return ctx.msg.channel.createMessage(`\`\`\`shell\n${err.stack}\`\`\``)
        }
        output = output.length > 1980 ? output.substr(0, 1977) + '...' : output;
        return this.client.createMessage(ctx.msg.channel.id, {
          content: "```js\n" + output + "\n```",
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 2,
                  label: "🚮 Apagar Shell",
                  disabled: false,
                  url: undefined,
                  custom_id: "delmsgeval"

                }
              ]
            }
          ]
        })
      } catch (err) {
        this.client.createMessage(ctx.msg.channel.id, {
          content: "Erro: " + err,
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 2,
                  label: "🚮 Apagar Erro",
                  disabled: false,
                  url: undefined,
                  custom_id: "delmsgeval"

                }
              ]
            }
          ]
        })
      }
    });
  }

}
