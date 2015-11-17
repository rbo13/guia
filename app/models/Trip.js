var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var TripSchema = new Schema({
  trip_traveler_id: { type: Schema.Types.ObjectId, ref: 'Traveler' },
  trip_location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
  destination: String,
  date_from: Date,
  date_to: Date
});
//end creating user Schema
module.exports = mongoose.model('Trip', TripSchema);
