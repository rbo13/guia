var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create location Schema
var LocationSchema = new Schema({
  country: String,
  city: String
});
//end creating location Schema
module.exports = mongoose.model('Location', LocationSchema);
