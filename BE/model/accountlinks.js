var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountlinkSchema = new Schema({
  userid: String,
  accountid: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Accountlinks", accountlinkSchema);