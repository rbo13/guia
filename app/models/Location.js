var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create location Schema
var LocationSchema = new Schema({
  country: String,
  city: String,
  isActivated: { type: Boolean, default: false },
  created:{
      type: Date,
      default: Date.now
  }
});
//end creating location Schema
module.exports = mongoose.model('Location', LocationSchema);
