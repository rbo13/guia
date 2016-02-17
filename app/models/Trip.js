var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var TripSchema = new Schema({
  trip_user_id: String,
  location:  String,
  description: { type: String, required: false, default: 'No description' },
  image: { type: String, default: 'http://res.cloudinary.com/guia/image/upload/v1455680971/add_image_u9mal4.png' },
  date_from: Date,
  date_to: Date
});
//end creating user Schema
module.exports = mongoose.model('Trip', TripSchema);
