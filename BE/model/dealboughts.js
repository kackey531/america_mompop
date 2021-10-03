var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealboughtSchema = new Schema({
  userid: String,
  couponid: String,
  date: { type: Date, default: Date.now },
  status : String,// 0 for not redeemed and 1 for redeem
  redeemdate:Date 
});
module.exports = mongoose.model("Dealboughts", dealboughtSchema);
