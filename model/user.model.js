const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  mnumber: Number,
  type: String,
  password: String
});
const User = mongoose.model("Register", UserSchema);

module.exports = User;
