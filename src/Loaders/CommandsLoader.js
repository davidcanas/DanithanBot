//By MrLuis
const { readdirSync } = require('fs')

module.exports = class CommandsLoader {
    constructor(client) {
        const categoriesPath = "./src/Commands";

        const categories = readdirSync(categoriesPath);
        if (!categories) throw new Error(`CommandLoader Error: No such file on '${categoriesPath}'`);

        const forEachCategory = (category) => {
            const forEachCommand = (commando) => {
                const Command = require(`../Commands/${category}/${commando}`);

                delete require.cache[require.resolve(`../Commands/${category}/${commando}`)];

                const newcommand = new Command(client);
                client.commands.set(newcommand.commandSettings.name, newcommand);

                newcommand.commandSettings.aliases.forEach(alias => client.aliases.set(alias, newcommand.commandSettings.name));
            }

            const commandsPath = `./src/Commands/${category}`;

            const commands = readdirSync(commandsPath);
            if (!commands) return console.log(`CommandLoader Warn: Category '${category}' is empty`);

            commands.forEach(forEachCommand);
        };

        categories.forEach(forEachCategory);
    };
};