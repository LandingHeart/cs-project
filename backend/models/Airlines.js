const mongoose = require("mongoose");

const AirlineSchema = mongoose.Schema({
    airlinename: String,
    airlineid: String,
})

module.exports = mongoose.model("airlines", AirlineSchema);