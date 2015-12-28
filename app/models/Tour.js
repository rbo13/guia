var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//create Tour Schema
var TourSchema = new Schema({
  name: String,
  tour_location: String,
  duration: Number,
  duration_format: { type: String, strict: false },
  details: String,
  points: { type: Number, default: 0 },
  rate: { type: Number, required: false },
  negotiable: { type: Boolean },
  tour_preference: String,
  tour_guide_id: { type: String },
  main_image: { type: String },
  additional_image : [
    {
      image: String
    }
  ]
});
//end creating Tour Schema
module.exports = mongoose.model('Tour', TourSchema);
