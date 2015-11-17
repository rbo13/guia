var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var TourSchema = new Schema({
  name: String,
  duration: Number,
  details: String,
  tour_guide_id: { type: Schema.Types.ObjectId, ref: 'Guide' },
  points: { type: Number, default: 0 },
  rate: { type: Number, required: false },
  tour_preference_id: { type: Schema.Types.ObjectId, ref: 'Preference' },
  negotiable: { type: Boolean, default: false }
});
//end creating guide Schema
module.exports = mongoose.model('Tour', TourSchema);
