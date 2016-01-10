(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var MessageSchema = new Schema({
        to: {
            id: String,
            name: String,
            profImage: String,
            guide_id: String
        },
        from: {
            id: String,
            name: String,
            profImage: String,
            guide_id: String
        },
        body: { type: String, required: true},
        created: { type: Date, default: Date.now }
    });
//end creating message schema.
    module.exports = mongoose.model('Message', MessageSchema);
})();