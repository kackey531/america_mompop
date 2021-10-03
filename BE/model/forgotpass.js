var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var forgotpassSchema = new Schema({
  email: String,
  token: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Forgotpass", forgotpassSchema);
