const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const EventSchema = mongoose.Schema({
  long: String,
  lat: String,
  count: Number,
  isDelete: Boolean
});
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
