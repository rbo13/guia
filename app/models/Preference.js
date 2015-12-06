var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
  preference: String,
  isActivated: { type: Boolean, default: false },
  created:{
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Preference', PreferenceSchema);
