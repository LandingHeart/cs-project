const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    customer: String,
    flightid: Number,
    flightName: String,
    id: Number,
    bookfrom: String
})

module.exports = mongoose.model("bookings", BookingSchema);