const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const EventSchema = mongoose.Schema({
  long: SchemaTypes.Double,
  lat: SchemaTypes.Double,
  count: Number,
  isDelete: Boolean
});
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
