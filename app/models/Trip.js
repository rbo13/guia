var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var TripSchema = new Schema({
  trip_traveler_id: String,
  location: String,
  destination: String,
  date_from: Date,
  date_to: Date
});
//end creating user Schema
module.exports = mongoose.model('Trip', TripSchema);
