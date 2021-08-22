require("dotenv").config()
const Danithan = require('./src/Danithan');
const { EthanEmbed } = require("ethanutils")
require("./src/Structures/DaniError");
const { Manager } = require('erela.js');
const ErisComponents = require("eris-components")
const i18next = require("i18next");
const client = new Danithan("Bot " + process.env.BOT_TOKEN, {
  allowedMentions: {
    everyone: false
  },
  maxShards: 2,
  intents: 32767,
  restMode: true,
  defaultImageFormat: 'png',
  defaultImageSize: 2048
});

const options = {
  debug: false, // Debug disabled.
  invalidClientInstanceError: false, // Only set this option to false if client instance error is bugged.
  ignoreRequestErrors: false // If Eris Components should ignore errors on request (4xx or 5xx) codes.
};

const ComponentsClient = ErisComponents.Client(client, options);

module.exports = client
client.startLoaders();
client.connect();
client.messageCollectors = []
client.reactionCollectors = []
client.components = ComponentsClient
function MsToDate(ms) {
  let seg = Math.floor(ms / 1000)
  let minutes = 0
  let hours = 0
  let days = 0

  while (seg >= 60) minutes++, seg -= 60
  while (minutes >= 60) hours++, minutes -= 60
  while (hours >= 24) days++, hours -= 24
  return {
    dias: days,
    horas: hours,
    minutos: minutes,
    segundos: seg
  }
};

const nodes = [
  {
    identifier: 'Danithan Caraibas Node',
    host: 'lavalink-danithan.herokuapp.com',
    port: 80,
    password: process.env.LAVALINK_PASS,
    retryAmount: 30,
    retryDelay: 3000,
    secure: false
  },
  {
    identifier: 'Danithan Maldivas Node',
    host: 'lavalink-danithan1.herokuapp.com',
    port: 80,
    password: process.env.LAVALINK_PASS,
    retryAmount: 30,
    retryDelay: 3000,
    secure: false
  }
];

client.manager = new Manager({
  nodes,
  send: (id, payload) => {
    const guild = client.guilds.get(id);
    if (guild) guild.shard.ws.send(JSON.stringify(payload))
  }
});


client.once('ready', () => {
  client.manager.init(client.user.id);
});
client.lavalinkPings = new Map();

client.manager.on('nodeConnect', (node) => {
  console.log(`\x1b[36m[Lavalink]: Conectei o node ${node.options.identifier}.\x1b[0m`);
 
});

client.manager.on('nodeError', (node, error) => {
  if (error.message.includes("503")) return 
  console.log(`\u001b[31m[Lavalink]: Ocorreu um erro no node ${node.identifier}.\nErro: ${error.message}\u001b[33m`);
});

client.on('error', async (err) => {
  console.error("\u001b[31m[Erro]: " + err + "\u001b[33m");
});
client.manager.on("trackStart", async (player, track) => {
  let gRes = await client.database.guild.findOne({ guildID: player.guild })


let language = gRes.Settings.lang
let t = await i18next.getFixedT(language, ["commands", "events"]);

  const channel = client.getChannel(player.textChannel);
  // Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
  const embedaa = new EthanEmbed()
    .setTitle(t("events:trackStart.title"))
    .addField(t("events:trackStart.music"), `[${track.title}](${track.uri})`)
    .addField(t("events:trackStart.requester"), track.requester.username)
    .setColor("RANDOM")
    .setFooter(t("events:trackStart.footer"))
  const mensagem = await channel.createMessage(embedaa)
  setTimeout(() => {
    const verif = client.getChannel(player.textChannel).messages.get(mensagem.id)
    if (verif) verif.delete()
  }, 30000);
})
client.manager.on('trackError', (player, track, message) => {
  console.log(message.error)
})
client.on("rawWS", async (packet) => {
  client.manager.updateVoiceState(packet)

  if (packet.t === "INTERACTION_CREATE" && packet.d.type === 3) {
    console.log("Id da guild" + packet.d.guild_id);
    console.log("Channel" + packet.d.channel_id);
    console.log("ID Message" + packet.d.id);


    if (packet.d.data.custom_id === "teste") {
      client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id)
        .edit("Alguém clicou numa interação com o custom_id " + packet.d.data.custom_id + " clicado por: " + packet.d.member.nick);
    };
    if (packet.d.data.custom_id === "delmsgeval") {
      if (packet.d.member.user.id !== "791347446298312724" && packet.d.member.user.id !== "718078381199065150" && packet.d.member.user.id !== "852650555254767676") return console.log("Intruso");

      client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id).delete();
    };
  };
});

// up (cu)
