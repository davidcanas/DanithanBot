const emo = require("../utils/emojis");
const client = require("../../danithan.js");
const { EthanEmbed, ReactionCollector, MessageCollector } = require('ethanutils');
//const ReactionHandler = require('eris-reactions');

const i18next = require("i18next");
const Event = require("../Structures/Event");
const CommandContext = require("../Structures/CommandContext");
const { verificaSemelhanca } = require('../utils/dife.js');

const tmp = [];

module.exports = class messageCreate extends Event {
  constructor(client) {
    super(client, {
      name: 'messageCreate'
    });
  };

  async run(msg) {
    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.id === msg.channel.id) {
        collector.collect(message);
      }
    })


    try {
      let gRes = await this.client.database.guild.findOne({ guildID: msg.guildID })

      if (!gRes) {
        await this.client.database.guild.create({
          guildID: msg.guildID,
          Settings: {
            prefix: "d/"
          }
        });
        gRes = await this.client.database.guild.findOne({ guildID: msg.guildID });
      };

      let language = gRes.Settings.lang
      let t = await i18next.getFixedT(language, ["commands", "events"]);

      let prefix1 = gRes.Settings.prefix

      if (!prefix1) prefix1 = "d/"
      if (msg.author.bot) return
      if (msg.content.startsWith(`<@${this.client.user.id}>`) || msg.content.startsWith(`<@!${this.client.user.id}>`)) {
        let botembed = new EthanEmbed()
          .setTitle(t("events:mention.title"))
          .setDescription(t("events:mention.description", { UserTag: `${msg.author.username}#${msg.author.discriminator}`, Prefix: prefix1 }))
          .setColor("YELLOW")
          .setFooter(t("events:mention.footer"))

        const msg1 = await msg.channel.createMessage(botembed)
        msg1.addReaction("❓")
        const filter = (r, user) => (r.name === '❓') && user === msg.author
        const collector = new ReactionCollector(this.client, msg1, filter, { time: 120000 })
        collector.on('collect', async () => {

          msg.content = `${prefix1}help`
          this.client.emit("messageCreate", msg)
        })
      };
      const emoji = emo

      let prefix = gRes.Settings.prefix

      if (!msg.content.startsWith(prefix)) return;
      let args = msg.content.slice(prefix.length).trim().split(/ +/g);

      let cmd = args.shift().toLowerCase();
      let command;
      if (cmd.length === 0) return;

      if (this.client.commands.has(cmd)) {
        command = this.client.commands.get(cmd);
      } else {
        command = this.client.commands.get(this.client.aliases.get(cmd));
      }


      let array;
      if (msg.author.id !== "793063574834118696") {
        array = this.client.commands.map(x => x.commandSettings.aliases.concat([x.commandSettings.name])).flat().filter(e => e)//pega todos os comandos(aliases tambem)
      } else {
        array = this.client.commands.map(x => x.commandSettings.aliases.concat([x.commandSettings.name])).flat().filter(e => e)
      }

      if (!command) {
        const emb = new EthanEmbed()
          .setDescription(t("events:didYouMean.msg", { Cmd: cmd, didYouMean: verificaSemelhanca(cmd, array) }))
          .setColor("RED")

        const mensg = await msg.channel.createMessage(emb)
        setTimeout(() => {
          mensg.delete()
        }, 15000);
      }


      if (command) {
        let uRes = await this.client.database.user.findOne({ userID: msg.author.id })

        if (!uRes) {
          await this.client.database.user.create({
            userID: msg.author.id,
          });
          uRes = await this.client.database.user.findOne({ userID: msg.author.id });
        };

        if (!msg.channel.permissionsOf(this.client.user.id).has('sendMessages')) return this.client.users.get(msg.author.id).getDMChannel().then(a => a.createMessage("Lamento mas não tenho permissão de enviar mensagens !"));
        let userVerif = await this.client.database.user.findOne({ userID: msg.author.id });
        if (userVerif.blacklist) {
          const embeda = new EthanEmbed()
            .setTitle("<:ban:826727595529469962> Você está banido !")
            .setDescription(`${msg.author.mention}, você foi e está banido de me usar desde \`${userVerif.horaBlacklist}\` pelo motivo \`${userVerif.motivo}\`\n`)
            .setColor("RED")
            .setFooter("Adeus, até um dia !")
          return msg.channel.createMessage(embeda).then(a => {
            setTimeout(() => {
              a.delete()
            }, 15000);
          });
        };
      };
      const ctx = new CommandContext(this.client, msg, args, t, emoji)
      if (command) {
        command.execute(ctx);

        const bruh = await this.client.database.bot.findOne({ botID: this.client.user.id });
        ++bruh.commands;
        bruh.save();
        //THank you d4rkb 
        const commando = new EthanEmbed()
          .setTitle('Log de Comandos')
          .addField("Username", `${msg.author.username}#${msg.author.discriminator}`)
          .addField("ID do usuário", `${msg.author.id}`)
          .addField("Nome do Servidor:", `${msg.channel.guild.name}`)
          .addField("Id do servidor:", `${msg.channel.guild.id}`)
          .addField("Canal Utilizado", `${msg.channel.name} (${msg.channel.id})`)
          .addField("Comando utilizado:", `${msg.content}`)
          .setColor("RED")

        this.client.createMessage("792018829407420427", commando);
      };
    } catch (err) {
      console.error(err)
    };
  };
};
