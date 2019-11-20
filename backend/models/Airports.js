const mongoose = require("mongoose");

const AirportsSchema = mongoose.Schema({
    airportName: String,
    description: String

})

module.exports = mongoose.model('Airports', AirportsSchema)