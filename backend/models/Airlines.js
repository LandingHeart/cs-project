const mongoose = require("mongoose");

const AirlineSchema = mongoose.Schema({
    airlinename: String,
    airlineid: String,
    airportid: String,
    description: String

})

module.exports = mongoose.model("airline", AirlineSchema);