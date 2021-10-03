var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var favSchema = new Schema({
  userid: String,
  couponid: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Fave", favSchema);
