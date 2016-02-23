var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create redeem Schema
var RedeemSchema = new Schema({
  redeem_reward_id: String,
  tour:{
    tour_name: String,
    tour_location: String,
    tour_details: String,
    main_image: String
  },
  user: {
      id: String,
      name: String,
      profImage: String
  },
  date: { type: Date, default: Date.now }
});
//end creating reward Schema
module.exports = mongoose.model('Redeem', RedeemSchema);
