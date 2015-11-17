var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var GuideSchema = new Schema({
  type: String,
  guide_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  location: {
      country: String,
      city: String
  }
});
//end creating guide Schema
module.exports = mongoose.model('Guide', GuideSchema);
