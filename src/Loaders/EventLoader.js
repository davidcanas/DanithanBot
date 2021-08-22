const { readdirSync } = require("fs");

module.exports = class EventLoader {
    constructor(client) {
        const dir = "./src/Events";

        const files = readdirSync(dir);
        if (!files) throw new Error(`EventLoader Error: No such file on directory '${dir}'`);
        const forEachFile = (filename) => {
            const Listener = require("../Events/" + filename);
            delete require.cache[require.resolve("../Events/" + filename)];

            const listener = new Listener(client);

            client.on(listener.name, (...args) => {
                listener.run(...args);
            });
        };

        files.forEach(forEachFile);
    };
};