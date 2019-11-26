const mongoose = require("mongoose");

const AirportsSchema = mongoose.Schema({
    airportName: String,
    airportid: String,
    description: String

})

module.exports = mongoose.model('airports', AirportsSchema)