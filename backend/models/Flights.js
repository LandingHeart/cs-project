const mongoose = require("mongoose");

const FLightSchema = mongoose.Schema({
    flightId: {
        type: String,
        require: true
    },
    flightName: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    fillStatus: {
        type: Number,
        require: true
    },
    dest: {
        type: String,
        require: true
    },
    depart: {
        type: String, 
        require: true
    },
    fares: {
      type: Number,
      require: true
    }
})

module.exports = mongoose.model("FlightsSchema", FLightSchema)