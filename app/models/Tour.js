var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var imageSchema = new Schema({ image: String });
//create guide Schema
var TourSchema = new Schema({
  name: String,
  duration: Number,
  duration_format: { type: String, strict: false },
  details: String,
  points: { type: Number, default: 0 },
  rate: { type: Number, required: false },
  negotiable: { type: Boolean },
  tour_preference: String,
  tour_guide_id: { type: String },
  additional_image : [ imageSchema ]
});
//end creating guide Schema
module.exports = mongoose.model('Tour', TourSchema);
