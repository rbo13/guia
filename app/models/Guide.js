var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create guide Schema
var GuideSchema = new Schema({
    country: String,
    city: String,
    contact_number: String,
    type: String,
    email_address: String,
    isActivated: { type: Boolean, default: false },
    guide_user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});
//end creating guide Schema
module.exports = mongoose.model('Guide', GuideSchema);
