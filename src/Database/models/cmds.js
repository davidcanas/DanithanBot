const mongoose = require('mongoose');

module.exports = new mongoose.Schema({   
  
        name: {
          type: String,
          required: true
        },
        description: {
          pt: {
          type: String
          },
          en: {
            type: String
          }
        },
        category: {
          type: String

        },
        aliases: {
          type: Array
        }

      
}, { 
    versionKey: false
});
