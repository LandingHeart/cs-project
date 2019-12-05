const mongoose = require("mongoose");

const FLightSchema = mongoose.Schema({
  flightid: {
    type: Number,
    require: true
  },
  airline: {
    type: String,
    require: true
  },
  airlineid: {
    type: String,
    require: true
  },
  flightname: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  time: {
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
  depart: {
    type: String,
    require: true
  },
  dest: {
    type: String,
    require: true
  },
  fares: {
    type: Number,
    require: true
  },
  status:{
    type: String,
    require: true
  },
});


module.exports = mongoose.model("flights", FLightSchema);
