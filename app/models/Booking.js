var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  booking_tour_id: { type: Schema.Types.ObjectId, ref: 'Tour' },
  booking_traveler_id: { type: Schema.Types.ObjectId, ref: 'Traveler' },
  schedule: Date,
  rate: Number,
  status: String,
  booking_review_id: { type: Schema.Types.ObjectId, ref: 'Review' },
  booking_rating_id: { type: Schema.Types.ObjectId, ref: 'Rating' }
});
//end creating booking schema.
module.exports = mongoose.model('Booking', BookingSchema);
