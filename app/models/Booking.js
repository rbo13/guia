var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  tour: {
      id: String,
      name: String,
      tour_location: String,
      duration: Number,
      duration_format: String,
      details: String,
      tour_guide_id: String,
      rate: Number,
      main_image: String,
      tour_preference: String,
      additional_image: { type: Array, default: [] },
      points: Number
  },
  user: {
        name: String,
        profImage: String,
        age: Number,
        gender: String
  },
  booking_guide_id: { type: String, default: "" },
  start_date: String,
  end_date: String,
  status: { type: String, default: "pending" }
});
//end creating booking schema.
module.exports = mongoose.model('Booking', BookingSchema);
