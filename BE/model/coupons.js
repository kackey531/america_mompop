var mongoose = require("mongoose");
const users = require("./users");
var Schema = mongoose.Schema;

var couponsSchema = new Schema({
  name: String,
  codetype: String, // String is shorthand for {type: String}
  available: String,
  description: String,
  redeemed: String,
  startdate: { type: Date, default: Date.now },
  enddate: { type: Date },
  expirydate:{type:Date},
  qrcode: String,
  serviceorproduct: String,
  status: String,
  showcode: String,
  price: Number,
  originalprice: Number,
  publishdate:{type:Date},
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Coupons", couponsSchema);
