var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var TripSchema = new Schema({
  location: {
        country: String,
        city: String
  },
  destination: String,
  date_from: Date,
  date_to: Date
});
//end creating user Schema
module.exports = mongoose.model('Trip', TripSchema);
