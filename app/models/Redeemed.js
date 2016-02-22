var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create redeem Schema
var RedeemSchema = new Schema({
  redeem_reward_id: String,
  user: {
      id: String,
      name: String,
      profImage: String
  },
  date: { type: Date, default: Date.now }
});
//end creating reward Schema
module.exports = mongoose.model('Redeem', RedeemSchema);
