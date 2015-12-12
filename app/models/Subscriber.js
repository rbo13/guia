var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create subscriber Schema
var SubscriberSchema = new Schema({
  email: String,
  created:{
      type: Date,
      default: Date.now
  }
});
//end creating subscriber Schema
module.exports = mongoose.model('Subscriber', SubscriberSchema);
