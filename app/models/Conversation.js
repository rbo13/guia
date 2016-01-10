(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var ConversationSchema = new Schema({
        guide: {
            id: String,
            name: String
        },
        traveler: {
            id: String,
            name: String
        },
        messages: [
            {
                from: {
                  id: String,
                  name: String,
                  profImage: String
                },
                body: String,
                created: { type: Date, default: Date.now }
            }
        ]
    });
//end creating conversation schema.
    module.exports = mongoose.model('Conversation', ConversationSchema);
})();