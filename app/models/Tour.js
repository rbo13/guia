var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var TourSchema = new Schema({
  name: String,
  duration: Number,
  details: String,
  points: { type: Number, default: 0 },
  rate: { type: Number, required: false },
  negotiable: { type: Boolean, default: false },
  tour_preference: String,
  tour_guide_id: { type: Schema.Types.ObjectId, ref: 'Guide' }
});
//end creating guide Schema
module.exports = mongoose.model('Tour', TourSchema);
