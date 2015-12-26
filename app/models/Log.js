"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    activity: { type: String, default: 'Deactivated a Guide' },
    activity_date: { type: Date, default: Date.now }
});
//end creating negotiate schema.
module.exports = mongoose.model('Log', LogSchema);
