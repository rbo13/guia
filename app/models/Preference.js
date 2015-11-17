var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  preferences: String
});
module.exports = mongoose.model('Preference', PreferenceSchema);
