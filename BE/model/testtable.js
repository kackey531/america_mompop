var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var testtableSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  city: String,
});
module.exports = mongoose.model("Testtable", testtableSchema);
