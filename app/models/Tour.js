var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var TourSchema = new Schema({
  name: String,
  duration: Number,
  details: String,
  points: { type: Number, default: 0 },
  rate: { type: Number, required: false },
  negotiable: { type: Boolean },
  tour_preference: String,
  tour_guide_id: { type: String },
  img: { data: Buffer, contentType: String }
});
//end creating guide Schema
module.exports = mongoose.model('Tour', TourSchema);
