const mongoose = require("mongoose");

const FLightSchema = mongoose.Schema({
  airlineid: {
    type: String,
    require: true
  },
  airline: {
    type: String,
    require: true
  },
  flight: {
    type: String,
    require: true
  },
  capacity: {
    type: Number,
    require: true
  },
  fill: {
    type: Number,
    require: true
  },
  arrival: {
    type: String,
    require: true
  },
  departure: {
    type: String,
    require: true
  },
  fare: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("flights", FLightSchema);
