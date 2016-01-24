(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var ConversationSchema = new Schema({
        messages: { type: Array, default: [] }
    });
//end creating message schema.
    module.exports = mongoose.model('Conversation', ConversationSchema);
})();