var mongoose = require("mongoose");
const users = require("./users");
var Schema = mongoose.Schema;

var userprofilesSchema = new Schema({
  fname: String, // String is shorthand for {type: String}
  lname: String,
  address: String,
  lat: String,
  long: String,
  status: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  logo:String,
  bname: String,
  baddress: String,
  website: String,
  phonenumber: String,
  description: String,
  type:String,
  btype:String,
  stripecustomerid:String,
  subscribed:{
    type: String,
    default:"1",
  },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Userprofiles", userprofilesSchema);
