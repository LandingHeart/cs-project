const mongoose = require("mongoose");

const FlightsSchema = mongoose.Schema({
  runByAirline:{
    type: String,
    require: true
  }, 
  status:{
    type: String,
    require: true
  }, 
  flightName:{
    type: String,
    require: true
  },
  flightId:{
    type: Number,
    require: true
  },
  maxCapacity: { 
    type: Number, 
    require: true 
  },
  filled: {
    type: Number,
    require: true
  },
  fares: Number
});

module.exports = mongoose.model("Flights", FlightsSchema);
