const mongoose = require("mongoose");

const AirlineSchema = mongoose.Schema({
    airlinename: String,
    airlineid: String,
    airportid: String,
   

})

module.exports = mongoose.model("airlines", AirlineSchema);