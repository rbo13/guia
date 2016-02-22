var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create reward Schema
var RewardSchema = new Schema({
    reward_tour_id: { type: String },
    tour_name: String,
    tour_location: String,
    tour_details: String,
    redeem_points: Number,
    main_image: String,
    isActivated: {type: Boolean, default: false}
});
//end creating reward Schema
module.exports = mongoose.model('Reward', RewardSchema);