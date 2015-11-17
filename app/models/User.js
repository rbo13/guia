var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create user Schema
var UserSchema = new Schema({
  name: String,
  birthday: String,
  age: Number,
  gender: String,
  profImage: String,
  token: { type: String, required: false, select: false }
});
//end creating user Schema
module.exports = mongoose.model('User', UserSchema);
