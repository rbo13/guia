var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var ReviewSchema = new Schema({
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    review_guide_id: String,
    user: {
        id: String,
        facebook_id: { type: String, select: true },
        name: String,
        profImage: String,
        guide_id: String
    },
    created: { type: Date, default: Date.now },
    points: Number,
});
//end creating guide Schema
module.exports = mongoose.model('Review', ReviewSchema);
