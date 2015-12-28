var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  booking_tour_id: { type: String, default: "" },
  booking_user_id: { type: String, default: "" },
  booking_guide_id: { type: String, default: "" },
  schedule: String,
  status: { type: String, default: "pending" }
});
//end creating booking schema.
module.exports = mongoose.model('Booking', BookingSchema);
