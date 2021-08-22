const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")
const ErisComponents = require("eris-components")
module.exports = class helpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      aliases: ["ajuda", "ayuda"],
      description: "Mostra os meus comandos",
      category: "Info",
      cooldown: 0,
      devOnly: false
    })
  }
  async execute(ctx) {
    let utilCommand = this.client.commands.filter(a => a.commandSettings.category === "Util").map(a => a.commandSettings.name).join(",")
    let infoCommand = this.client.commands.filter(a => a.commandSettings.category === "Info").map(a => a.commandSettings.name).join(",")
    let musicCommand = this.client.commands.filter(a => a.commandSettings.category === "Music").map(a => a.commandSettings.name).join(",")
    const help = new EthanEmbed()
      .setTitle("<:danithan:826727176845787136> Comandos do Danithan")
      .setDescription("Para começar selecione uma categoria")
      .setFooter(ctx.msg.author.username + "#" + ctx.msg.author.discriminator, ctx.msg.author.dynamicAvatarURL())
      .setTimestamp()
      .setColor("GREEN")
 
    const categoria1 = new ErisComponents.MenuOption()
      .setLabel('Utilidades')
      .setValue('utilcmd')
      .setDescription('Veja os meus comandos utéis')
      .setDefault(false)
      .setEmoji('💡', false)

    const categoria2 = new ErisComponents.MenuOption()
      .setLabel('Informações')
      .setValue('infocmd')
      .setDescription('Veja os meus comandos de informações')
      .setDefault(false)
      .setEmoji('ℹ️', false)

    const categoria3 = new ErisComponents.MenuOption()
      .setLabel('Musica')
      .setValue('musiccmd')
      .setDescription('Veja os meus comandos de música')
      .setDefault(false)
      .setEmoji('🎵', false)

    const Menu = new ErisComponents.Menu()
      .setPlaceholder('Selecione uma categoria') // This will set a placeholder for the Select Menu.
      .setID('helpmenu')  // Sets the custom_id of the Select Menu. Util to recognize different components.
      .setMaxValues(1) // Sets the max options values of the Select Menu.
      .setMinValues(1) // Sets the min options values of the Select Menu.
      .setDisabled(false) // Sets the disabled state of the Select Menu. (Default true if called)
      .addOptions([categoria1, categoria2, categoria3]) // This method will add multiple options in the Select Menu.
      const Menu1 = new ErisComponents.Menu()
      .setPlaceholder('Selecione uma categoria') // This will set a placeholder for the Select Menu.
      .setID('helpmenu')  // Sets the custom_id of the Select Menu. Util to recognize different components.
      .setMaxValues(1) // Sets the max options values of the Select Menu.
      .setMinValues(1) // Sets the min options values of the Select Menu.
      .setDisabled(true) // Sets the disabled state of the Select Menu. (Default true if called)
      .addOptions([categoria1, categoria2, categoria3]) // This method will add multiple options in the Select Menu.

    let msg2 = await this.client.components.sendComponents(ctx.msg.channel.id, Menu, { content: "", embed: help.embed }); // Send a message with a button to a Discord channel.

const filter = ((body) => body.member.user.id === ctx.msg.author.id); // Example filter.
const channel = ctx.msg.channel.id; // Channel ID.
const options = { time: 10000 }; // Time in milliseconds in which the collector will stop. 
const thisArg = null; // Null because the filter is an arrow function.

let collector = new ErisComponents.ComponentsCollector(this.client, filter, channel, options, thisArg);

collector.on('collect', async (resBody) => { // On collect a component interaction that meets the filter. ResBody is the response body of the component interaction.
    console.log(resBody);
   if (resBody.data.values[0] === "infocmd" ) {
    await this.client.components.editComponents(msg2, Menu, {content: "info", embed: null})
   }
});
collector.on('end', async (resBody) => { 
  await this.client.components.editComponents(msg2, Menu1, {content: "O tempo expirou use o comando novamente", embed: null})
})
}

}
