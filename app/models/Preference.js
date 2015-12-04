var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
  preference: String,
  isActivated: { type: Boolean, default: false }
});
module.exports = mongoose.model('Preference', PreferenceSchema);
