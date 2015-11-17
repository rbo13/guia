var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var RatingSchema = new Schema({
  TravelerID: { type: Schema.Types.ObjectId, ref: 'Traveler' },
  GuideID: { type: Schema.Types.ObjectId, ref: 'Guide' },
  rating: Number
});
//end creating guide Schema
module.exports = mongoose.model('Rating', RatingSchema);
