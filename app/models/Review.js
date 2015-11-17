var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var ReviewSchema = new Schema({
  review_traveler_id: { type: Schema.Types.ObjectId, ref: 'Traveler' },
  review_guide_id: { type: Schema.Types.ObjectId, ref: 'Guide' },
  comment: String
});
//end creating guide Schema
module.exports = mongoose.model('Review', ReviewSchema);
