const mongoose = require("mongoose");

const FlightsSchema = mongoose.Schema({
    
  airlineName: String,
  status: String, 
  maxCapacity: Number,
  filled: Number,
  fares: Number,

});

module.exports = mongoose.model("Flights", FlightsSchema);
