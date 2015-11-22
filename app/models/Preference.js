var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
  preference: String
});
module.exports = mongoose.model('Preference', PreferenceSchema);
