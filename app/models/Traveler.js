var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TravelerSchema = new Schema({
  traveler_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  traveler_location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
  accumulated_points: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false }
});
module.exports = mongoose.model('Traveler', TravelerSchema);
