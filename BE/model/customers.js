var mongoose = require("mongoose");
const users = require("./users");
var Schema = mongoose.Schema;

var customersSchema = new Schema({
  fname: String, // String is shorthand for {type: String}
  lname: String,
  email: String,
  phone: String,
  createrid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  invitelink:String,
  created: { type: Date, default: Date.now },

});
module.exports = mongoose.model("Customers", customersSchema);
