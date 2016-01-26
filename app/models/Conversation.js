(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    //var MessageSchema = new Schema({
    //    id: String,
    //    name: String,
    //    profImage: String,
    //    message: String,
    //    date: { type: Date, default: Date.now }
    //});

    var ConversationSchema = new Schema({
        guide: {
            id: String,
            name: String
        },
        traveler: {
            id: String,
            name: String
        },
        messages: [{
            id: String,
            name: String,
            profImage: String,
            message: String,
            date: { type: Date, default: Date.now }
        }]
    });
//end creating conversation schema.
    module.exports = mongoose.model('Conversation', ConversationSchema);
})();