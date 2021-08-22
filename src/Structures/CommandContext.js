//If you are the owner of one of these functions and you haven't been identified/want to change something in the credits, just give a pull request ;)
module.exports = class CommandContext {
    constructor(client, msg, args, t, emoji, ) {
      this.client = client;
      this.msg = msg;
      this.args = args;
      this.t = t;
      this.emoji = emoji;
    };
 
    //MsToDate by D4rkB
    MsToDate(ms){
      let seg = Math.floor(ms/1000)
      let minutes = 0
      let hours = 0
      let days = 0

      while (seg >= 60) minutes++, seg-=60
      while (minutes >= 60) hours++, minutes-=60
      while (hours >= 24) days++, hours-=24
      return {
      dias: days,
      horas: hours,
      minutos: minutes,
      segundos: seg
      }
  };
  //getMoreCommonChars By 5antos
  getMoreCommonChars(string) {
    const chars = {}
    for(var i = 0; i < string.length; i++) {
      if (!chars[string[i]])
        chars[string[i]] = { char: string[i], count: 0 }
      chars[string[i]].count++
    }
    return Object.entries(chars).sort((a,b) => b[1].count - a[1].count)[0][1].char
  }
 //abbreviateNumber By 5antos
  abbreviateNumber(number, precision=2) {
    const suffsFromZeros = { 0:'', 3:'k', 6:'M', 9:'G', 12:'T' }
    const { length } = number.toString()
    const lengthThird = length%3
    const divDigits = length-(lengthThird || lengthThird+3)
    const calc = ''+(number/(10**divDigits)).toFixed(precision)
  
    return number < 1000 ? ''+number : (calc.indexOf('.') === calc.length-3 ? calc.replace(/\.00/, '') : calc)+suffsFromZeros[divDigits]
  }
  inlineReply(mens, ch) {
    if (!ch) {
      ch = this.msg.channel
    }
    if (!mens) {
      throw new Error("An message content is required !")
    }
    const body = {
      content: mens,
      message_reference: {
        message_id: this.msg.id,
        channel_id: ch.id,
        guild_id: ch?.guild.id
    }
  }

  const fetch = require('node-fetch')
  fetch(`https://discord.com/api/v8/channels/${ch.id}/messages`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }
  })
  };
};