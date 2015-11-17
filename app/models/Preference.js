var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
  preferences: String
});
module.exports = mongoose.model('Preference', PreferenceSchema);
