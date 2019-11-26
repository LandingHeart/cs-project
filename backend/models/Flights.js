const mongoose = require("mongoose");

const FLightSchema = mongoose.Schema({
  airlineid: {
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
  },
  date: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("flights", FLightSchema);
