const mongoose = require("mongoose");

const AirlineSchema = mongoose.Schema({
  airline: { type: String, require: true },

  airlineid: String
});

module.exports = mongoose.model("airlines", AirlineSchema);
