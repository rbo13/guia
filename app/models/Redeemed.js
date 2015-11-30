var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create reward Schema
var RedeemSchema = new Schema({
  redeem_reward_id: { type: Schema.Types.ObjectId, ref: 'Reward' },
});
//end creating reward Schema
module.exports = mongoose.model('Redeem', RedeemSchema);
