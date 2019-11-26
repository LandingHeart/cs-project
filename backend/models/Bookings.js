const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    bookedBy: String,
    flightId: Number,
    flightName: String,
    id: Number,
})

module.exports = mongoose.model("bookings", BookingSchema);