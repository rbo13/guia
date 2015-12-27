var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create reward Schema
var RewardSchema = new Schema({
    reward_tour_id: { type: String },
    redeem_points: Number,
    isActivated: {type: Boolean, default: false}
});
//end creating reward Schema
module.exports = mongoose.model('Reward', RewardSchema);