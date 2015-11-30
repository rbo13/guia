"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NegotiateSchema = new Schema({
    negotiate_tour_id: { type: Schema.Types.ObjectId, ref: 'Tour' },
    proposed_rate: Number,
    offered_rate: { type: Number, required: false },
    status: {type: String, default: "Pending", required: false}
});
//end creating negotiate schema.
module.exports = mongoose.model('Negotiate', NegotiateSchema);
