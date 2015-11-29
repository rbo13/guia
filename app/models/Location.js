var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create location Schema
var LocationSchema = new Schema({
  country: String,
  city: String,
  isActivated: { type: Boolean, default: false }
});
//end creating location Schema
module.exports = mongoose.model('Location', LocationSchema);
