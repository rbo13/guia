var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var UserSchema = new Schema({
  facebook_id: { type: String, select: false },
  name: String,
  birthday: String,
  age: Number,
  gender: String,
  profImage: String,
  points: { type: Number, default: 0 },
  guide_id: { type: String, required: false, default: "" },
  token: { type: String, required: false, select: false }
});
//end creating user Schema
module.exports = mongoose.model('User', UserSchema);
