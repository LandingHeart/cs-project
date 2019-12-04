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
  filled: {
    type: Number,
    require: true
  },
  dest: {
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
  time: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  status:{
    type: String,
    require: true
  }
});


module.exports = mongoose.model("flights", FLightSchema);
