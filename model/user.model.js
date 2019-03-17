const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const UserSchema = mongoose.Schema({
  name: String,
  mnumber: String,
  type: String,
  password: String,
  long: SchemaTypes.Double,
  lat: SchemaTypes.Double
});
const User = mongoose.model("Register", UserSchema);

module.exports = User;
