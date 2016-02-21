(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var MessageSchema = new Schema({
        id: String,
        name: String,
        message: String,
        date: { type: Date, default: Date.now }
    });

    var ConversationSchema = new Schema({
        guide: {
            id: String,
            name: String,
            profImage: String,
        },
        traveler: {
            id: String,
            name: String,
            profImage: String
        },
        messages: [MessageSchema]
    });
//end creating message schema.
    module.exports = mongoose.model('Conversation', ConversationSchema);
})();