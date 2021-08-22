const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const { join } = require('path');
const { readdirSync } = require('fs');

module.exports = class LocaleStructure {
    constructor(client) {
        this.client = client;
        this.languages = ["pt", "en"];

        i18next.use(backend).init({
            initImmediate: false,
            ns: ["commands", "events"],
            fallbackLng: 'pt',
            preload: readdirSync("./src/lang/"),
            initImmediate: false,
            interpolation: { escapeValue: false },
            returnEmpyString: false,
            backend: {
                loadPath: join(__dirname, '../lang/{{lng}}/{{ns}}.json')
            }
        });
    };
};
