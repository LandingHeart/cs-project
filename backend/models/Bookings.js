const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    customer: String,
    flightid: Number,
    id: Number,
    bookedFrom: String
})

module.exports = mongoose.model("bookings", BookingSchema);