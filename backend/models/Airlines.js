const mongoose = require("mongoose");


const AirlineSchema = mongoose.Schema({
    airline: String,
    description: String

})

module.exports = mongoose.model("airline", AirlineSchema);