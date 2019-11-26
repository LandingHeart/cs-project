const mongoose = require("mongoose");

const FLightSchema = mongoose.Schema({
  flightid: {
    type: String,
    require: true
  },
  flightname: {
    type: String,
    require: true
  },
  capacity: {
    type: Number,
    require: true
  },
  filled: {
    type: Number,
    require: true
  },
  dest: {
    type: String,
    require: true
  },
  depart: {
    type: String,
    require: true
  },
  fares: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("FlightsSchema", FLightSchema);
