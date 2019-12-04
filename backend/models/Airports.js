const mongoose = require("mongoose");

const AirportsSchema = mongoose.Schema({
  airport: { type: String, require: true },
  description: { type: String, require: true }
});

module.exports = mongoose.model("airports", AirportsSchema);
