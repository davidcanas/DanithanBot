const { connect, model } = require('mongoose')

module.exports = class DanithanDatabase {
    constructor(uri) {
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        
        connect(uri, options, err => {
            if(err) throw new Error("MongoDB Error: " + err);
            console.log(`\x1b[36m[${new Date().toUTCString()}] MongoDB connected with success\x1b[0m`);
        })

        return {
            ...this,
            user: model("User", require('./models/userDB')),
            guild: model("Guild", require('./models/guildDB')),
            bot: model("Bot", require('./models/botDB')),
            cmds: model("Cmds", require("./models/cmds"))
        };
    };
};