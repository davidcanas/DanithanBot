const { Schema } = require('mongoose');

module.exports = new Schema({   
    botID: { 
        required: true,
        type: String
    },
    commands: {
        type: Number,
        default: 1
    },
    developers: {
        type: Array
    },

}, { 
    versionKey: false
});