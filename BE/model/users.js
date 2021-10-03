var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  password: String,
  type: {type:String,default:"1"}, // 0 for admin, 1 for customers, 2 for business
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Users", usersSchema);
